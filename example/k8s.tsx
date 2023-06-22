import { Deployment } from "@rekube/base/apps/v1";
import {
    Container,
    ContainerPort,
    PodTemplateSpec,
    Service,
    ServicePort
} from "@rekube/base/core/v1";

export default function App() {
    const labels = { app: "nginx" };

    return (
        <>
            <Deployment
                meta:name="nginx"
                replicas={3}
                selector={{ matchLabels: labels }}
            >
                <PodTemplateSpec meta:labels={labels}>
                    <Container name="nginx" image="nginx:1.14.2">
                        <ContainerPort containerPort={80} />
                    </Container>
                </PodTemplateSpec>
            </Deployment>

            <Service meta:name="nginx-svc" selector={{ labels }}>
                <ServicePort port={80} targetPort={80} protocol="TCP" />
            </Service>
        </>
    );
}
