import { test, expect } from "vitest";
import { convert } from "./index";

test("simple config", () => {
    const result = convert(
        `
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: nginx
          labels:
            app: nginx
        spec:
          replicas: 3
          selector:
            matchLabels:
              app: nginx
          template:
            metadata:
              labels:
                app: nginx
            spec:
              containers:
              - name: nginx
                image: nginx:1.14.2
                ports:
                - containerPort: 80
        `
    );

    expect(result).toMatchInlineSnapshot(`
      "import { LabelSelector } from \\"@rekube/base/meta/v1\\";
      import {
        ContainerPort,
        Container,
        PodTemplateSpec,
      } from \\"@rekube/base/core/v1\\";
      import { Deployment } from \\"@rekube/base/apps/v1\\";

      const NginxDeployment = () => (
        <Deployment meta:name=\\"nginx\\" meta:labels={{ app: \\"nginx\\" }} replicas={3}>
          <LabelSelector matchLabels={{ app: \\"nginx\\" }} />
          <PodTemplateSpec meta:labels={{ app: \\"nginx\\" }}>
            <Container name=\\"nginx\\" image=\\"nginx:1.14.2\\">
              <ContainerPort containerPort={80} />
            </Container>
          </PodTemplateSpec>
        </Deployment>
      );
      "
    `);
});


