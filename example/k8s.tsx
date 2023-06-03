import { Deployment } from "@rekube/base/apps/v1";
import { Container, ContainerPort, Service, ServicePort } from "@rekube/base/core/v1";

export default function App() {
    const labels = { app: "nginx" };

    return (
        <>
            <Deployment
                spec={{ template: { metadata: { labels } }, selector: { matchLabels: labels } }}
            >
                <Container name="nginx">
                    <ContainerPort containerPort={3000} />
                </Container>
            </Deployment>

            <Service spec={{ selector: labels }}>
                <ServicePort port={3000} />
            </Service>
        </>
    );
}
