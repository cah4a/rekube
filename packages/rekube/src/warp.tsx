import React from "react";

export function Warp({
    transformer,
    children,
}: {
    transformer: (
        resources: {
            kind: string;
            apiVersion: string;
            metadata?: Record<string, any>;
        } & Record<string, string>
    ) => object;
    children: React.ReactNode;
}) {
    return <warp transformer={transformer}>{children}</warp>;
}
