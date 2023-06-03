require("esbuild-register/dist/node.js").register({
    target: `node${process.version.slice(1)}`,
});
global.React = require("react");
const { resolve } = require("path");
const { renderYaml } = require("./index.tsx");
const file = require(resolve(process.cwd(), process.argv[2] || "k8s.tsx"));
renderYaml(
    file.default instanceof Function
        ? React.createElement(file.default)
        : file.default,
).then(console.log);
