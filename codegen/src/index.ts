import { codegen } from "codegen";
import { resolve, dirname } from "path";
import * as fs from "fs/promises";
import { format } from "prettier";
import * as process from "process";

const dir = process.argv[2];

if (!dir) {
    throw new Error(`Provide output directory`)
}

codegen().then(async (files) => {

    files.append(
        "package.json",
        JSON.stringify(
            {
                name: "@rekube/base",
                bin: "bin.cjs",
                dependencies: {
                    "rekube": "workspace:",
                }
            },
            null,
            2,
        ),
    );

    files.append(
        "tsconfig.json",
        JSON.stringify(
            {
                compilerOptions: {
                    rootDir: ".",
                    baseUrl: ".",
                    jsx: "react",
                    noEmit: true,
                    allowUmdGlobalAccess: true,
                },
            },
            null,
            2,
        ),
    );

    for (const [fileName, content] of files) {
        const path = resolve(dir, fileName);
        await fs.mkdir(dirname(path), { recursive: true });
        const data = fileName.endsWith("tsx")
            ? format(content, { parser: "babel-ts" })
            : content;
        await fs.writeFile(path, data);
    }
});
