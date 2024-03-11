import React, { createContext, useContext, useEffect, useMemo } from "react";

type RootContextState = {
    asserts: Error[];
};

const RootContext = createContext<RootContextState>({
    asserts: [],
});

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

export function Root({
    asserts,
    children,
}: {
    asserts: Error[];
    children?: React.ReactNode;
}) {
    const value = useMemo(
        () => ({
            asserts,
        }),
        [asserts]
    );

    return (
        <RootContext.Provider value={value}>
            <root>{children}</root>
        </RootContext.Provider>
    );
}
