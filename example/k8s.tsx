import { Deployment } from "@rekube/base/apps/v1";
import {
    Container,
    ContainerPort,
    EnvFromSource,
    EnvVar,
    EnvVarSource,
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
                    <Container name="nginx">
                        <ContainerPort containerPort={3000} />

                        <EnvFromSource configMapRef={{ name: "mycfg" }}/>
                    </Container>

                    <Container init name="alpine">
                        <EnvVar name="SOME_VALUE">
                            <EnvVarSource configMapKeyRef={{ name: "mycfg", key: "some_key" }} />
                        </EnvVar>
                    </Container>
                </PodTemplateSpec>
            </Deployment>

            <Service meta:name="My service" selector={{ labels }}>
                <ServicePort port={4000} targetPort={3000} protocol="TCP" />
            </Service>
        </>
    );
}
