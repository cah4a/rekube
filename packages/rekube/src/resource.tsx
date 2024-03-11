import React, { createContext, useContext } from "react";

const ItemContext = createContext("");

const ResourceContext = createContext<
    { kind: string; apiVersion: string } | undefined
>(undefined);

export function useResource() {
    return useContext(ResourceContext);
}

export function Resource({
    kind,
    apiVersion,
    props,
    id,
    contexts,
    children,
}: {
    kind: string;
    apiVersion: string;
    contexts?: { id: string; path: string; isItem?: boolean; flag?: string }[];
    id: string;
    props: Record<string, any>;
    children?: React.ReactNode;
}) {
    const parentId = useContext(ItemContext);

    if (parentId) {
        if (!contexts?.length) {
            throw new Error(`Unexpected parent ${parentId} for element ${id}`);
        }

        const { path, isItem } =
            contexts.find((ctx) => ctx.id === parentId && !ctx.flag) || {};

        if (!path) {
            throw new Error(
                `Unexpected parent ${parentId} for element ${id}. Expected one of ${contexts
                    .map((ctx) => ctx.id)
                    .join(", ")}`
            );
        }

        const value = {
            kind,
            apiVersion,
            ...props,
        };

        if (isItem) {
            children = (
                <item path={path} value={value}>
                    {children}
                </item>
            );
        } else {
            children = (
                <prop path={path} value={value}>
                    {children}
                </prop>
            );
        }
    } else {
        children = (
            <resource kind={kind} apiVersion={apiVersion} {...props}>
                {children}
            </resource>
        );
    }

    return (
        <ResourceContext.Provider value={{ kind, apiVersion }}>
            <ItemContext.Provider value={id}>{children}</ItemContext.Provider>
        </ResourceContext.Provider>
    );
}

export function Item({
    id,
    contexts,
    flag,
    value,
    children,
}: {
    id: string;
    contexts: { id: string; path: string; isItem?: boolean; flag?: string }[];
    flag?: string;
    value?: any;
    children?: React.ReactNode;
}) {
    const parentId = useContext(ItemContext);

    if (!parentId) {
        throw new Error(`Can't find parent element context`);
    }

    const { path, isItem } =
        contexts.find(
            (ctx) =>
                ctx.id === parentId && (ctx.flag ? ctx.flag === flag : true)
        ) || {};

    if (!path) {
        const hasFlags = contexts.some((ctx) => ctx.flag);
        const idDescription = `${id} ${
            flag ? ` with flag ${flag}` : hasFlags ? ` with no flag passed` : ""
        }`.trim();
        throw new Error(
            `Unexpected parent ${parentId} for element ${idDescription}. Expected one of ${contexts
                .map((ctx) => ctx.id)
                .join(", ")}`
        );
    }

    const props = { path, value, children };

    return (
        <ItemContext.Provider value={id}>
            {isItem ? <item {...props} /> : <prop {...props} />}
        </ItemContext.Provider>
    );
}
