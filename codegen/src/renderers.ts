import { map } from "lodash";

export function renderInterface(name: string, props: any[], children = false) {
  const propTypes = props.map(({ name, isRequired, type, isArray }) =>
    [name, isRequired ? ":" : "?:", type, isArray ? "[];" : ";"].join("")
  );

  return `
        export interface ${name} {
            ${propTypes.join("\n")}
            ${children ? "children?: React.ReactNode;" : ""}
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
}: {
  name: string;
  tag: string;
  description?: string;
  context: any[];
  propTypes: any[];
  props?: Record<string, any>;
  propsName?: string;
}) {
  const contextDesr = map(context, ({ id, path }) => `${path}: ${id}`).join(
    "\n* - "
  );
  const signature = propTypes.map(({ name, isRequired, type, isArray }) =>
    [name, isRequired ? ":" : "?:", type, isArray ? "[];" : ";"].join("")
  );

  if (context.length) {
    signature.push("children?: React.ReactNode;");

    return `
            /**
            * ${description} ${contextDesr ? `\n* - ${contextDesr}` : ""}
            */
            export function ${name}({children, ...props}: { ${signature.join(
      "\n"
    )} }) {
                return <${tag} ${map(props, reactProp).join(
      " "
    )} ${propsName}={props}>{children}</${tag}>
            }
        `;
  }

  return `
        /**
        * ${description} ${contextDesr ? `\n* - ${contextDesr}` : ""}
        */
        export function ${name}(props: { ${signature.join("\n")} }) {
            return <${tag} ${map(props, reactProp).join(
    " "
  )} ${propsName}={props}/>
        }
    `;
}
