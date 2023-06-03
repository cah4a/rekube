import {
    keys,
    filter,
    set,
    update,
    entries,
    mapValues,
    values,
    has,
    includes,
    map,
    isEmpty,
    uniq,
    first,
} from "lodash";
import fs from 'fs/promises';
import { FilesSink } from "filesSink";
import { renderComponent, renderInterface } from "renderers";

type GVK = { group: string; version: string; kind: string };

async function fetchDefinitions(version: string): Promise<{
    definitions: Record<string, any>;
    kinds: GVK[];
}> {
    const url = `https://raw.githubusercontent.com/kubernetes/kubernetes/v${version}/api/openapi-spec/swagger.json`;

    console.log(`Fetching ${url}`);

    const req = await fetch(url);
    const res = await req.json();

    return {
        definitions: res.definitions,
        kinds: filter(map(values(res.paths), "post.x-kubernetes-group-version-kind")),
    };
}

function getModuleForId(id: string) {
    const items = id.split(".");
    items.pop(); // name
    const version = items.pop();
    const pkg = items.pop();
    return `${pkg}/${version}`;
}

function createProps(
    { required, properties }: any,
    prefix = "",
    stack = new Set<string>(),
) {
    const context: any[] = [];
    const props: any[] = [];

    entries(properties).forEach(
        ([name, { $ref, items, type, definition }]: any) => {
            if (name === "kind" || name === "apiVersion" || name == "status") {
                return;
            }

            const isRequired = includes(required, name);
            const isArray = type === "array";

            if (isArray) {
                type = items.type;
                $ref = items.$ref;
                definition = items.definition;
            }

            const isContext = isArray && items.$ref;
            if (isContext) {
                context.push({
                    path: prefix + name,
                    isRequired,
                    id: items.$ref.replace(/.*\//, ""),
                });
            }

            if ($ref && definition) {
                const type = $ref.split(".").at(-1);

                if (type === "IntOrString") {
                    props.push({
                        name,
                        type: "(number | string)",
                        isArray,
                    });
                    return;
                }

                if (type === "JSONSchemaProps") {
                    props.push({
                        name,
                        type: "JSON",
                        isArray,
                        id: $ref.replace(/.*\//, ""),
                    });
                    return;
                }

                if (stack.has(type)) {
                    throw new Error(`Recursion type ${type} detected`);
                }

                stack.add(type);
                const nested = createProps(definition, `${prefix}${name}\.`, stack);
                stack.delete(type);

                if (!isContext) {
                    context.push(...nested.context);
                }

                props.push({
                    name,
                    type: `I${type}`,
                    isArray,
                    isRequired,
                    id: $ref.replace(/.*\//, ""),
                    props: nested.props,
                });
            } else {
                props.push({
                    name,
                    type: type === "integer" ? "number" : type || "object",
                    isArray,
                    isRequired,
                });
            }
        },
    );

    return {
        props,
        context,
    };
}

/**
 * Older versions first. Add only versions with removed APIs and latest version.
 *
 * Removed APIs: https://kubernetes.io/docs/reference/using-api/deprecation-guide/
 * Available versions: https://github.com/tommy351/kubernetes-openapi-spec/tree/main/openapi
 */
const VERSIONS = [
    // Old versions with removed APIs
    "1.15.5",
    "1.21.2",
    "1.24.2",
    // Latest version
    "1.25.0",
    "1.26.1",
    "1.27.1",
];

async function fetchAllDefinitions() {
    const cacheFile = "./node_modules/.cache.json"
    const definitions: Record<string, any> = {};
    const kinds = new Map<string, GVK>();

    try {
        const cache = JSON.parse(await fs.readFile(cacheFile, 'utf8'));
        Object.assign(definitions, cache.definitions);
        cache.kinds.forEach((gvk) => {
            kinds.set(`${gvk.group}.${gvk.version}.${gvk.kind}`, gvk);
        });
        return {definitions, kinds};
    } catch (e) {
        // file doesn't exists?
    }

    for (const version of VERSIONS) {
        const data = await fetchDefinitions(version);

        Object.assign(definitions, data.definitions);
        data.kinds.forEach((gvk) => {
            kinds.set(`${gvk.group}.${gvk.version}.${gvk.kind}`, gvk);
        });
    }

    await fs.writeFile(cacheFile, JSON.stringify({
        definitions,
        kinds: Array.from(kinds.values()),
    }))

    return { definitions, kinds };
}

export async function codegen() {
    const {definitions, kinds} = await fetchAllDefinitions();

    // make cross-refs for a convenience
    for (const [key, def] of entries(definitions)) {
        for (const [name, value] of entries(def.properties) as any) {
            if (value.$ref) {
                const id = value.$ref.replace(/^.*\//, "");
                set(
                    definitions,
                    [key, "properties", name, "definition"],
                    definitions[id],
                );
            }

            if (value.type === "array" && value.items.$ref) {
                const id = value.items.$ref.replace(/^.*\//, "");
                set(
                    definitions,
                    [key, "properties", name, "items", "definition"],
                    definitions[id],
                );
            }
        }
    }

    const modules: Record<string, Record<string, string>> = {};
    const nested: Record<string, Record<string, Record<string, true>>> = {};
    const nestedStack: string[] = [];

    const imports = (toModule: string, fromModule: string, name: string) => {
        if (toModule !== fromModule) {
            update(modules, [toModule, "imports", fromModule], (names) => [
                ...(names || []),
                name,
            ]);
        }
    };

    const genProps = (module: string, properties: any[]) => {
        for (const { id, type, props } of properties) {
            if (!id || !props) {
                continue;
            }

            const propModule = getModuleForId(id);
            const path = [propModule, "interfaces", type];

            imports(module, propModule, type);
            if (!has(modules, path)) {
                set(modules, path, renderInterface(type, props));
                genProps(propModule, props);
            }
        }
    };

    const gvkToId = new Map<string, string>(
        map(definitions, (def, id) => {
            if (def["x-kubernetes-group-version-kind"]?.length !== 1) {
                return ["", ""];
            }

            const { group, version, kind } =
                def["x-kubernetes-group-version-kind"][0];
            return [`${group}.${version}.${kind}`, id];
        }),
    );

    const processed = new Set<string>();
    for (const { group, version, kind } of kinds.values()) {
        const id = gvkToId.get(`${group}.${version}.${kind}`);
        const definition = definitions[id || ""];

        if (!id || !definition) {
            console.warn(`Can't find definition for ${group}.${version}.${kind}`);
            continue;
        }
        if (!definition.required) {
            definition.required = ["spec"];
        }

        processed.add(id);

        const module = getModuleForId(id);

        const { props, context } = createProps(definitions[id]);

        for (const { id: ctxId, path } of context) {
            set(nested, [ctxId, id, path], true);
            nestedStack.push(ctxId);
        }

        genProps(module, props);

        imports(module, "rekube", "Resource");
        set(
            modules,
            [module, "components", kind],
            renderComponent({
                name: kind,
                tag: "Resource",
                props: {
                    kind,
                    apiVersion: group ? `${group}/${version}` : version,
                    id,
                },
                description: definition.description,
                context,
                propTypes: props,
            }),
        );
    }

    while (nestedStack.length) {
        const id = nestedStack.shift();

        if (!id) {
            break;
        }

        const module = getModuleForId(id);
        const name = id.split(".").pop();

        if (!name || processed.has(id)) {
            continue;
        }
        processed.add(id);

        const { props, context } = createProps(definitions[id]);
        genProps(module, props);

        for (const { id: ctxId, path } of context) {
            set(nested, [ctxId, id, path], true);
            nestedStack.push(ctxId);
        }

        imports(module, "rekube", "Item");
        set(
            modules,
            [module, "components", name],
            renderComponent({
                tag: "Item",
                name,
                propsName: "value",
                description: definitions[id].description,
                props: {
                    id,
                    paths: mapValues(nested[id], (obj) => first(keys(obj))),
                },
                propTypes: props,
                context,
            }),
        );
    }

    const sink = new FilesSink();

    for (const [module, { imports, interfaces, components }] of entries(
        modules,
    )) {
        const file = `${module}.tsx`;

        if (!isEmpty(imports)) {
            sink.append(
                file,
                entries(imports)
                    .map(
                        ([dependant, types]) =>
                            `import {${uniq(types)}} from '${dependant}';`,
                    )
                    .join("\n"),
            );
        }

        if (!isEmpty(interfaces)) {
            sink.append(file, values(interfaces).join("\n"));
        }

        if (!isEmpty(components)) {
            sink.append(file, values(components).join("\n"));
        }
    }

    return sink;
}
