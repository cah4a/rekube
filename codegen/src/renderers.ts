import { map } from "lodash";

function renderTypes(props: any[]) {
    return props.map(({ name, isRequired, type, isArray, description }) =>
        [
            description
                ? [
                      "/**",
                      ...description
                          .replaceAll("*/", "*\u200B/")
                          .split("\n")
                          .map((line) => `* ${line.trim()}`),
                      "*/\n",
                  ].join("\n")
                : "",
            `"${name}"`,
            isRequired ? ":" : "?:",
            type,
            isArray ? "[];" : ";",
        ].join("")
    );
}

export function renderInterface({
    name,
    props,
    description,
}: {
    name: string;
    props: any[];
    description?: string;
}) {
    description = description
        ? [
              "/**",
              ...description.split("\n").map((line) => `* ${line.trim()}`),
              "*/",
          ].join("\n")
        : "";

    return `
        ${description}
        export interface ${name} {
            ${renderTypes(props).join("\n")}
        }
    `;
}

function reactProp(value: any, key: string) {
    if (typeof value === "string") {
        return `${key}=${JSON.stringify(value)}`;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return `${key}={${value}}`;
    }

    return `${key}={${JSON.stringify(value)}}`;
}

export function renderComponent({
    name,
    tag,
    description,
    context,
    propTypes,
    props,
    propsName = "props",
    propsMapper,
}: {
    name: string;
    tag: string;
    description?: string;
    context: any[];
    propTypes: any[];
    props?: Record<string, any>;
    propsName?: string;
    propsMapper?: string;
}) {
    const signature = renderTypes(propTypes);

    const propLine = [
        ...map(props, reactProp),
        `${propsName}={${propsMapper ? "childProps" : "props"}}`,
    ].join(" ");

    const descriptionLines = [
        ...(description || "").split("\n").map((line) => `* ${line.trim()}`),
    ];

    if (context.length) {
        signature.push("children?: React.ReactNode;");
        const propsType = `{ ${signature.join("\n")} }`;

        descriptionLines.push(
            "*",
            "* Child components:",
            ...context.map(({ path, type }) => `* - ${path}: {@link ${type}}`)
        );

        return `
                /**
                ${descriptionLines.join("\n")}
                */
              export function ${name}({children, ...props}: ${propsType}) {
                  ${propsMapper ? `const childProps = ${propsMapper};` : ''}
                  return <${tag} ${propLine}>{children}</${tag}>
              }
          `;
    }

    return `
        /**
        ${descriptionLines.join("\n")}
        */
        export function ${name}(props: { ${signature.join("\n")} }) {
            ${propsMapper ? `const childProps = ${propsMapper};` : ''}
            return <${tag} ${propLine}/>
        }
    `;
}
