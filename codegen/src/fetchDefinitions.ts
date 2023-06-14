import { filter, map, values } from "lodash";
import fs from "fs/promises";
import { GVK } from "specification";

async function fetchVersionDefinitions(version: string): Promise<{
    definitions: Record<string, any>;
    kinds: GVK[];
}> {
    const url = `https://raw.githubusercontent.com/kubernetes/kubernetes/v${version}/api/openapi-spec/swagger.json`;

    console.log(`Fetching ${url}`);

    const req = await fetch(url);
    const res = await req.json();

    return {
        definitions: res.definitions,
        kinds: filter(
            map(values(res.paths), "post.x-kubernetes-group-version-kind")
        ),
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

export async function fetchDefinitions() {
    const cacheFile = "./node_modules/.cache.json";
    const definitions: Record<string, any> = {};
    const kinds = new Set<string>();

    try {
        const cache = JSON.parse(await fs.readFile(cacheFile, "utf8"));
        Object.assign(definitions, cache.definitions);
        cache.kinds.forEach((gvk) => kinds.add(gvk));
        return { definitions, kinds };
    } catch (e) {
        console.error(e);
        // file doesn't exists?
    }

    for (const version of VERSIONS) {
        const data = await fetchVersionDefinitions(version);

        Object.assign(definitions, data.definitions);
        data.kinds.forEach((gvk) => {
            kinds.add(`${gvk.group}.${gvk.version}.${gvk.kind}`);
        });
    }

    await fs.writeFile(
        cacheFile,
        JSON.stringify({
            definitions,
            kinds: Array.from(kinds.values()),
        })
    );

    return { definitions, kinds };
}
