import {
    entries,
    filter,
    find,
    first,
    flatten,
    get,
    isEqual,
    keyBy,
    keys,
    map,
    set,
    uniqWith,
    values,
} from "lodash";
import { RenderableProp, renderComponent, renderInterface } from "renderers";
import { FilesSink } from "filesSink";
import { ContextRelations, OBJECT_META_ID } from "specification";
import { Spec, SpecProp } from "types";

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

export function codegen({
    specs,
    relations,
}: {
    specs: Map<string, Spec>;
    relations: ContextRelations;
}) {
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
