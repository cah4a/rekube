import { codegen } from "codegen";
import { resolve, dirname } from "path";
import * as fs from "fs/promises";
import { format } from "prettier";
import * as process from "process";
import { fetchDefinitions } from "fetchDefinitions";

const dir = process.argv[2] || "../packages/base";

if (!dir) {
    throw new Error(`Provide output directory`);
}

(async () => {
    const { definitions, kinds } = await fetchDefinitions();

    const files = codegen(definitions, kinds);

    await fs.mkdir(dir, { recursive: true });
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
        if (item.isDirectory() && item.name !== "node_modules") {
            await fs.rm(resolve(dir, item.name), {
                recursive: true,
                force: true,
            });
        }
    }

    for (const [fileName, content] of files) {
        const path = resolve(dir, fileName);
        await fs.mkdir(dirname(path), { recursive: true });
        const data = fileName.endsWith("tsx")
            ? format(content, { parser: "babel-ts" })
            : content;
        await fs.writeFile(path, data);
    }
})();
