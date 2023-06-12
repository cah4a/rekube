import {
    camelCase,
    entries,
    filter,
    find,
    findIndex,
    findLastIndex,
    first,
    flatten,
    get,
    groupBy,
    includes,
    isEqual,
    keyBy,
    keys,
    map,
    orderBy,
    remove,
    set,
    uniqWith,
    values,
} from "lodash";
import { GVK } from "fetchDefinitions";
import { RenderableProp, renderComponent, renderInterface } from "renderers";
import { FilesSink } from "filesSink";

/*
 * Types of components
 * - Kind Component
 * - Contexted Component
 * - SubComponent (e.g. PodSpec.Container)
 * - List Component over flag to emit to different lists of parents
 */

const OBJECT_META_ID = "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta";

type SpecProp = {
    name: string;
    type: { name: string; module?: string } | { id: string };
    isRequired: boolean;
    isArray: boolean;
    description;
};

type Spec = {
    id: string;
    hasMeta: boolean;
    hasKind: boolean;
    name: string;
    module: string;
    description: string;
    properties: SpecProp[];
    gvk?: GVK;
    specKey?: string;
};

function toJsType(type: string) {
    switch (type || "object") {
        case "integer":
            return "number | bigint";
        case "object":
            return "Record<string, string>";
        case "string":
        case "boolean":
        case "number":
            return type;
        default:
            throw new Error(`Unknown type ${type}`);
    }
}

function* generatePropSpec({
    properties,
    required,
}: {
    properties: Record<string, any>;
    required: string[];
}): Generator<SpecProp> {
    for (let [name, { $ref, items, type, description }] of entries(
        properties
    )) {
        const isReadOnly = /read-?only/i.test(description || "");

        if (
            includes(["kind", "apiVersion", "managedFields", "status"], name) ||
            isReadOnly
        ) {
            continue;
        }

        const isRequired = includes(required, name);
        const isArray = type === "array";

        if (isArray) {
            type = items.type;
            $ref = items.$ref;
        }

        if ($ref) {
            const id = $ref.split("/").pop();
            const patchedType = patchType(id);

            yield {
                name,
                type: patchedType || { id },
                isRequired,
                isArray,
                description,
            };
        } else {
            yield {
                name,
                type: { name: toJsType(type) },
                isRequired,
                isArray,
                description,
            };
        }
    }
}

function definitionToSpec(
    id: string,
    definition: any,
    kinds: Set<string>
): Spec {
    const items = id.split(".");
    const name = items.pop();
    const version = items.pop();
    const pkg = items.pop();

    const properties = Array.from(generatePropSpec(definition));
    const meta = find(
        properties,
        (prop) => get(prop, "type.id") === OBJECT_META_ID
    );

    if (meta) {
        remove(properties, meta);
    }

    const gvk = first(definition["x-kubernetes-group-version-kind"]) as
        | GVK
        | undefined;

    return {
        id,
        name,
        module: `${pkg}/${version}`,
        description: definition.description,
        hasMeta: !!meta,
        hasKind: !!gvk && kinds.has(`${gvk.group}.${gvk.version}.${gvk.kind}`),
        properties,
        gvk,
    };
}

function* findContextComponents(
    properties: SpecProp[],
    specs: Map<string, Spec>,
    prefix = ""
): Generator<{ id: string; path: string; isArray: boolean }> {
    for (const prop of properties) {
        const id = get(prop, "type.id", "");
        const spec = specs.get(id);

        if (!spec) {
            continue;
        }

        const isAllSimpleProps = !find(spec.properties, "type.id");

        if ((!isAllSimpleProps && spec.properties.length > 1) || prop.isArray) {
            yield {
                id,
                path: prefix + prop.name,
                isArray: prop.isArray,
            };
        } else if (spec.properties.length === 1) {
            yield* findContextComponents(
                spec.properties,
                specs,
                prefix + prop.name + "."
            );
        }
    }
}

function getComponentProps(
    spec: Spec,
    specs: Map<string, Spec>
): { props: SpecProp[]; specKey?: string } {
    const onlySpec = spec.properties.length === 1;
    const specProp = first(spec.properties);
    const specPropId = get(specProp, "type.id", "");

    if (onlySpec && specPropId) {
        const specType = specs.get(specPropId);

        if (!specType) {
            throw new Error(`Spec ${specPropId} wasn't found`);
        }

        return {
            specKey: specProp.name,
            props: specType.properties,
        };
    }

    return {
        props: spec.properties,
    };
}

