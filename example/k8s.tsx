import { Postgres } from "@rekube/components";
import { NamespaceProvider } from "rekube";

export default function MyCloud() {
    return (
        <NamespaceProvider namespace="my-namespace">
            <Postgres name="my-postgres" />
        </NamespaceProvider>
    );
}
