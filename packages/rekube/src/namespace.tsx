import React, { createContext, useContext } from "react";

const NamespaceContext = createContext<string>("default");

export function NamespaceProvider({
    children,
    namespace,
}: {
    children: React.ReactNode;
    namespace: string;
}) {
    return (
        <NamespaceContext.Provider value={namespace}>
            {children}
        </NamespaceContext.Provider>
    );
}

export function useNamespace() {
    return useContext(NamespaceContext);
}