type ContextRelation = {
    id: string;
    parentId: string;
    path: string;
    isArray: boolean;
    alias?: { name: string; default?: boolean };
};

function findPathDiff(paths: string[]) {
    if (paths.length === 1) {
        throw new Error("Can't find path diffs for a single path");
    }

    const [first, ...rest] = paths.map((p) => p.split("."));

    const prefix = findIndex(
        first,
        (item, index) => !rest.every((path) => path[index] === item)
    );

    const suffix = findLastIndex(
        first,
        (item, index) => !rest.every((path) => path[index] === item)
    );

    return [
        first.slice(prefix, suffix + 1).join("."),
        ...rest.map((path) => path.slice(prefix, suffix + 1).join(".")),
    ];
}

function depluralize(item: string) {
    if (item.endsWith("ies")) {
        return item.slice(0, -3) + "y";
    }

    if (item.endsWith("ses")) {
        return item.slice(0, -2);
    }

    if (item.endsWith("es")) {
        return item.slice(0, -2) + "e";
    }

    if (item.endsWith("s")) {
        return item.slice(0, -1);
    }

    return item;
}

function removePrefixPostfix(str: string, fix: string) {
    if (str.toLowerCase().startsWith(fix.toLowerCase())) {
        return str.slice(fix.length);
    }

    if (str.toLowerCase().endsWith(fix.toLowerCase())) {
        return str.slice(0, -fix.length);
    }

    return str;
}

function createContextRelations(specs: Map<string, Spec>) {
    const relations = new ContextRelations();

    for (const [id, spec] of specs) {
        if (
            spec.properties.find((p) =>
                get(p, "type.id", "").endsWith(
                    "io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta"
                )
            )
        ) {
            // skip list specs
            continue;
        }

        const contexts = Array.from(
            findContextComponents(
                spec.properties,
                specs,
                spec.specKey ? spec.specKey + "." : ""
            )
        );

        for (const { path } of contexts) {
            const segments = path.split(".");
            let ctxSpec = specs.get(id);

            if (spec.specKey) {
                segments.shift();
            }

            while (segments.length) {
                const name = segments.shift();
                const prop = find(ctxSpec.properties, { name });

                if (!prop) {
                    break;
                }

                prop.isRequired = false;
                ctxSpec = specs.get(get(prop, "type.id", ""));

                if (!ctxSpec) {
                    break;
                }
            }
        }

        const ambiguous = filter(contexts, ({ id }) => {
            return filter(contexts, { id }).length > 1;
        });
        const straight = filter(contexts, ({ id }) => {
            return !find(ambiguous, { id });
        });

        for (const context of straight) {
            relations.add({
                id: context.id,
                parentId: id,
                path: context.path,
                isArray: context.isArray,
            });
        }

        if (ambiguous.length > 0) {
            const byId = groupBy(ambiguous, "id");

            for (let [ctxId, mounts] of entries(byId)) {
                mounts = orderBy(mounts, "path");

                const names = findPathDiff(map(mounts, "path")).map((name) =>
                    camelCase(depluralize(name))
                );

                const firstDefault = names.every(
                    (name) =>
                        name.toLowerCase().endsWith(names[0].toLowerCase()) ||
                        name.toLowerCase().startsWith(names[0].toLowerCase())
                );

                let index = 0;

                for (const mount of mounts) {
                    relations.add({
                        id: ctxId,
                        parentId: id,
                        path: mount.path,
                        isArray: mount.isArray,
                        alias: {
                            name:
                                index > 0 && firstDefault
                                    ? removePrefixPostfix(
                                          names[index],
                                          names[0]
                                      )
                                    : names[index],
                            default: firstDefault && index === 0,
                        },
                    });
                    index += 1;
                }
            }
        }
    }
    return relations;
}

function* findInterfaces(
    specs: Map<string, Spec>,
    componentIds: string[]
): Generator<Spec> {
    const creep = new Set<string>();
    const stack = Array.from(componentIds);

    while (stack.length > 0) {
        const id = stack.pop();

        for (const prop of specs.get(id).properties) {
            const propId = get(prop, "type.id", "");

            if (!propId || creep.has(propId)) {
                continue;
            }

            creep.add(propId);
            stack.push(propId);
            yield specs.get(propId);
        }
    }
}