test("postgres chart", () => {
    const chart = `---
# Source: postgresql/templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: test-postgresql
  namespace: "default"
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-12.5.8
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/managed-by: Helm
type: Opaque
data:
  postgres-password: "R09ZV2RnRU5qQg=="
  # We don't auto-generate LDAP password when it's not provided as we do for other passwords
---
# Source: postgresql/templates/primary/svc-headless.yaml
apiVersion: v1
kind: Service
metadata:
  name: test-postgresql-hl
  namespace: "default"
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-12.5.8
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: primary
    # Use this annotation in addition to the actual publishNotReadyAddresses
    # field below because the annotation will stop being respected soon but the
    # field is broken in some versions of Kubernetes:
    # https://github.com/kubernetes/kubernetes/issues/58662
    service.alpha.kubernetes.io/tolerate-unready-endpoints: "true"
spec:
  type: ClusterIP
  clusterIP: None
  # We want all pods in the StatefulSet to have their addresses published for
  # the sake of the other Postgresql pods even before they're ready, since they
  # have to be able to talk to each other in order to become ready.
  publishNotReadyAddresses: true
  ports:
    - name: tcp-postgresql
      port: 5432
      targetPort: tcp-postgresql
  selector:
    app.kubernetes.io/name: postgresql
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/component: primary
---
# Source: postgresql/templates/primary/svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: test-postgresql
  namespace: "default"
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-12.5.8
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: primary
spec:
  type: ClusterIP
  sessionAffinity: None
  ports:
    - name: tcp-postgresql
      port: 5432
      targetPort: tcp-postgresql
      nodePort: null
  selector:
    app.kubernetes.io/name: postgresql
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/component: primary
---
# Source: postgresql/templates/primary/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: test-postgresql
  namespace: "default"
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-12.5.8
    app.kubernetes.io/instance: my-release
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: primary
spec:
  replicas: 1
  serviceName: test-postgresql-hl
  updateStrategy:
    rollingUpdate: {}
    type: RollingUpdate
  selector:
    matchLabels:
      app.kubernetes.io/name: postgresql
      app.kubernetes.io/instance: my-release
      app.kubernetes.io/component: primary
  template:
    metadata:
      name: test-postgresql
      labels:
        app.kubernetes.io/name: postgresql
        helm.sh/chart: postgresql-12.5.8
        app.kubernetes.io/instance: my-release
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/component: primary
    spec:
      serviceAccountName: default
      
      affinity:
        podAffinity:
          
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - podAffinityTerm:
                labelSelector:
                  matchLabels:
                    app.kubernetes.io/name: postgresql
                    app.kubernetes.io/instance: my-release
                    app.kubernetes.io/component: primary
                topologyKey: kubernetes.io/hostname
              weight: 1
        nodeAffinity:
          
      securityContext:
        fsGroup: 1001
      hostNetwork: false
      hostIPC: false
      containers:
        - name: postgresql
          image: docker.io/bitnami/postgresql:15.3.0-debian-11-r7
          imagePullPolicy: "IfNotPresent"
          securityContext:
            runAsUser: 1001
          env:
            - name: BITNAMI_DEBUG
              value: "false"
            - name: POSTGRESQL_PORT_NUMBER
              value: "5432"
            - name: POSTGRESQL_VOLUME_DIR
              value: "/bitnami/postgresql"
            - name: PGDATA
              value: "/bitnami/postgresql/data"
            # Authentication
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: test-postgresql
                  key: postgres-password
            # Replication
            # Initdb
            # Standby
            # LDAP
            - name: POSTGRESQL_ENABLE_LDAP
              value: "no"
            # TLS
            - name: POSTGRESQL_ENABLE_TLS
              value: "no"
            # Audit
            - name: POSTGRESQL_LOG_HOSTNAME
              value: "false"
            - name: POSTGRESQL_LOG_CONNECTIONS
              value: "false"
            - name: POSTGRESQL_LOG_DISCONNECTIONS
              value: "false"
            - name: POSTGRESQL_PGAUDIT_LOG_CATALOG
              value: "off"
            # Others
            - name: POSTGRESQL_CLIENT_MIN_MESSAGES
              value: "error"
            - name: POSTGRESQL_SHARED_PRELOAD_LIBRARIES
              value: "pgaudit"
          ports:
            - name: tcp-postgresql
              containerPort: 5432
          livenessProbe:
            failureThreshold: 6
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 5
            exec:
              command:
                - /bin/sh
                - -c
                - exec pg_isready -U "postgres" -h 127.0.0.1 -p 5432
          readinessProbe:
            failureThreshold: 6
            initialDelaySeconds: 5
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 5
            exec:
              command:
                - /bin/sh
                - -c
                - -e
                
                - |
                  exec pg_isready -U "postgres" -h 127.0.0.1 -p 5432
                  [ -f /opt/bitnami/postgresql/tmp/.initialized ] || [ -f /bitnami/postgresql/.initialized ]
          resources:
            limits: {}
            requests:
              cpu: 250m
              memory: 256Mi
          volumeMounts:
            - name: dshm
              mountPath: /dev/shm
            - name: data
              mountPath: /bitnami/postgresql
      volumes:
        - name: dshm
          emptyDir:
            medium: Memory
  volumeClaimTemplates:
    - apiVersion: v1
      kind: PersistentVolumeClaim
      metadata:
        name: data
      spec:
        accessModes:
          - "ReadWriteOnce"
        resources:
          requests:
            storage: "8Gi"
    `;

    const result = convert(chart);

    expect(result).toMatchInlineSnapshot(`
      "import {
        Secret,
        ServicePort,
        Service,
        PodAffinityTerm,
        WeightedPodAffinityTerm,
        PodAntiAffinity,
        Affinity,
        PodSecurityContext,
        Volume,
        EnvVar,
        EnvVarSource,
        ContainerPort,
        ResourceRequirements,
        SecurityContext,
        VolumeMount,
        Probe,
        Container,
        PodTemplateSpec,
        PersistentVolumeClaim,
      } from \\"@rekube/base/core/v1\\";
      import { LabelSelector } from \\"@rekube/base/meta/v1\\";
      import { StatefulSetUpdateStrategy, StatefulSet } from \\"@rekube/base/apps/v1\\";

      const TestPostgresqlSecret = () => (
        <Secret
          type=\\"Opaque\\"
          data={{ \\"postgres-password\\": \\"R09ZV2RnRU5qQg==\\" }}
          meta:name=\\"test-postgresql\\"
          meta:namespace=\\"default\\"
          meta:labels={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"helm.sh/chart\\": \\"postgresql-12.5.8\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/managed-by\\": \\"Helm\\",
          }}
        />
      );

      const TestPostgresqlHlService = () => (
        <Service
          meta:name=\\"test-postgresql-hl\\"
          meta:namespace=\\"default\\"
          meta:labels={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"helm.sh/chart\\": \\"postgresql-12.5.8\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/managed-by\\": \\"Helm\\",
            \\"app.kubernetes.io/component\\": \\"primary\\",
            \\"service.alpha.kubernetes.io/tolerate-unready-endpoints\\": \\"true\\",
          }}
          type=\\"ClusterIP\\"
          clusterIP=\\"None\\"
          publishNotReadyAddresses={true}
          selector={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/component\\": \\"primary\\",
          }}
        >
          <ServicePort
            name=\\"tcp-postgresql\\"
            port={5432}
            targetPort=\\"tcp-postgresql\\"
          />
        </Service>
      );

      const TestPostgresqlService = () => (
        <Service
          meta:name=\\"test-postgresql\\"
          meta:namespace=\\"default\\"
          meta:labels={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"helm.sh/chart\\": \\"postgresql-12.5.8\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/managed-by\\": \\"Helm\\",
            \\"app.kubernetes.io/component\\": \\"primary\\",
          }}
          type=\\"ClusterIP\\"
          sessionAffinity=\\"None\\"
          selector={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/component\\": \\"primary\\",
          }}
        >
          <ServicePort
            name=\\"tcp-postgresql\\"
            port={5432}
            targetPort=\\"tcp-postgresql\\"
            nodePort={null}
          />
        </Service>
      );

      const TestPostgresqlStatefulSet = () => (
        <StatefulSet
          meta:name=\\"test-postgresql\\"
          meta:namespace=\\"default\\"
          meta:labels={{
            \\"app.kubernetes.io/name\\": \\"postgresql\\",
            \\"helm.sh/chart\\": \\"postgresql-12.5.8\\",
            \\"app.kubernetes.io/instance\\": \\"my-release\\",
            \\"app.kubernetes.io/managed-by\\": \\"Helm\\",
            \\"app.kubernetes.io/component\\": \\"primary\\",
          }}
          replicas={1}
          serviceName=\\"test-postgresql-hl\\"
        >
          <LabelSelector
            matchLabels={{
              \\"app.kubernetes.io/name\\": \\"postgresql\\",
              \\"app.kubernetes.io/instance\\": \\"my-release\\",
              \\"app.kubernetes.io/component\\": \\"primary\\",
            }}
          />
          <PodTemplateSpec
            meta:name=\\"test-postgresql\\"
            meta:labels={{
              \\"app.kubernetes.io/name\\": \\"postgresql\\",
              \\"helm.sh/chart\\": \\"postgresql-12.5.8\\",
              \\"app.kubernetes.io/instance\\": \\"my-release\\",
              \\"app.kubernetes.io/managed-by\\": \\"Helm\\",
              \\"app.kubernetes.io/component\\": \\"primary\\",
            }}
            serviceAccountName=\\"default\\"
            hostNetwork={false}
            hostIPC={false}
          >
            <Affinity podAffinity={null} nodeAffinity={null}>
              <PodAntiAffinity>
                <WeightedPodAffinityTerm weight={1}>
                  <PodAffinityTerm topologyKey=\\"kubernetes.io/hostname\\">
                    <LabelSelector
                      matchLabels={{
                        \\"app.kubernetes.io/name\\": \\"postgresql\\",
                        \\"app.kubernetes.io/instance\\": \\"my-release\\",
                        \\"app.kubernetes.io/component\\": \\"primary\\",
                      }}
                    />
                  </PodAffinityTerm>
                </WeightedPodAffinityTerm>
              </PodAntiAffinity>
            </Affinity>
            <PodSecurityContext fsGroup={1001} />
            <Volume name=\\"dshm\\" emptyDir={{ medium: \\"Memory\\" }} />
            <Container
              name=\\"postgresql\\"
              image=\\"docker.io/bitnami/postgresql:15.3.0-debian-11-r7\\"
              imagePullPolicy=\\"IfNotPresent\\"
            >
              <EnvVar name=\\"BITNAMI_DEBUG\\" value=\\"false\\" />
              <EnvVar name=\\"POSTGRESQL_PORT_NUMBER\\" value=\\"5432\\" />
              <EnvVar name=\\"POSTGRESQL_VOLUME_DIR\\" value=\\"/bitnami/postgresql\\" />
              <EnvVar name=\\"PGDATA\\" value=\\"/bitnami/postgresql/data\\" />
              <EnvVar name=\\"POSTGRES_PASSWORD\\">
                <EnvVarSource
                  secretKeyRef={{ name: \\"test-postgresql\\", key: \\"postgres-password\\" }}
                />
              </EnvVar>
              <EnvVar name=\\"POSTGRESQL_ENABLE_LDAP\\" value=\\"no\\" />
              <EnvVar name=\\"POSTGRESQL_ENABLE_TLS\\" value=\\"no\\" />
              <EnvVar name=\\"POSTGRESQL_LOG_HOSTNAME\\" value=\\"false\\" />
              <EnvVar name=\\"POSTGRESQL_LOG_CONNECTIONS\\" value=\\"false\\" />
              <EnvVar name=\\"POSTGRESQL_LOG_DISCONNECTIONS\\" value=\\"false\\" />
              <EnvVar name=\\"POSTGRESQL_PGAUDIT_LOG_CATALOG\\" value=\\"off\\" />
              <EnvVar name=\\"POSTGRESQL_CLIENT_MIN_MESSAGES\\" value=\\"error\\" />
              <EnvVar name=\\"POSTGRESQL_SHARED_PRELOAD_LIBRARIES\\" value=\\"pgaudit\\" />
              <ContainerPort name=\\"tcp-postgresql\\" containerPort={5432} />
              <ResourceRequirements requests={{ cpu: \\"250m\\", memory: \\"256Mi\\" }} />
              <SecurityContext runAsUser={1001} />
              <VolumeMount name=\\"dshm\\" mountPath=\\"/dev/shm\\" />
              <VolumeMount name=\\"data\\" mountPath=\\"/bitnami/postgresql\\" />
              <Probe
                failureThreshold={6}
                initialDelaySeconds={30}
                periodSeconds={10}
                successThreshold={1}
                timeoutSeconds={5}
                exec={{
                  command: [
                    \\"/bin/sh\\",
                    \\"-c\\",
                    'exec pg_isready -U \\"postgres\\" -h 127.0.0.1 -p 5432',
                  ],
                }}
              />
              <Probe
                failureThreshold={6}
                initialDelaySeconds={5}
                periodSeconds={10}
                successThreshold={1}
                timeoutSeconds={5}
                exec={{
                  command: [
                    \\"/bin/sh\\",
                    \\"-c\\",
                    \\"-e\\",
                    'exec pg_isready -U \\"postgres\\" -h 127.0.0.1 -p 5432\\\\n[ -f /opt/bitnami/postgresql/tmp/.initialized ] || [ -f /bitnami/postgresql/.initialized ]\\\\n',
                  ],
                }}
              />
            </Container>
          </PodTemplateSpec>
          <StatefulSetUpdateStrategy type=\\"RollingUpdate\\" />
          <PersistentVolumeClaim
            apiVersion=\\"v1\\"
            kind=\\"PersistentVolumeClaim\\"
            meta:name=\\"data\\"
            accessModes={[\\"ReadWriteOnce\\"]}
          >
            <ResourceRequirements requests={{ storage: \\"8Gi\\" }} />
          </PersistentVolumeClaim>
        </StatefulSet>
      );

      const Release = () => (
        <>
          <TestPostgresqlSecret />
          <TestPostgresqlHlService />
          <TestPostgresqlService />
          <TestPostgresqlStatefulSet />
        </>
      );
      "
    `);
});
