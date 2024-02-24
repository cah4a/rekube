import {
    camelCase,
    entries,
    filter,
    find,
    findIndex,
    findLastIndex,
    first,
    get,
    groupBy,
    includes,
    map,
    orderBy,
    remove,
} from "lodash";
import { ContextRelation, GVK, Spec, SpecProp } from "types";

export const OBJECT_META_ID = "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta";

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
            // usually it's a `spec` key
            yield* findContextComponents(
                spec.properties,
                specs,
                prefix + prop.name + "."
            );
        }
    }
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
            // skip list specs, maybe we'll need them later
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

                // Case when we have Container and initContainer, so we want only that prefix as flag
                const prefix = names.every(
                    (name) =>
                        name.toLowerCase().endsWith(names[0].toLowerCase()) ||
                        name.toLowerCase().startsWith(names[0].toLowerCase())
                ) ? names[0] : undefined;

                for (const mount of mounts) {
                    let name = names.shift();

                    if (prefix && name !== prefix) {
                        name = removePrefixPostfix(name, prefix);
                    }

                    // LabelSelector could be mounted as /labelSelector/objectSelector/podSelector/namespaceSelector
                    // We want to be labelSelector by default
                    const isSameName = ctxId.toLowerCase().endsWith(`.${name.toLowerCase()}`)

                    relations.add({
                        id: ctxId,
                        parentId: id,
                        path: mount.path,
                        isArray: mount.isArray,
                        alias: {
                            name,
                            default: prefix
                                ? name == prefix
                                : isSameName,
                        },
                    });
                }
            }
        }
    }
    return relations;
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

export function makeSpecification(
    definitions: Record<string, any>,
    kinds: Set<string>
) {
    const specs = generateSpecs(definitions, kinds);

    return {
        specs,
        relations: createContextRelations(specs),
    };
}

export class ContextRelations {
    byIdMap = new Map<string, ContextRelation[]>();
    byParentIdMap = new Map<string, ContextRelation[]>();

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

    values() {
        return Array.from(this.byIdMap.values()).flat();
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