function* findComponents(
    specs: Map<string, Spec>,
    relations: ContextRelations
) {
    const stack = filter(
        Array.from(specs.keys()),
        (id) => specs.get(id)?.hasKind
    );
    const kinds = new Set(stack);
    const creep = new Set(stack);

    while (stack.length > 0) {
        const id = stack.pop();
        const nextIds = map(relations.byParent(id), "id").filter(
            (id) => !creep.has(id)
        );
        for (const id of nextIds) {
            stack.push(id);
            creep.add(id);
        }
    }

    for (const id of creep) {
        if (kinds.has(id)) {
            yield {
                id,
                spec: specs.get(id),
                contexts: [],
            };
            continue;
        }

        const parents = relations.byId(id);
        const aliases = uniqWith(map(parents, "alias"), isEqual);
        const byParents = keyBy(parents, "parentId");
        const parentSubcomponent =
            Object.keys(byParents).length === 1
                ? first(values(byParents))
                : null;

        yield {
            id,
            spec: specs.get(id),
            subcomponentOf: parentSubcomponent?.isArray
                ? parentSubcomponent.parentId
                : undefined,
            flags: map(aliases, "name"),
            defaultFlag: find(aliases, "default")?.name,
            contexts: parents.map((relation) => ({
                id: relation.parentId,
                path: relation.path,
                isItem: relation.isArray,
                flag: relation.alias?.name,
            })),
        };
    }
}

function generateSpecs(definitions: Record<string, any>, kinds: Set<string>) {
    const specs = new Map(
        entries(definitions).map(([id, definition]) => [
            id,
            definitionToSpec(id, definition, kinds),
        ])
    );

    // Second-pass props processing
    for (const spec of specs.values()) {
        const { props, specKey } = getComponentProps(spec, specs);
        spec.properties = props;
        spec.specKey = specKey;
    }
    return specs;
}

export function codegen(definitions: Record<string, any>, kinds: Set<string>) {
    const specs = generateSpecs(definitions, kinds);
    const relations = createContextRelations(specs);
    const sink = new FilesSink();
    const imports = new ImportsTracker(specs);

    const meta = specs.get(OBJECT_META_ID);
    sink.append(
        `${meta.module}.tsx`,
        renderInterface({
            name: `I${meta.name}`,
            props: map(
                meta.properties,
                (prop): RenderableProp => ({
                    name: `meta:${prop.name}`,
                    type: imports.resolve(meta.module, prop.type),
                    isArray: prop.isArray,
                    isRequired: prop.isRequired,
                    description: prop.description,
                })
            ),
            description: meta.description,
        })
    );

    const components = Array.from(findComponents(specs, relations));

    for (const spec of findInterfaces(
        specs,
        map(components, "id").concat(OBJECT_META_ID)
    )) {
        sink.append(
            `${spec.module}.tsx`,
            renderInterface({
                name: `I${spec.name}`,
                description: spec.description,
                props: map(
                    spec.properties,
                    (prop): RenderableProp => ({
                        name: prop.name,
                        type: imports.resolve(spec.module, prop.type),
                        isArray: prop.isArray,
                        isRequired: prop.isRequired,
                        description: prop.description,
                    })
                ),
            })
        );
    }

    for (const {
        id,
        spec,
        subcomponentOf,
        contexts,
        flags,
        defaultFlag,
    } of components) {
        const builder = new ComponentBuilder(spec, imports);

        builder.context = flatten(
            map(components, ({ spec, contexts }) =>
                map(filter(contexts, { id }), ({ path, isItem, flag }) => ({
                    name: spec.name,
                    path,
                    isItem,
                    flag,
                }))
            )
        );

        if (subcomponentOf) {
            builder.subcomponentOf = specs.get(subcomponentOf).name;
        }

        if (filter(flags).length) {
            builder.flags = flags;
            builder.defaultFlag = defaultFlag;
        }

        imports.track(spec.module, "rekube", "useKubeProps");

        if (contexts.length) {
            builder.props.contexts = contexts;
        }

        imports.track(spec.module, "rekube", builder.tag);
        sink.append(spec.module + ".tsx", builder.build());
    }

    for (const [module, header] of imports) {
        sink.prepend(`${module}.tsx`, header);
    }

    return sink;
}

class ContextRelations {
    private byIdMap = new Map<string, ContextRelation[]>();
    private byParentIdMap = new Map<string, ContextRelation[]>();

