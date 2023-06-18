const { resolve } = require("path");
const { program } = require("commander");
const { version } = require("./package.json");

program
    .name("rekube")
    .description("CLI to generate Kubernetes YAML files from React components")
    .version(version)
    .argument("[filename.tsx]", "file to be converted to ", "k8s.tsx")
    .action((path) => {
        require("esbuild-register/dist/node.js").register({
            target: `node${process.version.slice(1)}`,
            hookIgnoreNodeModules: false,
        });

        global.React = require("react");

        const file = require(resolve(process.cwd(), path));
        const { renderYaml } = require("./index.tsx");

        renderYaml(
            file.default instanceof Function
                ? React.createElement(file.default)
                : file.default
        ).then(console.log, e => console.error(e));
    });

// program
//     .command("generate")
//     .description("Generates component from the yaml file")
//     .alias("g")
//     .argument("<from-file>", "file to be converted to rekube component")
//     .action((str, options) => {
//         console.log("generate", str, options);
//     });


program.parse();
