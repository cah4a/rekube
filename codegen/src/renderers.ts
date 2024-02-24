import { filter, map } from "lodash";

export type RenderableProp = {
    name: string;
    isRequired?: boolean;
    type: string;
    isArray?: boolean;
    description?: string;
};

function renderTypes(props: RenderableProp[], hasChildren?: boolean) {
    return props
        .map(({ name, isRequired, type, isArray, description }) =>
            [
                description
                    ? [
                          "/**",
                          ...description
                              .replace(/\*\//g, "*\u200B/")
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
        )
        .concat(hasChildren ? ["children?: React.ReactNode;"] : []);
}

export function renderInterface({
    name,
    props,
    description,
}: {
    name: string;
    props: RenderableProp[];
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
export class VarRef {
    constructor(public name: string) {}
}

function reactProp(value: any, key: string) {
    if (value instanceof VarRef) {
        return `${key}={${value.name}}`;
    }

    if (typeof value === "string") {
        return `${key}=${JSON.stringify(value)}`;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return `${key}={${value}}`;
    }

    return `${key}={${JSON.stringify(value)}}`;
}

export function renderComponent({
    subcomponentOf,
    name,
    tag,
    description,
    context,
    propTypes,
    props,
    propsName = "props",
    andPropTypeRefs = [],
    flags = [],
    defaultFlag,
    specKey,
}: {
    subcomponentOf?: string;
    name: string;
    tag: string;
    description?: string;
    context: any[];
    propTypes: RenderableProp[];
    props?: Record<string, any>;
    propsName?: string;
    andPropTypeRefs?: string[];
    flags?: (string | undefined)[];
    defaultFlag?: string;
    specKey?: string;
}) {
    props = {
        ...props,
        [propsName]: new VarRef("childProps"),
    };
    if (flags?.length) {
        props["flag"] = new VarRef("flag");
    }
    const propLine = map(props, reactProp).join(" ");

    const initPropsLine = `const { childProps ${
        flags?.length ? ", flag" : ""
    } } = useKubeProps(props, {
        ${specKey ? `key: "${specKey}",` : ""}
        ${flags?.length ? `flags: ${JSON.stringify(filter(flags))},` : ""}
        ${defaultFlag ? `defaultFlag: "${defaultFlag}",` : ""}
    })`;

    const descriptionLines = [
        ...(description || "").split("\n").map((line) => `* ${line.trim()}`),
    ];

    const declaration = subcomponentOf
        ? `${subcomponentOf}.${name}`
        : `export const ${name}`;

    const flagIsOptional = defaultFlag || flags.includes(undefined);

    const flagType = flags?.length
        ? `( ${flags
              .filter((flag) => !!flag)
              .map((flag) =>
                  flag
                      ? `{ ${flag}${flagIsOptional ? "?" : ""}: boolean }`
                      : `{}`
              )
              .join(" | ")} )`
        : undefined;

    const propType = [
        `{ ${renderTypes(propTypes, context.length > 0).join("\n")} }`,
        ...andPropTypeRefs,
        ...filter([flagType]),
    ].join(" & ");

    if (context.length) {
        descriptionLines.push(
            "*",
            "* Child components:",
            ...context.map(({ path, name, flag, isItem }) =>
                [
                    `* - ${path}: {@link ${name}}`,
                    flag ? ` with '${flag}' flag` : "",
                    isItem ? "" : " (single element)",
                ].join("")
            )
        );

        return `
              /** ${descriptionLines.join("\n")} */
              ${declaration} = ({ children, ...props }: ${propType}) => {
                  ${initPropsLine}
                  return <${tag} ${propLine}>{children}</${tag}>
              }
          `;
    }

    return `
        /** ${descriptionLines.join("\n")} */
        ${declaration} = (props: ${propType}) => {
            ${initPropsLine}
            return <${tag} ${propLine}/>
        }
    `;
}
