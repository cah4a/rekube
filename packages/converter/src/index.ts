import { relations } from "specification/relations";
import { specs } from "specification/specs";
import { get, keyBy, filter, unset, isEmpty, isObject, camelCase, upperFirst, map } from "lodash";
import { loadAll } from "js-yaml";
import { Spec } from "specification/types.js";
import prettier from "prettier/standalone";
import babel from 'prettier/parser-babel';

function format(code: string) {
    return prettier.format(code, {
        parser: "babel",
        plugins: [babel]
    });
}

const byGvk = keyBy(
    filter(Array.from(specs.values()), "gvk"),
    ({ gvk }) => gvk.group ? `${gvk.group}/${gvk.version}/${gvk.kind}` : `${gvk.version}/${gvk.kind}`
);

export function convert(input: string | object | object[]): string {
    if (typeof input === "string") {
        input = loadAll(input);
    }

    const items = Array.isArray(input) ? input : [input];

    const components = map(items, renderKindTag);

    if (components.length === 1) {
        const { name, imports, jsx } = components[0];
        return format([
            renderImportStatements(imports),
            `const ${name} = () => (${jsx});`
        ].join("\n\n"));
    }

    const imports = components.reduce((acc, { imports }) => Object.assign(acc, imports), {});

    return format([
        renderImportStatements(imports),
        ...components.map(({ name, jsx }) => `const ${name} = () => (${jsx});`),
        `const Release = () => (
            <>
                ${components.map(({ name }) => `<${name}/>`).join("\n")}
            </>
        );`
    ].join("\n\n"));
}

function renderImportStatements(imports: Record<string, string>) {
    const modules = new Set(Object.values(imports));

    return Array.from(modules.values(), module => {
        const names = Object.entries(imports)
            .filter(([_, value]) => value === module)
            .map(([key]) => key);

        return `import {${names.join(", ")}} from '@rekube/base/${module}';`;
    }).join("\n");
}

function renderKindTag(input: { kind: string, apiVersion: string }) {
    if (!(input instanceof Object)) {
        throw new Error("Invalid input");
    }

    const { kind, apiVersion, ...props } = input as any;
    if (!kind && !apiVersion) {
        throw new Error("Invalid input");
    }
    const spec = byGvk[`${apiVersion}/${kind}`];

    if (!spec) {
        console.warn(`No spec found for ${apiVersion}/${kind}`);
    }

    const jsx = spec ? renderTag(spec, props) : {
        imports: {},
        jsx: `<resource-definition ${renderProps(input)}/>`
    };
    const name = get(input, "metadata.name") || get(input, "metadata.generateName") || "my";

    return {
        name: upperFirst(camelCase(name) + kind),
        ...jsx
    };
}


function renderTag(spec: Spec, props: Record<string, any>, flag?: string) {
    const children: string[] = [];
    const imports: Record<string, string> = {};

    for (const relation of relations.get(spec.id) || []) {
        const value = get(props, relation.path);

        if (value) {
            unset(props, relation.path);

            const items = Array.isArray(value) ? value : [value];

            for (const item of items) {
                const child = renderTag(
                    specs.get(relation.id),
                    item,
                    relation.alias && !relation.alias?.default ? relation.alias.name : undefined,
                );

                Object.assign(imports, child.imports);
                children.push(child.jsx);
            }
        }
    }

    imports[spec.name] = spec.module;

    if (children.length === 0) {
        return {
            imports,
            jsx: `<${spec.name} ${flag || ""} ${renderProps(props, spec.hasMeta, spec.specKey)}/>`
        };
    }

    return {
        imports,
        jsx: `<${spec.name} ${flag || ""} ${renderProps(props, spec.hasMeta, spec.specKey)}>${children.join("\n")}</${spec.name}>`
    };
}

function renderProps(props: Record<string, any>, hasMeta = false, specKey?: string) {
    if (hasMeta && "metadata" in props) {
        const metadata = props.metadata;
        delete props.metadata;

        for (const [key, value] of Object.entries(metadata)) {
            props[`meta:${key}`] = value;
        }
    }

    if (specKey) {
        const spec = props[specKey] || {};
        delete props[specKey];

        for (const [key, value] of Object.entries(spec)) {
            props[key] = value;
        }
    }

    return Object.entries(props)
        .filter(([_, value]) => !isObject(value) || !isEmpty(value))
        .map(([key, value]) => `${key}=${renderPropValue(value)}`).join(" ");
}

function renderPropValue(value: any) {
    if (typeof value === "string") {
        return JSON.stringify(value);
    }

    return `{${JSON.stringify(value)}}`;
}
