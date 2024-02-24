import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

type RootContextState = {
    asserts: Error[]
}

const NamespaceContext = createContext<string>("default");

export function NamespaceProvider({ children, namespace }: { children: React.ReactNode, namespace: string }) {
    return <NamespaceContext.Provider value={namespace}>{children}</NamespaceContext.Provider>;
}

export function useNamespace() {
    return useContext(NamespaceContext);
}

const RootContext = createContext<RootContextState>({
    asserts: []
});
const ItemContext = createContext("");
const ResourceContext = createContext<
    | { kind: string; apiVersion: string; }
    | undefined
>(undefined);

export function useResource() {
    return useContext(ResourceContext);
}

/**
 * React hook to throw an error if the condition is not met on the final render.
 *
 * @param condition
 * @param error
 */
export function useAssert(condition: boolean, error: Error) {
    const { asserts } = useContext(RootContext);

    useEffect(() => {
        if (condition) {
            return;
        }

        asserts.push(error);

        return () => {
            asserts.splice(asserts.indexOf(error), 1);
        };
    }, [error]);
}

/**
 * Wrapper around `useState` hook that returns a placeholder until the state is set.
 * This allows usage of state without need to check if it's set.
 * If the state is not set until the final render, it will throw an error.
 */
export function useLateState<T>(placeholder: T) {
    const [state, setState] = useState<T>(placeholder);

    useAssert(state !== placeholder, new Error(`State is not set`));

    return [
        state,
        setState
    ] as const;
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
                             contexts,
                             children
                         }: {
    kind: string;
    apiVersion: string;
    contexts?: { id: string, path: string, isItem?: boolean, flag?: string }[],
    id: string;
    props: Record<string, any>;
    children?: React.ReactNode;
}) {
    const parentId = useContext(ItemContext);

    if (parentId) {
        if (!contexts?.length) {
            throw new Error(`Unexpected parent ${parentId} for element ${id}`);
        }

        const { path, isItem } = contexts.find(
            ctx => ctx.id === parentId && !ctx.flag
        ) || {};

        if (!path) {
            throw new Error(`Unexpected parent ${parentId} for element ${id}. Expected one of ${contexts.map(ctx => ctx.id).join(", ")}`);
        }

        const value = {
            kind,
            apiVersion,
            ...props,
        }

        if (isItem) {
            children = <item path={path} value={value}>{children}</item>
        } else {
            children = <prop path={path} value={value}>{children}</prop>
        }
    } else {
        children = (
            <resource-definition kind={kind} apiVersion={apiVersion} {...props}>
                {children}
            </resource-definition>
        )
    }

    return (
        <ResourceContext.Provider value={{ kind, apiVersion }}>
            <ItemContext.Provider value={id}>
                {children}
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
        ctx => ctx.id === parentId && (ctx.flag ? ctx.flag === flag : true)
    ) || {};

    if (!path) {
        const hasFlags = contexts.some(ctx => ctx.flag);
        const idDescription = `${id} ${(flag ? ` with flag ${flag}` : (hasFlags ? ` with no flag passed` : ""))}`.trim();
        throw new Error(
            `Unexpected parent ${parentId} for element ${idDescription}. Expected one of ${contexts.map(ctx => ctx.id).join(", ")}`
        );
    }

    const props = { path, value, children };

    return (
        <ItemContext.Provider value={id}>
            {isItem ? <item {...props} /> : <prop {...props} />}
        </ItemContext.Provider>
    );
}

function Root({ asserts, children }: { asserts: Error[], children?: React.ReactNode }) {
    const value = useMemo(() => ({
        asserts
    }), [asserts]);

    return (
        <RootContext.Provider value={value}>
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
                    traverseChildren(item, child.children, `${prefix}${path}.`);
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
            default:
                throw new Error(`Unexpected node type ${child.type}`);
        }
    }

    return item;
}

class FailedToRender extends Error {
    constructor(message: string, public readonly asserts: Error[]) {
        super(message);
    }

    override toString() {
        return `${this.message}:\n${this.asserts.map(assert => assert.stack).join("\n")}`;
    }
}

export async function render(
    element: React.ReactElement
) {
    global.IS_REACT_ACT_ENVIRONMENT = true;

    const asserts = [];

    const result = await act(async () =>
        renderReact(<Root asserts={asserts}>{element}</Root>)
    );

    if (asserts.length) {
        throw new FailedToRender("Assert failed", asserts);
    }

    return map(result.head?.children, (element) => {
        if (element.type === "resource-definition") {
            return traverseChildren(clone(element.props), element.children);
        }
    });
}

export async function renderYaml(
    element: React.ReactElement
) {
    const rds = await render(element);
    return rds.map((rd) => dump(rd, { noRefs: true })).join("\n---\n");
}
