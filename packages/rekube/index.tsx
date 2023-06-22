import React, { createContext, useContext } from "react";
import { clone, get, map, set } from "lodash-es";
import { act, NilNode, render as renderReact } from "react-nil";
import { dump } from "js-yaml";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "resource-definition": {
                kind: string;
                apiVersion: string;
                metadata?: Record<string, any>;
                children?: React.ReactNode;
            };

            prop: {
                path: string;
                value?: any;
                children?: React.ReactNode;
            };

            item: {
                path: string;
                value?: any;
                children?: React.ReactNode;
            };

            root: {};
        }
    }
}

type Suffix = "Ki" | "Mi" | "Gi" | "Ti" | "Pi" | "Ei" | "m" | "" | "k" | "M" | "G" | "T" | "P" | "E";
export type Quantity = number | `${number}${Suffix}` | `e${number}` | `E${number}`

export type IntOrString = number | string;

export type ParamKind = {
    apiVersion: string;
    kind: string;
};

export type Time = string | Date;
export type MicroTime = string | Date;

export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

export type RawExtension = object;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {
}

const RootContext = createContext("");
const ItemContext = createContext("");
const ResourceContext = createContext<
    | {
    kind: string;
    apiVersion: string;
}
    | undefined
>(undefined);

export function useResource() {
    const resouce = useContext(ResourceContext);

    if (!resouce) {
        throw new Error(`Can't find resource definition context`);
    }

    return resouce;
}

/**
 * React hook to process `meta:*` keys from props, wrap props into some key, process flags.
 *
 * @param props
 * @param key
 * @param flags
 */
export function useKubeProps(props: Record<string, any>, { key, flags, defaultFlag }: {
    key?: string,
    flags?: string[],
    defaultFlag?: string
}) {
    const metadata = Object.assign(
        {},
        Object.fromEntries(
            Object.keys(props)
                .filter(name => name.startsWith("meta:"))
                .map(key => {
                    const value = props[key];
                    delete props[key];
                    return [key.substring(5), value];
                })
        ),
        props["metadata"]
    );

    delete props["metadata"];

    const flag = (flags || []).find(flag => props[flag]) || defaultFlag;

    if (flags?.length) {
        for (const flag of flags) {
            delete props[flag];
        }
    }

    let childProps = key ? { [key]: props } : { ...props };

    if (Object.keys(metadata).length) {
        childProps = { metadata, ...childProps };
    }

    return {
        childProps,
        flag
    };
}

export function Resource({
                             kind,
                             apiVersion,
                             props,
                             id,
                             children
                         }: {
    kind: string;
    apiVersion: string;
    id: string;
    props: Record<string, any>;
    children?: React.ReactNode;
}) {
    return (
        <ResourceContext.Provider value={{ kind, apiVersion }}>
            <ItemContext.Provider value={id}>
                <resource-definition kind={kind} apiVersion={apiVersion} {...props}>
                    {children}
                </resource-definition>
            </ItemContext.Provider>
        </ResourceContext.Provider>
    );
}

export function Item({
                         id,
                         contexts,
                         flag,
                         value,
                         children
                     }: {
    id: string;
    contexts: { id: string, path: string, isItem?: boolean, flag?: string }[],
    flag?: string;
    value?: any;
    children?: React.ReactNode;
}) {
    const parentId = useContext(ItemContext);

    if (!parentId) {
        throw new Error(`Can't find parent element context`);
    }

    const { path, isItem } = contexts.find(
        ctx => ctx.id === parentId && ctx.flag === flag
    ) || {};

    if (!path) {
        const hasFlags = contexts.some(ctx => ctx.flag);
        throw new Error(`Unexpected parent ${parentId} for element ${id}` + (flag ? ` with flag ${flag}` : (hasFlags ? ` with no flag passed` : "")));
    }

    const props = { path, value, children };

    return (
        <ItemContext.Provider value={id}>
            {isItem ? <item {...props} /> : <prop {...props} />}
        </ItemContext.Provider>
    );
}

function Root({ env, children }: any) {
    return (
        <RootContext.Provider value={env}>
            <root>{children}</root>
        </RootContext.Provider>
    );
}

function traverseChildren(item: any, children: NilNode[], prefix = "") {
    for (const child of children) {
        switch (child.type) {
            case "prop": {
                const { path, value } = child.props;
                set(item, prefix + path, value);
                if (child.children.length) {
                    traverseChildren(item, child.children, `${path}.`);
                }
                break;
            }
            case "item": {
                const { path, value } = child.props;
                const items = get(item, prefix + path, []);

                if (!Array.isArray(items)) {
                    throw new Error(
                        `Can't add item to non-array item on path ${prefix + path}`
                    );
                }

                const index = items.length;
                set(item, prefix + path + `[${index}]`, value);
                if (child.children.length) {
                    traverseChildren(item, child.children, prefix + path + `[${index}].`);
                }
                break;
            }
        }
    }

    return item;
}

export async function render(
    element: React.ReactElement,
    env: Record<string, any> = {}
) {
    global.IS_REACT_ACT_ENVIRONMENT = true;

    const result = await act(async () =>
        renderReact(<Root env={env}>{element}</Root>)
    );

    return map(result.head?.children, (element) => {
        if (element.type === "resource-definition") {
            return traverseChildren(clone(element.props), element.children);
        }
    });
}

export async function renderYaml(
    element: React.ReactElement,
    env: Record<string, any> = {}
) {
    const rds = await render(element, env);
    return rds.map((rd) => dump(rd, { noRefs: true })).join("\n---\n");
}
