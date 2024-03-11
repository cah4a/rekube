import React from "react";
import { act, NilNode, render as renderReact } from "react-nil";
import { assign, cloneDeep, flatMap, get, has, merge, set } from "lodash-es";
import { dump } from "js-yaml";
import { Root } from "./root";

export class FailedToRender extends Error {
    constructor(message: string, public readonly asserts: Error[]) {
        super(message);
    }

    override toString() {
        return `${this.message}:\n${this.asserts
            .map((assert) => assert.stack)
            .join("\n")}`;
    }
}

export async function render(element: React.ReactElement) {
    global.IS_REACT_ACT_ENVIRONMENT = true;

    const asserts = [];

    const result = await act(async () =>
        renderReact(<Root asserts={asserts}>{element}</Root>)
    );

    if (asserts.length) {
        throw new FailedToRender("Asserts failed", asserts);
    }

    return renderResources(result.head?.children);
}

export async function renderYaml(element: React.ReactElement) {
    const rds = await render(element);
    return rds.map((rd) => dump(rd, { noRefs: true })).join("\n---\n");
}

function renderResources(elements: NilNode[]) {
    return flatMap(elements, (element) => {
        if (element.type === "resource" || element.type === "warp") {
            return renderResource(element);
        }

        throw new Error(
            `Expected resource or warp element, got ${element.type}`
        );
    }).filter(Boolean);
}

function renderResource(element: NilNode) {
    switch (element.type) {
        case "warp":
            const children = renderResources(element.children);
            if (!children.length) {
                return [];
            }
            if (children.length > 1) {
                throw new Error(
                    "Warp transformer should return a single resource"
                );
            }
            if (!(element.props.transformer instanceof Function)) {
                throw new Error("Warp transformer prop should be a function");
            }
            return element.props.transformer(children[0]);
        case "resource":
            const resource = assign({}, element.props);
            for (const child of element.children) {
                renderResourceElement(resource, child);
            }
            return resource;
        default:
            throw new Error(`Unexpected element ${element.type}`);
    }
}

function renderResourceElement(resource: any, element: NilNode, prefix = "") {
    switch (element.type) {
        case "prop": {
            const { path, value } = element.props;
            if (has(resource, prefix + path)) {
                throw new Error(`Path ${prefix + path} already exists`);
            }
            set(resource, prefix + path, value);
            for (const child of element.children) {
                renderResourceElement(resource, child, `${prefix}${path}.`);
            }
            break;
        }
        case "item": {
            const { path, value } = element.props;
            const items = get(resource, prefix + path, []);
            if (!Array.isArray(items)) {
                throw new Error(
                    `Can't add item to non-array item on path ${prefix + path}`
                );
            }
            const index = items.length;
            const item = cloneDeep(value);
            for (const child of element.children) {
                renderResourceElement(item, child);
            }
            set(resource, prefix + path + `[${index}]`, item);
            break;
        }
        case "warp": {
            const { transformer } = element.props;
            const p = prefix.replace(/\.$/, "");
            const alt = cloneDeep(get(resource, p)) ?? {};
            for (const child of element.children) {
                renderResourceElement(alt, child);
            }
            if (!(transformer instanceof Function)) {
                throw new Error("Warp transformer prop should be a function");
            }
            const value = merge(get(resource, p), transformer(alt));
            set(resource, p, value);
            break;
        }
        default:
            throw new Error(`Unexpected element ${element.type}`);
    }
}

// function renderToPath(item: any, children: NilNode[], prefix = "") {
//     for (const child of children) {
//         switch (child.type) {
//             case "prop": {
//                 const { path, value } = child.props;
//                 set(item, prefix + path, value);
//                 if (child.children.length) {
//                     traverseChildren(item, child.children, `${prefix}${path}.`);
//                 }
//                 break;
//             }
//             case "item": {
//                 const { path, value } = child.props;
//                 const items = get(item, prefix + path, []);
//
//                 if (!Array.isArray(items)) {
//                     throw new Error(
//                         `Can't add item to non-array item on path ${prefix + path}`
//                     );
//                 }
//
//                 const index = items.length;
//                 set(item, prefix + path + `[${index}]`, value);
//                 if (child.children.length) {
//                     traverseChildren(item, child.children, prefix + path + `[${index}].`);
//                 }
//                 break;
//             }
//             default:
//                 throw new Error(`Unexpected node type ${child.type}`);
//         }
//     }
//
//     return item;
// }

// function renderElement(element: NilNode) {
//     switch (element.type) {
//         case "warp": {
//             const children = renderResources(element.children);
//
//             if (!children.length) {
//                 return [];
//             }
//
//             if (!(element.props.transformer instanceof Function)) {
//                 throw new Error("Warp transformer prop should be a function");
//             }
//
//             return element.props.transformer(children);
//         }
//         case "resource-definition": {
//             let resource = assign({}, element.props);
//             for (const child of element.children) {
//                 //Object.assign(resource, renderElement(child));
//                 resource = merge(resource, renderElement(child));
//             }
//             return resource;
//         }
//         case "prop": {
//             const { path, value } = element.props;
//             let resource = set({}, `${path}`, value);
//             for (const child of element.children) {
//                 resource = merge(resource, set({}, `${path}`, renderElement(child)));
//             }
//             return resource;
//         }
//         case "item": {
//             const { path, value } = element.props;
//             let resources = [];
//
//             // let resource = set({}, `${path}`, []);
//             // if (!Array.isArray(items)) {
//             //     throw new Error(
//             //         `Can't add item to non-array item on path ${
//             //             prefix + path
//             //         }`
//             //     );
//             // }
//             // const index = items.length;
//             // set(resource, prefix + path + `[${index}]`, value);
//             // for (const child of element.children) {
//             //     renderElement(resource, child, `${prefix}${path}[${index}].`);
//             // }
//             break;
//         }
//     }
// }
