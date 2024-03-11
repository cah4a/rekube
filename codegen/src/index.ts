import { resolve, dirname } from "path";
import * as fs from "fs/promises";
import { format } from "prettier";
import { codegen } from "codegen";
import { fetchDefinitions } from "fetchDefinitions";
import { makeSpecification } from "specification";

(async () => {
    const { definitions, kinds } = await fetchDefinitions();
    const specifications = makeSpecification(definitions, kinds);

    await buildConvertLib("../packages/converter", specifications);
    await buildBaseLib("../packages/base", specifications);
})();

async function trimDir(dir: string) {
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
        if (item.isDirectory() && item.name !== "node_modules") {
            await fs.rm(resolve(dir, item.name), {
                recursive: true,
                force: true,
            });
        }
    }
}

async function buildConvertLib(
    dir: string,
    { specs, relations }: Awaited<ReturnType<typeof makeSpecification>>
) {
    await trimDir(resolve(dir, "src"));

    await writeFile(
        resolve(dir, "src/specification/types.ts"),
        await fs.readFile(__dirname + "/types.ts", "utf8")
    );

    await writeFile(
        resolve(dir, "src/specification/specs.ts"),
        `
        import { Spec } from 'specification/types';
        
        export const specs = new Map<string, Spec>([
            ${Array.from(specs.values(), (spec) => `[${JSON.stringify(spec.id)}, ${JSON.stringify(spec)} as Spec]`).join(",\n")}
        ]);
        `
    );
    await writeFile(
        resolve(dir, "src/specification/relations.ts"),
        `
        import { ContextRelation } from 'specification/types';
        
        export const relations = new Map<string, ContextRelation[]>(
            ${JSON.stringify(Array.from(relations.byParentIdMap))}
        );
        `
    );
}

async function buildBaseLib(
    dir: string,
    specifications: Awaited<ReturnType<typeof makeSpecification>>
) {
    const files = codegen(specifications);

    await trimDir(dir);

    for (const [fileName, content] of files) {
        await writeFile(resolve(dir, fileName), content);
    }
}

async function writeFile(path: string, content: string) {
    await fs.mkdir(dirname(path), { recursive: true });
    const data = path.match(/\.tsx?$/)
        ? format(content, { parser: "babel-ts" })
        : content;
    await fs.writeFile(path, data);
}