    byId(id: string) {
        return this.byIdMap.get(id) || [];
    }

    byParent(id: string) {
        return this.byParentIdMap.get(id) || [];
    }

    add(relation: ContextRelation) {
        if (!this.byIdMap.has(relation.id)) {
            this.byIdMap.set(relation.id, []);
        }
        this.byIdMap.get(relation.id).push(relation);

        if (!this.byParentIdMap.has(relation.parentId)) {
            this.byParentIdMap.set(relation.parentId, []);
        }
        this.byParentIdMap.get(relation.parentId).push(relation);
    }
}

class ImportsTracker {
    map: Record<string, Record<string, Set<string>>> = {};

    constructor(private specs: Map<string, Spec>) {}

    [Symbol.iterator]() {
        const headers = keys(this.map).map((module) => [
            module,
            this.getImportsHeader(module),
        ]);

        return headers[Symbol.iterator]();
    }

    getImportsHeader(module: string) {
        return entries(this.map[module])
            .map(
                ([dependant, types]) =>
                    `import {${Array.from(types).join(
                        ", "
                    )}} from '${dependant}';`
            )
            .join("\n");
    }

    track(toModule: string, fromModule: string, type: string) {
        if (toModule === fromModule) {
            return;
        }

        const types = get(this.map, [toModule, fromModule], new Set());
        types.add(type);
        set(this.map, [toModule, fromModule], types);
    }

    resolve(
        module: string,
        type: { id: string } | { name: string; module?: string }
    ) {
        if ("id" in type) {
            const spec = this.specs.get(type.id);
            const name = `I${spec.name}`;

            this.track(module, spec.module, name);
            return name;
        }

        if (type.module) {
            this.track(module, type.module, type.name);
        }

        return type.name;
    }
}

function patchType(id: string) {
    switch (id) {
        case "io.k8s.apimachinery.pkg.util.intstr.IntOrString":
            return {
                name: "IntOrString",
                module: "rekube",
            };
        case "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps":
        case "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.JSONSchemaProps":
            return {
                name: "JSONValue",
                module: "rekube",
            };
        case "io.k8s.apimachinery.pkg.api.resource.Quantity":
            return {
                name: "Quantity",
                module: "rekube",
            };
        case "io.k8s.apimachinery.pkg.apis.meta.v1.Time":
            return {
                name: "Time",
                module: "rekube",
            };
        case "io.k8s.apimachinery.pkg.apis.meta.v1.MicroTime":
            return {
                name: "MicroTime",
                module: "rekube",
            };
        case "io.k8s.apimachinery.pkg.runtime.RawExtension":
            return {
                name: "RawExtension",
                module: "rekube",
            };
        case "io.k8s.api.admissionregistration.v1alpha1.ParamKind":
            return {
                name: "ParamKind",
                module: "rekube",
            };
    }

    return undefined;
}

class ComponentBuilder {
    subcomponentOf?: string;
    name: string;
    tag: string;
    props: Record<string, any> = {};
    description?: string;
    propsName: string;
    propTypes: RenderableProp[] = [];
    andPropTypeRefs?: string[] = [];
    context = [];
    flags?: string[];
    defaultFlag?: string;
    specKey?: string;

    constructor(private spec: Spec, private imports: ImportsTracker) {
        this.name = spec.name;
        this.description = spec.description;
        this.tag = spec.hasKind ? "Resource" : "Item";
        this.propsName = spec.hasKind ? "props" : "value";
        this.props.id = spec.id;
        this.specKey = spec.specKey;

        if (spec.hasMeta) {
            this.andPropTypeRefs = [
                imports.resolve(spec.module, { id: OBJECT_META_ID }),
            ];
        }

        if (spec.hasKind && spec.gvk) {
            const { group, version, kind } = spec.gvk;
            this.props.kind = kind;
            this.props.apiVersion = group ? `${group}/${version}` : version;
        }

        this.prependPropType(...spec.properties);
    }

    prependPropType(...props: SpecProp[]) {
        this.propTypes = map(
            props,
            (prop): RenderableProp => ({
                name: prop.name,
                type: this.imports.resolve(this.spec.module, prop.type),
                isArray: prop.isArray,
                isRequired: prop.isRequired,
                description: prop.description,
            })
        ).concat(this.propTypes);
    }

    build() {
        return renderComponent(this);
    }
}
