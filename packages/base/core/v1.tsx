import { ILabelSelector, IObjectMeta } from "meta/v1";
import {
  Quantity,
  IntOrString,
  Time,
  MicroTime,
  useKubeProps,
  Resource,
  Item,
} from "rekube";

/**
 * PodTemplateSpec describes the data a pod should have when created from a template
 */
export interface IPodTemplateSpec {
  /**
   * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * If specified, the pod's scheduling constraints
   */
  affinity?: IAffinity;
  /**
   * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
   */
  automountServiceAccountToken?: boolean;
  /**
   * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
   */
  containers?: IContainer[];
  /**
   * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
   */
  dnsConfig?: IPodDNSConfig;
  /**
   * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
   */
  dnsPolicy?: string;
  /**
   * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
   */
  enableServiceLinks?: boolean;
  /**
   * List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.
   */
  ephemeralContainers?: IEphemeralContainer[];
  /**
   * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
   */
  hostAliases?: IHostAlias[];
  /**
   * Use the host's ipc namespace. Optional: Default to false.
   */
  hostIPC?: boolean;
  /**
   * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
   */
  hostNetwork?: boolean;
  /**
   * Use the host's pid namespace. Optional: Default to false.
   */
  hostPID?: boolean;
  /**
   * Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host. This field is alpha-level and is only honored by servers that enable the UserNamespacesSupport feature.
   */
  hostUsers?: boolean;
  /**
   * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
   */
  hostname?: string;
  /**
   * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
   */
  initContainers?: IContainer[];
  /**
   * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
   */
  nodeName?: string;
  /**
   * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
   */
  nodeSelector?: Record<string, string>;
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md
   */
  overhead?: Record<string, string>;
  /**
   * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
   */
  preemptionPolicy?: string;
  /**
   * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
   */
  priority?: number | bigint;
  /**
   * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
   */
  priorityClassName?: string;
  /**
   * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates
   */
  readinessGates?: IPodReadinessGate[];
  /**
   * ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable.
   */
  resourceClaims?: IPodResourceClaim[];
  /**
   * Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
   */
  restartPolicy?: string;
  /**
   * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class
   */
  runtimeClassName?: string;
  /**
   * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
   */
  schedulerName?: string;
  /**
   * SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.
   *
   * SchedulingGates can only be set at pod creation time, and be removed only afterwards.
   *
   * This is a beta feature enabled by the PodSchedulingReadiness feature gate.
   */
  schedulingGates?: IPodSchedulingGate[];
  /**
   * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
   */
  securityContext?: IPodSecurityContext;
  /**
   * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
   */
  serviceAccount?: string;
  /**
   * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
   */
  serviceAccountName?: string;
  /**
   * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.
   */
  setHostnameAsFQDN?: boolean;
  /**
   * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.
   */
  shareProcessNamespace?: boolean;
  /**
   * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
   */
  subdomain?: string;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * If specified, the pod's tolerations.
   */
  tolerations?: IToleration[];
  /**
   * TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.
   */
  topologySpreadConstraints?: ITopologySpreadConstraint[];
  /**
   * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
   */
  volumes?: IVolume[];
}

/**
 * Affinity is a group of affinity scheduling rules.
 */
export interface IAffinity {
  /**
   * Describes node affinity scheduling rules for the pod.
   */
  nodeAffinity?: INodeAffinity;
  /**
   * Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
   */
  podAffinity?: IPodAffinity;
  /**
   * Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
   */
  podAntiAffinity?: IPodAntiAffinity;
}

/**
 * A single application container that you want to run within a pod.
 */
export interface IContainer {
  /**
   * Arguments to the entrypoint. The container image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  args?: string[];
  /**
   * Entrypoint array. Not executed within a shell. The container image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  command?: string[];
  /**
   * List of environment variables to set in the container. Cannot be updated.
   */
  env?: IEnvVar[];
  /**
   * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.
   */
  image?: string;
  /**
   * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
   */
  imagePullPolicy?: string;
  /**
   * Actions that the management system should take in response to container lifecycle events. Cannot be updated.
   */
  lifecycle?: ILifecycle;
  /**
   * Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  livenessProbe?: IProbe;
  /**
   * Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
   */
  name: string;
  /**
   * List of ports to expose from the container. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Modifying this array with strategic merge patch may corrupt the data. For more information See https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.
   */
  ports?: IContainerPort[];
  /**
   * Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  readinessProbe?: IProbe;
  /**
   * Resources resize policy for the container.
   */
  resizePolicy?: IContainerResizePolicy[];
  /**
   * Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  resources?: IResourceRequirements;
  /**
   * SecurityContext defines the security options the container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext. More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
   */
  securityContext?: ISecurityContext;
  /**
   * StartupProbe indicates that the Pod has successfully initialized. If specified, no other probes are executed until this completes successfully. If this probe fails, the Pod will be restarted, just as if the livenessProbe failed. This can be used to provide different probe parameters at the beginning of a Pod's lifecycle, when it might take a long time to load data or warm a cache, than during steady-state operation. This cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  startupProbe?: IProbe;
  /**
   * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
   */
  stdin?: boolean;
  /**
   * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
   */
  stdinOnce?: boolean;
  /**
   * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
   */
  terminationMessagePath?: string;
  /**
   * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
   */
  terminationMessagePolicy?: string;
  /**
   * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
   */
  tty?: boolean;
  /**
   * volumeDevices is the list of block devices to be used by the container.
   */
  volumeDevices?: IVolumeDevice[];
  /**
   * Pod volumes to mount into the container's filesystem. Cannot be updated.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
   */
  workingDir?: string;
}

/**
 * PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.
 */
export interface IPodDNSConfig {
  /**
   * A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.
   */
  nameservers?: string[];
  /**
   * A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.
   */
  options?: IPodDNSConfigOption[];
  /**
   * A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.
   */
  searches?: string[];
}

/**
 * An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.
 *
 * To add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.
 */
export interface IEphemeralContainer {
  /**
   * Arguments to the entrypoint. The image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  args?: string[];
  /**
   * Entrypoint array. Not executed within a shell. The image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  command?: string[];
  /**
   * List of environment variables to set in the container. Cannot be updated.
   */
  env?: IEnvVar[];
  /**
   * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images
   */
  image?: string;
  /**
   * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
   */
  imagePullPolicy?: string;
  /**
   * Lifecycle is not allowed for ephemeral containers.
   */
  lifecycle?: ILifecycle;
  /**
   * Probes are not allowed for ephemeral containers.
   */
  livenessProbe?: IProbe;
  /**
   * Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.
   */
  name: string;
  /**
   * Ports are not allowed for ephemeral containers.
   */
  ports?: IContainerPort[];
  /**
   * Probes are not allowed for ephemeral containers.
   */
  readinessProbe?: IProbe;
  /**
   * Resources resize policy for the container.
   */
  resizePolicy?: IContainerResizePolicy[];
  /**
   * Resources are not allowed for ephemeral containers. Ephemeral containers use spare resources already allocated to the pod.
   */
  resources?: IResourceRequirements;
  /**
   * Optional: SecurityContext defines the security options the ephemeral container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
   */
  securityContext?: ISecurityContext;
  /**
   * Probes are not allowed for ephemeral containers.
   */
  startupProbe?: IProbe;
  /**
   * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
   */
  stdin?: boolean;
  /**
   * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
   */
  stdinOnce?: boolean;
  /**
   * If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container uses the namespaces configured in the Pod spec.
   *
   * The container runtime must implement support for this feature. If the runtime does not support namespace targeting then the result of setting this field is undefined.
   */
  targetContainerName?: string;
  /**
   * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
   */
  terminationMessagePath?: string;
  /**
   * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
   */
  terminationMessagePolicy?: string;
  /**
   * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
   */
  tty?: boolean;
  /**
   * volumeDevices is the list of block devices to be used by the container.
   */
  volumeDevices?: IVolumeDevice[];
  /**
   * Pod volumes to mount into the container's filesystem. Subpath mounts are not allowed for ephemeral containers. Cannot be updated.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
   */
  workingDir?: string;
}

/**
 * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.
 */
export interface IHostAlias {
  /**
   * Hostnames for the above IP address.
   */
  hostnames?: string[];
  /**
   * IP address of the host file entry.
   */
  ip?: string;
}

/**
 * LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.
 */
export interface ILocalObjectReference {
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
}

/**
 * PodReadinessGate contains the reference to a pod condition
 */
export interface IPodReadinessGate {
  /**
   * ConditionType refers to a condition in the pod's condition list with matching type.
   */
  conditionType: string;
}

/**
 * PodResourceClaim references exactly one ResourceClaim through a ClaimSource. It adds a name to it that uniquely identifies the ResourceClaim inside the Pod. Containers that need access to the ResourceClaim reference it with this name.
 */
export interface IPodResourceClaim {
  /**
   * Name uniquely identifies this resource claim inside the pod. This must be a DNS_LABEL.
   */
  name: string;
  /**
   * Source describes where to find the ResourceClaim.
   */
  source?: IClaimSource;
}

/**
 * PodSchedulingGate is associated to a Pod to guard its scheduling.
 */
export interface IPodSchedulingGate {
  /**
   * Name of the scheduling gate. Each scheduling gate must have a unique name field.
   */
  name: string;
}

/**
 * PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.
 */
export interface IPodSecurityContext {
  /**
   * A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
   *
   * 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----
   *
   * If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.
   */
  fsGroup?: number | bigint;
  /**
   * fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used. Note that this field cannot be set when spec.os.name is windows.
   */
  fsGroupChangePolicy?: string;
  /**
   * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsGroup?: number | bigint;
  /**
   * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
   */
  runAsNonRoot?: boolean;
  /**
   * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsUser?: number | bigint;
  /**
   * The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  seLinuxOptions?: ISELinuxOptions;
  /**
   * The seccomp options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.
   */
  seccompProfile?: ISeccompProfile;
  /**
   * A list of groups applied to the first process run in each container, in addition to the container's primary GID, the fsGroup (if specified), and group memberships defined in the container image for the uid of the container process. If unspecified, no additional groups are added to any container. Note that group memberships defined in the container image for the uid of the container process are still effective, even if they are not included in this list. Note that this field cannot be set when spec.os.name is windows.
   */
  supplementalGroups?: number | bigint[];
  /**
   * Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.
   */
  sysctls?: ISysctl[];
  /**
   * The Windows specific settings applied to all containers. If unspecified, the options within a container's SecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.
   */
  windowsOptions?: IWindowsSecurityContextOptions;
}

/**
 * The pod this Toleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>.
 */
export interface IToleration {
  /**
   * Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect?: string;
  /**
   * Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.
   */
  key?: string;
  /**
   * Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
   */
  operator?: string;
  /**
   * TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.
   */
  tolerationSeconds?: number | bigint;
  /**
   * Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.
   */
  value?: string;
}

/**
 * TopologySpreadConstraint specifies how to spread matching pods among the given topology.
 */
export interface ITopologySpreadConstraint {
  /**
   * LabelSelector is used to find matching pods. Pods that match this label selector are counted to determine the number of pods in their corresponding topology domain.
   */
  labelSelector?: ILabelSelector;
  /**
   * MatchLabelKeys is a set of pod label keys to select the pods over which spreading will be calculated. The keys are used to lookup values from the incoming pod labels, those key-value labels are ANDed with labelSelector to select the group of existing pods over which spreading will be calculated for the incoming pod. The same key is forbidden to exist in both MatchLabelKeys and LabelSelector. MatchLabelKeys cannot be set when LabelSelector isn't set. Keys that don't exist in the incoming pod labels will be ignored. A null or empty list means only match against labelSelector.
   *
   * This is a beta field and requires the MatchLabelKeysInPodTopologySpread feature gate to be enabled (enabled by default).
   */
  matchLabelKeys?: string[];
  /**
   * MaxSkew describes the degree to which pods may be unevenly distributed. When `whenUnsatisfiable=DoNotSchedule`, it is the maximum permitted difference between the number of matching pods in the target topology and the global minimum. The global minimum is the minimum number of matching pods in an eligible domain or zero if the number of eligible domains is less than MinDomains. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 2/2/1: In this case, the global minimum is 1. | zone1 | zone2 | zone3 | |  P P  |  P P  |   P   | - if MaxSkew is 1, incoming pod can only be scheduled to zone3 to become 2/2/2; scheduling it onto zone1(zone2) would make the ActualSkew(3-1) on zone1(zone2) violate MaxSkew(1). - if MaxSkew is 2, incoming pod can be scheduled onto any zone. When `whenUnsatisfiable=ScheduleAnyway`, it is used to give higher precedence to topologies that satisfy it. It's a required field. Default value is 1 and 0 is not allowed.
   */
  maxSkew: number | bigint;
  /**
   * MinDomains indicates a minimum number of eligible domains. When the number of eligible domains with matching topology keys is less than minDomains, Pod Topology Spread treats "global minimum" as 0, and then the calculation of Skew is performed. And when the number of eligible domains with matching topology keys equals or greater than minDomains, this value has no effect on scheduling. As a result, when the number of eligible domains is less than minDomains, scheduler won't schedule more than maxSkew Pods to those domains. If value is nil, the constraint behaves as if MinDomains is equal to 1. Valid values are integers greater than 0. When value is not nil, WhenUnsatisfiable must be DoNotSchedule.
   *
   * For example, in a 3-zone cluster, MaxSkew is set to 2, MinDomains is set to 5 and pods with the same labelSelector spread as 2/2/2: | zone1 | zone2 | zone3 | |  P P  |  P P  |  P P  | The number of domains is less than 5(MinDomains), so "global minimum" is treated as 0. In this situation, new pod with the same labelSelector cannot be scheduled, because computed skew will be 3(3 - 0) if new Pod is scheduled to any of the three zones, it will violate MaxSkew.
   *
   * This is a beta field and requires the MinDomainsInPodTopologySpread feature gate to be enabled (enabled by default).
   */
  minDomains?: number | bigint;
  /**
   * NodeAffinityPolicy indicates how we will treat Pod's nodeAffinity/nodeSelector when calculating pod topology spread skew. Options are: - Honor: only nodes matching nodeAffinity/nodeSelector are included in the calculations. - Ignore: nodeAffinity/nodeSelector are ignored. All nodes are included in the calculations.
   *
   * If this value is nil, the behavior is equivalent to the Honor policy. This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
   */
  nodeAffinityPolicy?: string;
  /**
   * NodeTaintsPolicy indicates how we will treat node taints when calculating pod topology spread skew. Options are: - Honor: nodes without taints, along with tainted nodes for which the incoming pod has a toleration, are included. - Ignore: node taints are ignored. All nodes are included.
   *
   * If this value is nil, the behavior is equivalent to the Ignore policy. This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
   */
  nodeTaintsPolicy?: string;
  /**
   * TopologyKey is the key of node labels. Nodes that have a label with this key and identical values are considered to be in the same topology. We consider each <key, value> as a "bucket", and try to put balanced number of pods into each bucket. We define a domain as a particular instance of a topology. Also, we define an eligible domain as a domain whose nodes meet the requirements of nodeAffinityPolicy and nodeTaintsPolicy. e.g. If TopologyKey is "kubernetes.io/hostname", each Node is a domain of that topology. And, if TopologyKey is "topology.kubernetes.io/zone", each zone is a domain of that topology. It's a required field.
   */
  topologyKey: string;
  /**
   * WhenUnsatisfiable indicates how to deal with a pod if it doesn't satisfy the spread constraint. - DoNotSchedule (default) tells the scheduler not to schedule it. - ScheduleAnyway tells the scheduler to schedule the pod in any location,
   * but giving higher precedence to topologies that would help reduce the
   * skew.
   * A constraint is considered "Unsatisfiable" for an incoming pod if and only if every possible node assignment for that pod would violate "MaxSkew" on some topology. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 3/1/1: | zone1 | zone2 | zone3 | | P P P |   P   |   P   | If WhenUnsatisfiable is set to DoNotSchedule, incoming pod can only be scheduled to zone2(zone3) to become 3/2/1(3/1/2) as ActualSkew(2-1) on zone2(zone3) satisfies MaxSkew(1). In other words, the cluster can still be imbalanced, but scheduler won't make it *more* imbalanced. It's a required field.
   */
  whenUnsatisfiable: string;
}

/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 */
export interface IVolume {
  /**
   * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  awsElasticBlockStore?: IAWSElasticBlockStoreVolumeSource;
  /**
   * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
   */
  azureDisk?: IAzureDiskVolumeSource;
  /**
   * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
   */
  azureFile?: IAzureFileVolumeSource;
  /**
   * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
   */
  cephfs?: ICephFSVolumeSource;
  /**
   * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  cinder?: ICinderVolumeSource;
  /**
   * configMap represents a configMap that should populate this volume
   */
  configMap?: IConfigMapVolumeSource;
  /**
   * csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature).
   */
  csi?: ICSIVolumeSource;
  /**
   * downwardAPI represents downward API about the pod that should populate this volume
   */
  downwardAPI?: IDownwardAPIVolumeSource;
  /**
   * emptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
   */
  emptyDir?: IEmptyDirVolumeSource;
  /**
   * ephemeral represents a volume that is handled by a cluster storage driver. The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts, and deleted when the pod is removed.
   *
   * Use this if: a) the volume is only needed while the pod runs, b) features of normal volumes like restoring from snapshot or capacity
   * tracking are needed,
   * c) the storage driver is specified through a storage class, and d) the storage driver supports dynamic volume provisioning through
   * a PersistentVolumeClaim (see EphemeralVolumeSource for more
   * information on the connection between this volume type
   * and PersistentVolumeClaim).
   *
   * Use PersistentVolumeClaim or one of the vendor-specific APIs for volumes that persist for longer than the lifecycle of an individual pod.
   *
   * Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to be used that way - see the documentation of the driver for more information.
   *
   * A pod can use both types of ephemeral volumes and persistent volumes at the same time.
   */
  ephemeral?: IEphemeralVolumeSource;
  /**
   * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
   */
  fc?: IFCVolumeSource;
  /**
   * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
   */
  flexVolume?: IFlexVolumeSource;
  /**
   * flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
   */
  flocker?: IFlockerVolumeSource;
  /**
   * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  gcePersistentDisk?: IGCEPersistentDiskVolumeSource;
  /**
   * gitRepo represents a git repository at a particular revision. DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
   */
  gitRepo?: IGitRepoVolumeSource;
  /**
   * glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/glusterfs/README.md
   */
  glusterfs?: IGlusterfsVolumeSource;
  /**
   * hostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  hostPath?: IHostPathVolumeSource;
  /**
   * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://examples.k8s.io/volumes/iscsi/README.md
   */
  iscsi?: IISCSIVolumeSource;
  /**
   * name of the volume. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name: string;
  /**
   * nfs represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  nfs?: INFSVolumeSource;
  /**
   * persistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
   */
  persistentVolumeClaim?: IPersistentVolumeClaimVolumeSource;
  /**
   * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
   */
  photonPersistentDisk?: IPhotonPersistentDiskVolumeSource;
  /**
   * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
   */
  portworxVolume?: IPortworxVolumeSource;
  /**
   * projected items for all in one resources secrets, configmaps, and downward API
   */
  projected?: IProjectedVolumeSource;
  /**
   * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
   */
  quobyte?: IQuobyteVolumeSource;
  /**
   * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
   */
  rbd?: IRBDVolumeSource;
  /**
   * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
   */
  scaleIO?: IScaleIOVolumeSource;
  /**
   * secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
   */
  secret?: ISecretVolumeSource;
  /**
   * storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
   */
  storageos?: IStorageOSVolumeSource;
  /**
   * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
   */
  vsphereVolume?: IVsphereVirtualDiskVolumeSource;
}

/**
 * Represents a Persistent Disk resource in AWS.
 *
 * An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.
 */
export interface IAWSElasticBlockStoreVolumeSource {
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  fsType?: string;
  /**
   * partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
   */
  partition?: number | bigint;
  /**
   * volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  volumeID: string;
}

/**
 * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export interface IAzureDiskVolumeSource {
  /**
   * cachingMode is the Host Caching mode: None, Read Only, Read Write.
   */
  cachingMode?: string;
  /**
   * diskName is the Name of the data disk in the blob storage
   */
  diskName: string;
  /**
   * diskURI is the URI of data disk in the blob storage
   */
  diskURI: string;
  /**
   * fsType is Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
}

/**
 * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export interface IAzureFileVolumeSource {
  /**
   * secretName is the  name of secret that contains Azure Storage Account Name and Key
   */
  secretName: string;
  /**
   * shareName is the azure share Name
   */
  shareName: string;
}

/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export interface ICephFSVolumeSource {
  /**
   * monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
   */
  path?: string;
  /**
   * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretFile?: string;
  /**
   * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretRef?: ILocalObjectReference;
  /**
   * user is optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  user?: string;
}

/**
 * Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.
 */
export interface ICinderVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  fsType?: string;
  /**
   * secretRef is optional: points to a secret object containing parameters used to connect to OpenStack.
   */
  secretRef?: ILocalObjectReference;
  /**
   * volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  volumeID: string;
}

/**
 * Adapts a ConfigMap into a volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.
 */
export interface IConfigMapVolumeSource {
  /**
   * defaultMode is optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional specify whether the ConfigMap or its keys must be defined
   */
  optional?: boolean;
}

/**
 * Represents a source location of a volume to mount, managed by an external CSI driver
 */
export interface ICSIVolumeSource {
  /**
   * driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.
   */
  driver: string;
  /**
   * fsType to mount. Ex. "ext4", "xfs", "ntfs". If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.
   */
  fsType?: string;
  /**
   * nodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and  may be empty if no secret is required. If the secret object contains more than one secret, all secret references are passed.
   */
  nodePublishSecretRef?: ILocalObjectReference;
  /**
   * volumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.
   */
  volumeAttributes?: Record<string, string>;
}

/**
 * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 */
export interface IDownwardAPIVolumeSource {
  /**
   * Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * Items is a list of downward API volume file
   */
  items?: IDownwardAPIVolumeFile[];
}

/**
 * Represents an empty directory for a pod. Empty directory volumes support ownership management and SELinux relabeling.
 */
export interface IEmptyDirVolumeSource {
  /**
   * medium represents what type of storage medium should back this directory. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
   */
  medium?: string;
  /**
   * sizeLimit is the total amount of local storage required for this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers in a pod. The default is nil which means that the limit is undefined. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
   */
  sizeLimit?: Quantity;
}

/**
 * Represents an ephemeral volume that is handled by a normal storage driver.
 */
export interface IEphemeralVolumeSource {}

/**
 * Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.
 */
export interface IFCVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * lun is Optional: FC target lun number
   */
  lun?: number | bigint;
  /**
   * targetWWNs is Optional: FC target worldwide names (WWNs)
   */
  targetWWNs?: string[];
  /**
   * wwids Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.
   */
  wwids?: string[];
}

/**
 * FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
 */
export interface IFlexVolumeSource {
  /**
   * driver is the name of the driver to use for this volume.
   */
  driver: string;
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
   */
  fsType?: string;
  /**
   * options is Optional: this field holds extra command options if any.
   */
  options?: Record<string, string>;
  /**
   * secretRef is Optional: secretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
   */
  secretRef?: ILocalObjectReference;
}

/**
 * Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.
 */
export interface IFlockerVolumeSource {
  /**
   * datasetName is Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated
   */
  datasetName?: string;
  /**
   * datasetUUID is the UUID of the dataset. This is unique identifier of a Flocker dataset
   */
  datasetUUID?: string;
}

/**
 * Represents a Persistent Disk resource in Google Compute Engine.
 *
 * A GCE PD must exist before mounting to a container. The disk must also be in the same GCE project and zone as the kubelet. A GCE PD can only be mounted as read/write once or read-only many times. GCE PDs support ownership management and SELinux relabeling.
 */
export interface IGCEPersistentDiskVolumeSource {
  /**
   * fsType is filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  fsType?: string;
  /**
   * partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  partition?: number | bigint;
  /**
   * pdName is unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  pdName: string;
}

/**
 * Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.
 *
 * DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
 */
export interface IGitRepoVolumeSource {
  /**
   * directory is the target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
   */
  directory?: string;
  /**
   * repository is the URL
   */
  repository: string;
  /**
   * revision is the commit hash for the specified revision.
   */
  revision?: string;
}

/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export interface IGlusterfsVolumeSource {
  /**
   * endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
   */
  endpoints: string;
  /**
   * path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
   */
  path: string;
}

/**
 * Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.
 */
export interface IHostPathVolumeSource {
  /**
   * path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  path: string;
  /**
   * type for HostPath Volume Defaults to "" More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  type?: string;
}

/**
 * Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.
 */
export interface IISCSIVolumeSource {
  /**
   * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
   */
  chapAuthDiscovery?: boolean;
  /**
   * chapAuthSession defines whether support iSCSI Session CHAP authentication
   */
  chapAuthSession?: boolean;
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
   */
  fsType?: string;
  /**
   * initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
   */
  initiatorName?: string;
  /**
   * iqn is the target iSCSI Qualified Name.
   */
  iqn: string;
  /**
   * iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
   */
  iscsiInterface?: string;
  /**
   * lun represents iSCSI Target Lun number.
   */
  lun: number | bigint;
  /**
   * portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  portals?: string[];
  /**
   * secretRef is the CHAP Secret for iSCSI target and initiator authentication
   */
  secretRef?: ILocalObjectReference;
  /**
   * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  targetPortal: string;
}

/**
 * Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.
 */
export interface INFSVolumeSource {
  /**
   * path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  path: string;
  /**
   * server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  server: string;
}

/**
 * PersistentVolumeClaimVolumeSource references the user's PVC in the same namespace. This volume finds the bound PV and mounts that volume for the pod. A PersistentVolumeClaimVolumeSource is, essentially, a wrapper around another type of volume that is owned by someone else (the system).
 */
export interface IPersistentVolumeClaimVolumeSource {
  /**
   * claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
   */
  claimName: string;
}

/**
 * Represents a Photon Controller persistent disk resource.
 */
export interface IPhotonPersistentDiskVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * pdID is the ID that identifies Photon Controller persistent disk
   */
  pdID: string;
}

/**
 * PortworxVolumeSource represents a Portworx volume resource.
 */
export interface IPortworxVolumeSource {
  /**
   * fSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * volumeID uniquely identifies a Portworx volume
   */
  volumeID: string;
}

/**
 * Represents a projected volume source
 */
export interface IProjectedVolumeSource {
  /**
   * defaultMode are the mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * sources is the list of volume projections
   */
  sources?: IVolumeProjection[];
}

/**
 * Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.
 */
export interface IQuobyteVolumeSource {
  /**
   * group to map volume access to Default is no group
   */
  group?: string;
  /**
   * registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes
   */
  registry: string;
  /**
   * tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin
   */
  tenant?: string;
  /**
   * user to map volume access to Defaults to serivceaccount user
   */
  user?: string;
  /**
   * volume is a string that references an already created Quobyte volume by name.
   */
  volume: string;
}

/**
 * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.
 */
export interface IRBDVolumeSource {
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
   */
  fsType?: string;
  /**
   * image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  image: string;
  /**
   * keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  keyring?: string;
  /**
   * monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  pool?: string;
  /**
   * secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  secretRef?: ILocalObjectReference;
  /**
   * user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  user?: string;
}

/**
 * ScaleIOVolumeSource represents a persistent ScaleIO volume
 */
export interface IScaleIOVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs".
   */
  fsType?: string;
  /**
   * gateway is the host address of the ScaleIO API Gateway.
   */
  gateway: string;
  /**
   * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
   */
  protectionDomain?: string;
  /**
   * secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
   */
  secretRef: ILocalObjectReference;
  /**
   * sslEnabled Flag enable/disable SSL communication with Gateway, default false
   */
  sslEnabled?: boolean;
  /**
   * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
   */
  storageMode?: string;
  /**
   * storagePool is the ScaleIO Storage Pool associated with the protection domain.
   */
  storagePool?: string;
  /**
   * system is the name of the storage system as configured in ScaleIO.
   */
  system: string;
  /**
   * volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.
   */
  volumeName?: string;
}

/**
 * Adapts a Secret into a volume.
 *
 * The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.
 */
export interface ISecretVolumeSource {
  /**
   * defaultMode is Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * items If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * optional field specify whether the Secret or its keys must be defined
   */
  optional?: boolean;
  /**
   * secretName is the name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
   */
  secretName?: string;
}

/**
 * Represents a StorageOS persistent volume resource.
 */
export interface IStorageOSVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.
   */
  secretRef?: ILocalObjectReference;
  /**
   * volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.
   */
  volumeName?: string;
  /**
   * volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.
   */
  volumeNamespace?: string;
}

/**
 * Represents a vSphere volume resource.
 */
export interface IVsphereVirtualDiskVolumeSource {
  /**
   * fsType is filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.
   */
  storagePolicyID?: string;
  /**
   * storagePolicyName is the storage Policy Based Management (SPBM) profile name.
   */
  storagePolicyName?: string;
  /**
   * volumePath is the path that identifies vSphere volume vmdk
   */
  volumePath: string;
}

/**
 * Maps a string key to a path within a volume.
 */
export interface IKeyToPath {
  /**
   * key is the key to project.
   */
  key: string;
  /**
   * mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
   */
  path: string;
}

/**
 * Projection that may be projected along with other supported volume types
 */
export interface IVolumeProjection {
  /**
   * configMap information about the configMap data to project
   */
  configMap?: IConfigMapProjection;
  /**
   * downwardAPI information about the downwardAPI data to project
   */
  downwardAPI?: IDownwardAPIProjection;
  /**
   * secret information about the secret data to project
   */
  secret?: ISecretProjection;
  /**
   * serviceAccountToken is information about the serviceAccountToken data to project
   */
  serviceAccountToken?: IServiceAccountTokenProjection;
}

/**
 * Adapts a ConfigMap into a projected volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.
 */
export interface IConfigMapProjection {
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional specify whether the ConfigMap or its keys must be defined
   */
  optional?: boolean;
}

/**
 * Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode.
 */
export interface IDownwardAPIProjection {
  /**
   * Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
   */
  path: string;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
}

/**
 * Adapts a secret into a projected volume.
 *
 * The contents of the target Secret's Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret volume source without the default mode.
 */
export interface ISecretProjection {
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional field specify whether the Secret or its key must be defined
   */
  optional?: boolean;
}

/**
 * ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).
 */
export interface IServiceAccountTokenProjection {
  /**
   * audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.
   */
  audience?: string;
  /**
   * expirationSeconds is the requested duration of validity of the service account token. As the token approaches expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.
   */
  expirationSeconds?: number | bigint;
  /**
   * path is the path relative to the mount point of the file to project the token into.
   */
  path: string;
}

/**
 * ObjectFieldSelector selects an APIVersioned field of an object.
 */
export interface IObjectFieldSelector {
  /**
   * Path of the field to select in the specified API version.
   */
  fieldPath: string;
}

/**
 * ResourceFieldSelector represents container resources (cpu, memory) and their output format
 */
export interface IResourceFieldSelector {
  /**
   * Container name: required for volumes, optional for env vars
   */
  containerName?: string;
  /**
   * Specifies the output format of the exposed resources, defaults to "1"
   */
  divisor?: Quantity;
  /**
   * Required: resource to select
   */
  resource: string;
}

/**
 * DownwardAPIVolumeFile represents information to create the file containing the pod field
 */
export interface IDownwardAPIVolumeFile {
  /**
   * Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
   */
  path: string;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
}

/**
 * SELinuxOptions are the labels to be applied to the container
 */
export interface ISELinuxOptions {
  /**
   * Level is SELinux level label that applies to the container.
   */
  level?: string;
  /**
   * Role is a SELinux role label that applies to the container.
   */
  role?: string;
  /**
   * Type is a SELinux type label that applies to the container.
   */
  type?: string;
  /**
   * User is a SELinux user label that applies to the container.
   */
  user?: string;
}

/**
 * SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.
 */
export interface ISeccompProfile {
  /**
   * localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet's configured seccomp profile location. Must only be set if type is "Localhost".
   */
  localhostProfile?: string;
  /**
   * type indicates which kind of seccomp profile will be applied. Valid options are:
   *
   * Localhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.
   */
  type: string;
}

/**
 * Sysctl defines a kernel parameter to be set
 */
export interface ISysctl {
  /**
   * Name of a property to set
   */
  name: string;
  /**
   * Value of a property to set
   */
  value: string;
}

/**
 * WindowsSecurityContextOptions contain Windows-specific options and credentials.
 */
export interface IWindowsSecurityContextOptions {
  /**
   * GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.
   */
  gmsaCredentialSpec?: string;
  /**
   * GMSACredentialSpecName is the name of the GMSA credential spec to use.
   */
  gmsaCredentialSpecName?: string;
  /**
   * HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.
   */
  hostProcess?: boolean;
  /**
   * The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
   */
  runAsUserName?: string;
}

/**
 * ClaimSource describes a reference to a ResourceClaim.
 *
 * Exactly one of these fields should be set.  Consumers of this type must treat an empty object as if it has an unknown value.
 */
export interface IClaimSource {
  /**
   * ResourceClaimName is the name of a ResourceClaim object in the same namespace as this pod.
   */
  resourceClaimName?: string;
  /**
   * ResourceClaimTemplateName is the name of a ResourceClaimTemplate object in the same namespace as this pod.
   *
   * The template will be used to create a new ResourceClaim, which will be bound to this pod. When this pod is deleted, the ResourceClaim will also be deleted. The name of the ResourceClaim will be <pod name>-<resource name>, where <resource name> is the PodResourceClaim.Name. Pod validation will reject the pod if the concatenated name is not valid for a ResourceClaim (e.g. too long).
   *
   * An existing ResourceClaim with that name that is not owned by the pod will not be used for the pod to avoid using an unrelated resource by mistake. Scheduling and pod startup are then blocked until the unrelated ResourceClaim is removed.
   *
   * This field is immutable and no changes will be made to the corresponding ResourceClaim by the control plane after creating the ResourceClaim.
   */
  resourceClaimTemplateName?: string;
}

/**
 * EnvVar represents an environment variable present in a Container.
 */
export interface IEnvVar {
  /**
   * Name of the environment variable. Must be a C_IDENTIFIER.
   */
  name: string;
  /**
   * Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".
   */
  value?: string;
  /**
   * Source for the environment variable's value. Cannot be used if value is not empty.
   */
  valueFrom?: IEnvVarSource;
}

/**
 * EnvFromSource represents the source of a set of ConfigMaps
 */
export interface IEnvFromSource {
  /**
   * The ConfigMap to select from
   */
  configMapRef?: IConfigMapEnvSource;
  /**
   * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
   */
  prefix?: string;
  /**
   * The Secret to select from
   */
  secretRef?: ISecretEnvSource;
}

/**
 * Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.
 */
export interface ILifecycle {
  /**
   * PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
   */
  postStart?: ILifecycleHandler;
  /**
   * PreStop is called immediately before a container is terminated due to an API request or management event such as liveness/startup probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits. The Pod's termination grace period countdown begins before the PreStop hook is executed. Regardless of the outcome of the handler, the container will eventually terminate within the Pod's termination grace period (unless delayed by finalizers). Other management of the container blocks until the hook completes or until the termination grace period is reached. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
   */
  preStop?: ILifecycleHandler;
}

/**
 * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 */
export interface IProbe {
  /**
   * Exec specifies the action to take.
   */
  exec?: IExecAction;
  /**
   * Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
   */
  failureThreshold?: number | bigint;
  /**
   * GRPC specifies an action involving a GRPC port.
   */
  grpc?: IGRPCAction;
  /**
   * HTTPGet specifies the http request to perform.
   */
  httpGet?: IHTTPGetAction;
  /**
   * Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  initialDelaySeconds?: number | bigint;
  /**
   * How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
   */
  periodSeconds?: number | bigint;
  /**
   * Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
   */
  successThreshold?: number | bigint;
  /**
   * TCPSocket specifies an action involving a TCP port.
   */
  tcpSocket?: ITCPSocketAction;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  timeoutSeconds?: number | bigint;
}

/**
 * ContainerPort represents a network port in a single container.
 */
export interface IContainerPort {
  /**
   * Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
   */
  containerPort: number | bigint;
  /**
   * What host IP to bind the external port to.
   */
  hostIP?: string;
  /**
   * Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.
   */
  hostPort?: number | bigint;
  /**
   * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.
   */
  name?: string;
  /**
   * Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
   */
  protocol?: string;
}

/**
 * ContainerResizePolicy represents resource resize policy for the container.
 */
export interface IContainerResizePolicy {
  /**
   * Name of the resource to which this resource resize policy applies. Supported values: cpu, memory.
   */
  resourceName: string;
  /**
   * Restart policy to apply when specified resource is resized. If not specified, it defaults to NotRequired.
   */
  restartPolicy: string;
}

/**
 * ResourceRequirements describes the compute resource requirements.
 */
export interface IResourceRequirements {
  /**
   * Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable. It can only be set for containers.
   */
  claims?: IResourceClaim[];
  /**
   * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  limits?: Record<string, string>;
  /**
   * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  requests?: Record<string, string>;
}

/**
 * SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.
 */
export interface ISecurityContext {
  /**
   * AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime. Note that this field cannot be set when spec.os.name is windows.
   */
  capabilities?: ICapabilities;
  /**
   * Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.
   */
  privileged?: boolean;
  /**
   * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsGroup?: number | bigint;
  /**
   * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
   */
  runAsNonRoot?: boolean;
  /**
   * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsUser?: number | bigint;
  /**
   * The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  seLinuxOptions?: ISELinuxOptions;
  /**
   * The seccomp options to use by this container. If seccomp options are provided at both the pod & container level, the container options override the pod options. Note that this field cannot be set when spec.os.name is windows.
   */
  seccompProfile?: ISeccompProfile;
  /**
   * The Windows specific settings applied to all containers. If unspecified, the options from the PodSecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.
   */
  windowsOptions?: IWindowsSecurityContextOptions;
}

/**
 * volumeDevice describes a mapping of a raw block device within a container.
 */
export interface IVolumeDevice {
  /**
   * devicePath is the path inside of the container that the device will be mapped to.
   */
  devicePath: string;
  /**
   * name must match the name of a persistentVolumeClaim in the pod
   */
  name: string;
}

/**
 * VolumeMount describes a mounting of a Volume within a container.
 */
export interface IVolumeMount {
  /**
   * Path within the container at which the volume should be mounted.  Must not contain ':'.
   */
  mountPath: string;
  /**
   * mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.
   */
  mountPropagation?: string;
  /**
   * This must match the Name of a Volume.
   */
  name: string;
  /**
   * Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
   */
  subPath?: string;
  /**
   * Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to "" (volume's root). SubPathExpr and SubPath are mutually exclusive.
   */
  subPathExpr?: string;
}

/**
 * Adds and removes POSIX capabilities from running containers.
 */
export interface ICapabilities {
  /**
   * Added capabilities
   */
  add?: string[];
  /**
   * Removed capabilities
   */
  drop?: string[];
}

/**
 * ResourceClaim references one entry in PodSpec.ResourceClaims.
 */
export interface IResourceClaim {
  /**
   * Name must match the name of one entry in pod.spec.resourceClaims of the Pod where this field is used. It makes that resource available inside a container.
   */
  name: string;
}

/**
 * ExecAction describes a "run in container" action.
 */
export interface IExecAction {
  /**
   * Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
   */
  command?: string[];
}

export interface IGRPCAction {
  /**
   * Port number of the gRPC service. Number must be in the range 1 to 65535.
   */
  port: number | bigint;
  /**
   * Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
   *
   * If this is not specified, the default behavior is defined by gRPC.
   */
  service?: string;
}

/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 */
export interface IHTTPGetAction {
  /**
   * Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
   */
  host?: string;
  /**
   * Custom headers to set in the request. HTTP allows repeated headers.
   */
  httpHeaders?: IHTTPHeader[];
  /**
   * Path to access on the HTTP server.
   */
  path?: string;
  /**
   * Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
   */
  port: IntOrString;
  /**
   * Scheme to use for connecting to the host. Defaults to HTTP.
   */
  scheme?: string;
}

/**
 * TCPSocketAction describes an action based on opening a socket
 */
export interface ITCPSocketAction {
  /**
   * Optional: Host name to connect to, defaults to the pod IP.
   */
  host?: string;
  /**
   * Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
   */
  port: IntOrString;
}

/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 */
export interface IHTTPHeader {
  /**
   * The header field name
   */
  name: string;
  /**
   * The header field value
   */
  value: string;
}

/**
 * LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.
 */
export interface ILifecycleHandler {
  /**
   * Exec specifies the action to take.
   */
  exec?: IExecAction;
  /**
   * HTTPGet specifies the http request to perform.
   */
  httpGet?: IHTTPGetAction;
  /**
   * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept for the backward compatibility. There are no validation of this field and lifecycle hooks will fail in runtime when tcp handler is specified.
   */
  tcpSocket?: ITCPSocketAction;
}

/**
 * ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.
 *
 * The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.
 */
export interface IConfigMapEnvSource {
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Specify whether the ConfigMap must be defined
   */
  optional?: boolean;
}

/**
 * SecretEnvSource selects a Secret to populate the environment variables with.
 *
 * The contents of the target Secret's Data field will represent the key-value pairs as environment variables.
 */
export interface ISecretEnvSource {
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Specify whether the Secret must be defined
   */
  optional?: boolean;
}

/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export interface IEnvVarSource {
  /**
   * Selects a key of a ConfigMap.
   */
  configMapKeyRef?: IConfigMapKeySelector;
  /**
   * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
  /**
   * Selects a key of a secret in the pod's namespace
   */
  secretKeyRef?: ISecretKeySelector;
}

/**
 * Selects a key from a ConfigMap.
 */
export interface IConfigMapKeySelector {
  /**
   * The key to select.
   */
  key: string;
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Specify whether the ConfigMap or its key must be defined
   */
  optional?: boolean;
}

/**
 * SecretKeySelector selects a key of a Secret.
 */
export interface ISecretKeySelector {
  /**
   * The key of the secret to select from.  Must be a valid secret key.
   */
  key: string;
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Specify whether the Secret or its key must be defined
   */
  optional?: boolean;
}

/**
 * PodDNSConfigOption defines DNS resolver options of a pod.
 */
export interface IPodDNSConfigOption {
  /**
   * Required.
   */
  name?: string;
  value?: string;
}

/**
 * Node affinity is a group of node affinity scheduling rules.
 */
export interface INodeAffinity {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IPreferredSchedulingTerm[];
  /**
   * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: INodeSelector;
}

/**
 * Pod affinity is a group of inter pod affinity scheduling rules.
 */
export interface IPodAffinity {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IWeightedPodAffinityTerm[];
  /**
   * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinityTerm[];
}

/**
 * Pod anti affinity is a group of inter pod anti affinity scheduling rules.
 */
export interface IPodAntiAffinity {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IWeightedPodAffinityTerm[];
  /**
   * If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinityTerm[];
}

/**
 * The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)
 */
export interface IWeightedPodAffinityTerm {
  /**
   * Required. A pod affinity term, associated with the corresponding weight.
   */
  podAffinityTerm?: IPodAffinityTerm;
  /**
   * weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
   */
  weight: number | bigint;
}

/**
 * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 */
export interface IPodAffinityTerm {
  /**
   * A label query over a set of resources, in this case pods.
   */
  labelSelector?: ILabelSelector;
  /**
   * A label query over the set of namespaces that the term applies to. The term is applied to the union of the namespaces selected by this field and the ones listed in the namespaces field. null selector and null or empty namespaces list means "this pod's namespace". An empty selector ({}) matches all namespaces.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod's namespace".
   */
  namespaces?: string[];
  /**
   * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.
   */
  topologyKey: string;
}

/**
 * An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).
 */
export interface IPreferredSchedulingTerm {
  /**
   * A node selector term, associated with the corresponding weight.
   */
  preference?: INodeSelectorTerm;
  /**
   * Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
   */
  weight: number | bigint;
}

/**
 * A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.
 */
export interface INodeSelector {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
}

/**
 * A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export interface INodeSelectorRequirement {
  /**
   * The label key that the selector applies to.
   */
  key: string;
  /**
   * Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
   */
  operator: string;
  /**
   * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
   */
  values?: string[];
}

/**
 * A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.
 */
export interface INodeSelectorTerm {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
}

/**
 * ObjectReference contains enough information to let you inspect or modify the referred object.
 */
export interface IObjectReference {
  /**
   * If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.
   */
  fieldPath?: string;
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
   */
  namespace?: string;
  /**
   * Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   */
  resourceVersion?: string;
  /**
   * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
   */
  uid?: string;
}

/**
 * TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.
 */
export interface ITypedLocalObjectReference {
  /**
   * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
   */
  apiGroup?: string;
  /**
   * Name is the name of resource being referenced
   */
  name: string;
}

/**
 * PersistentVolumeSpec is the specification of a persistent volume.
 */
export interface IPersistentVolumeSpec {
  /**
   * accessModes contains all ways the volume can be mounted. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
   */
  accessModes?: string[];
  /**
   * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  awsElasticBlockStore?: IAWSElasticBlockStoreVolumeSource;
  /**
   * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
   */
  azureDisk?: IAzureDiskVolumeSource;
  /**
   * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
   */
  azureFile?: IAzureFilePersistentVolumeSource;
  /**
   * capacity is the description of the persistent volume's resources and capacity. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
   */
  capacity?: Record<string, string>;
  /**
   * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
   */
  cephfs?: ICephFSPersistentVolumeSource;
  /**
   * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  cinder?: ICinderPersistentVolumeSource;
  /**
   * claimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim. Expected to be non-nil when bound. claim.VolumeName is the authoritative bind between PV and PVC. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
   */
  claimRef?: IObjectReference;
  /**
   * csi represents storage that is handled by an external CSI driver (Beta feature).
   */
  csi?: ICSIPersistentVolumeSource;
  /**
   * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
   */
  fc?: IFCVolumeSource;
  /**
   * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
   */
  flexVolume?: IFlexPersistentVolumeSource;
  /**
   * flocker represents a Flocker volume attached to a kubelet's host machine and exposed to the pod for its usage. This depends on the Flocker control service being running
   */
  flocker?: IFlockerVolumeSource;
  /**
   * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  gcePersistentDisk?: IGCEPersistentDiskVolumeSource;
  /**
   * glusterfs represents a Glusterfs volume that is attached to a host and exposed to the pod. Provisioned by an admin. More info: https://examples.k8s.io/volumes/glusterfs/README.md
   */
  glusterfs?: IGlusterfsPersistentVolumeSource;
  /**
   * hostPath represents a directory on the host. Provisioned by a developer or tester. This is useful for single-node development and testing only! On-host storage is not supported in any way and WILL NOT WORK in a multi-node cluster. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  hostPath?: IHostPathVolumeSource;
  /**
   * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin.
   */
  iscsi?: IISCSIPersistentVolumeSource;
  /**
   * local represents directly-attached storage with node affinity
   */
  local?: ILocalVolumeSource;
  /**
   * mountOptions is the list of mount options, e.g. ["ro", "soft"]. Not validated - mount will simply fail if one is invalid. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options
   */
  mountOptions?: string[];
  /**
   * nfs represents an NFS mount on the host. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  nfs?: INFSVolumeSource;
  /**
   * nodeAffinity defines constraints that limit what nodes this volume can be accessed from. This field influences the scheduling of pods that use this volume.
   */
  nodeAffinity?: IVolumeNodeAffinity;
  /**
   * persistentVolumeReclaimPolicy defines what happens to a persistent volume when released from its claim. Valid options are Retain (default for manually created PersistentVolumes), Delete (default for dynamically provisioned PersistentVolumes), and Recycle (deprecated). Recycle must be supported by the volume plugin underlying this PersistentVolume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
   */
  persistentVolumeReclaimPolicy?: string;
  /**
   * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
   */
  photonPersistentDisk?: IPhotonPersistentDiskVolumeSource;
  /**
   * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
   */
  portworxVolume?: IPortworxVolumeSource;
  /**
   * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
   */
  quobyte?: IQuobyteVolumeSource;
  /**
   * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
   */
  rbd?: IRBDPersistentVolumeSource;
  /**
   * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
   */
  scaleIO?: IScaleIOPersistentVolumeSource;
  /**
   * storageClassName is the name of StorageClass to which this persistent volume belongs. Empty value means that this volume does not belong to any StorageClass.
   */
  storageClassName?: string;
  /**
   * storageOS represents a StorageOS volume that is attached to the kubelet's host machine and mounted into the pod More info: https://examples.k8s.io/volumes/storageos/README.md
   */
  storageos?: IStorageOSPersistentVolumeSource;
  /**
   * volumeMode defines if a volume is intended to be used with a formatted filesystem or to remain in raw block state. Value of Filesystem is implied when not included in spec.
   */
  volumeMode?: string;
  /**
   * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
   */
  vsphereVolume?: IVsphereVirtualDiskVolumeSource;
}

/**
 * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export interface IAzureFilePersistentVolumeSource {
  /**
   * secretName is the name of secret that contains Azure Storage Account Name and Key
   */
  secretName: string;
  /**
   * secretNamespace is the namespace of the secret that contains Azure Storage Account Name and Key default is the same as the Pod
   */
  secretNamespace?: string;
  /**
   * shareName is the azure Share Name
   */
  shareName: string;
}

/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export interface ICephFSPersistentVolumeSource {
  /**
   * monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
   */
  path?: string;
  /**
   * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretFile?: string;
  /**
   * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretRef?: ISecretReference;
  /**
   * user is Optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  user?: string;
}

/**
 * Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.
 */
export interface ICinderPersistentVolumeSource {
  /**
   * fsType Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  fsType?: string;
  /**
   * secretRef is Optional: points to a secret object containing parameters used to connect to OpenStack.
   */
  secretRef?: ISecretReference;
  /**
   * volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  volumeID: string;
}

/**
 * Represents storage that is managed by an external CSI volume driver (Beta feature)
 */
export interface ICSIPersistentVolumeSource {
  /**
   * controllerExpandSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI ControllerExpandVolume call. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  controllerExpandSecretRef?: ISecretReference;
  /**
   * controllerPublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI ControllerPublishVolume and ControllerUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  controllerPublishSecretRef?: ISecretReference;
  /**
   * driver is the name of the driver to use for this volume. Required.
   */
  driver: string;
  /**
   * fsType to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs".
   */
  fsType?: string;
  /**
   * nodeExpandSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodeExpandVolume call. This is a beta field which is enabled default by CSINodeExpandSecret feature gate. This field is optional, may be omitted if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodeExpandSecretRef?: ISecretReference;
  /**
   * nodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodePublishSecretRef?: ISecretReference;
  /**
   * nodeStageSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodeStageVolume and NodeStageVolume and NodeUnstageVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodeStageSecretRef?: ISecretReference;
  /**
   * volumeAttributes of the volume to publish.
   */
  volumeAttributes?: Record<string, string>;
  /**
   * volumeHandle is the unique volume name returned by the CSI volume plugin’s CreateVolume to refer to the volume on all subsequent calls. Required.
   */
  volumeHandle: string;
}

/**
 * FlexPersistentVolumeSource represents a generic persistent volume resource that is provisioned/attached using an exec based plugin.
 */
export interface IFlexPersistentVolumeSource {
  /**
   * driver is the name of the driver to use for this volume.
   */
  driver: string;
  /**
   * fsType is the Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
   */
  fsType?: string;
  /**
   * options is Optional: this field holds extra command options if any.
   */
  options?: Record<string, string>;
  /**
   * secretRef is Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
   */
  secretRef?: ISecretReference;
}

/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export interface IGlusterfsPersistentVolumeSource {
  /**
   * endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
   */
  endpoints: string;
  /**
   * endpointsNamespace is the namespace that contains Glusterfs endpoint. If this field is empty, the EndpointNamespace defaults to the same namespace as the bound PVC. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
   */
  endpointsNamespace?: string;
  /**
   * path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
   */
  path: string;
}

/**
 * ISCSIPersistentVolumeSource represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.
 */
export interface IISCSIPersistentVolumeSource {
  /**
   * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
   */
  chapAuthDiscovery?: boolean;
  /**
   * chapAuthSession defines whether support iSCSI Session CHAP authentication
   */
  chapAuthSession?: boolean;
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
   */
  fsType?: string;
  /**
   * initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
   */
  initiatorName?: string;
  /**
   * iqn is Target iSCSI Qualified Name.
   */
  iqn: string;
  /**
   * iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
   */
  iscsiInterface?: string;
  /**
   * lun is iSCSI Target Lun number.
   */
  lun: number | bigint;
  /**
   * portals is the iSCSI Target Portal List. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  portals?: string[];
  /**
   * secretRef is the CHAP Secret for iSCSI target and initiator authentication
   */
  secretRef?: ISecretReference;
  /**
   * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  targetPortal: string;
}

/**
 * Local represents directly-attached storage with node affinity (Beta feature)
 */
export interface ILocalVolumeSource {
  /**
   * fsType is the filesystem type to mount. It applies only when the Path is a block device. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default value is to auto-select a filesystem if unspecified.
   */
  fsType?: string;
  /**
   * path of the full path to the volume on the node. It can be either a directory or block device (disk, partition, ...).
   */
  path: string;
}

/**
 * VolumeNodeAffinity defines constraints that limit what nodes this volume can be accessed from.
 */
export interface IVolumeNodeAffinity {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
}

/**
 * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.
 */
export interface IRBDPersistentVolumeSource {
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
   */
  fsType?: string;
  /**
   * image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  image: string;
  /**
   * keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  keyring?: string;
  /**
   * monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  pool?: string;
  /**
   * secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  secretRef?: ISecretReference;
  /**
   * user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  user?: string;
}

/**
 * ScaleIOPersistentVolumeSource represents a persistent ScaleIO volume
 */
export interface IScaleIOPersistentVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs"
   */
  fsType?: string;
  /**
   * gateway is the host address of the ScaleIO API Gateway.
   */
  gateway: string;
  /**
   * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
   */
  protectionDomain?: string;
  /**
   * secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
   */
  secretRef: ISecretReference;
  /**
   * sslEnabled is the flag to enable/disable SSL communication with Gateway, default false
   */
  sslEnabled?: boolean;
  /**
   * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
   */
  storageMode?: string;
  /**
   * storagePool is the ScaleIO Storage Pool associated with the protection domain.
   */
  storagePool?: string;
  /**
   * system is the name of the storage system as configured in ScaleIO.
   */
  system: string;
  /**
   * volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.
   */
  volumeName?: string;
}

/**
 * Represents a StorageOS persistent volume resource.
 */
export interface IStorageOSPersistentVolumeSource {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.
   */
  secretRef?: IObjectReference;
  /**
   * volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.
   */
  volumeName?: string;
  /**
   * volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.
   */
  volumeNamespace?: string;
}

/**
 * SecretReference represents a Secret Reference. It has enough information to retrieve secret in any namespace
 */
export interface ISecretReference {
  /**
   * name is unique within a namespace to reference a secret resource.
   */
  name?: string;
  /**
   * namespace defines the space within which the secret name must be unique.
   */
  namespace?: string;
}

/**
 * EventSource contains information for an event.
 */
export interface IEventSource {
  /**
   * Component from which the event is generated.
   */
  component?: string;
  /**
   * Node name on which the event is generated.
   */
  host?: string;
}

/**
 * A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future.
 */
export interface ITopologySelectorTerm {
  /**
   * The label key that the selector applies to.
   */
  key: string;
  /**
   * An array of string values. One value must match the label to be selected. Each entry in Values is ORed.
   */
  values: string[];
}

/**
 * ServicePort contains information on service's port.
 */
export interface IServicePort {
  /**
   * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
   */
  name?: string;
  /**
   * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
   */
  nodePort?: number | bigint;
  /**
   * The port that will be exposed by this service.
   */
  port: number | bigint;
  /**
   * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
   */
  protocol?: string;
  /**
   * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
   */
  targetPort?: IntOrString;
}

/**
 * SessionAffinityConfig represents the configurations of session affinity.
 */
export interface ISessionAffinityConfig {
  /**
   * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
   */
  timeoutSeconds?: number | bigint;
}

/**
 * A scope selector represents the AND of the selectors represented by the scoped-resource selector requirements.
 */
export interface IScopeSelector {
  /**
   * Represents a scope's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist.
   */
  operator: string;
  /**
   * The name of the scope that the selector applies to.
   */
  scopeName: string;
  /**
   * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   */
  values?: string[];
}

/**
 * PodSpec is a description of a pod.
 */
export interface IPodSpec {
  /**
   * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * If specified, the pod's scheduling constraints
   */
  affinity?: IAffinity;
  /**
   * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
   */
  automountServiceAccountToken?: boolean;
  /**
   * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
   */
  containers?: IContainer[];
  /**
   * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
   */
  dnsConfig?: IPodDNSConfig;
  /**
   * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
   */
  dnsPolicy?: string;
  /**
   * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
   */
  enableServiceLinks?: boolean;
  /**
   * List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.
   */
  ephemeralContainers?: IEphemeralContainer[];
  /**
   * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
   */
  hostAliases?: IHostAlias[];
  /**
   * Use the host's ipc namespace. Optional: Default to false.
   */
  hostIPC?: boolean;
  /**
   * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
   */
  hostNetwork?: boolean;
  /**
   * Use the host's pid namespace. Optional: Default to false.
   */
  hostPID?: boolean;
  /**
   * Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host. This field is alpha-level and is only honored by servers that enable the UserNamespacesSupport feature.
   */
  hostUsers?: boolean;
  /**
   * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
   */
  hostname?: string;
  /**
   * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
   */
  initContainers?: IContainer[];
  /**
   * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
   */
  nodeName?: string;
  /**
   * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
   */
  nodeSelector?: Record<string, string>;
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md
   */
  overhead?: Record<string, string>;
  /**
   * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
   */
  preemptionPolicy?: string;
  /**
   * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
   */
  priority?: number | bigint;
  /**
   * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
   */
  priorityClassName?: string;
  /**
   * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates
   */
  readinessGates?: IPodReadinessGate[];
  /**
   * ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable.
   */
  resourceClaims?: IPodResourceClaim[];
  /**
   * Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
   */
  restartPolicy?: string;
  /**
   * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class
   */
  runtimeClassName?: string;
  /**
   * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
   */
  schedulerName?: string;
  /**
   * SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.
   *
   * SchedulingGates can only be set at pod creation time, and be removed only afterwards.
   *
   * This is a beta feature enabled by the PodSchedulingReadiness feature gate.
   */
  schedulingGates?: IPodSchedulingGate[];
  /**
   * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
   */
  securityContext?: IPodSecurityContext;
  /**
   * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
   */
  serviceAccount?: string;
  /**
   * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
   */
  serviceAccountName?: string;
  /**
   * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.
   */
  setHostnameAsFQDN?: boolean;
  /**
   * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.
   */
  shareProcessNamespace?: boolean;
  /**
   * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
   */
  subdomain?: string;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * If specified, the pod's tolerations.
   */
  tolerations?: IToleration[];
  /**
   * TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.
   */
  topologySpreadConstraints?: ITopologySpreadConstraint[];
  /**
   * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
   */
  volumes?: IVolume[];
}

export interface ITypedObjectReference {
  /**
   * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
   */
  apiGroup?: string;
  /**
   * Name is the name of resource being referenced
   */
  name: string;
  /**
   * Namespace is the namespace of resource being referenced Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details. (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
   */
  namespace?: string;
}

/**
 * NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22
 */
export interface INodeConfigSource {
  /**
   * KubeletConfigKey declares which key of the referenced ConfigMap corresponds to the KubeletConfiguration structure This field is required in all cases.
   */
  kubeletConfigKey: string;
  /**
   * Name is the metadata.name of the referenced ConfigMap. This field is required in all cases.
   */
  name: string;
  /**
   * Namespace is the metadata.namespace of the referenced ConfigMap. This field is required in all cases.
   */
  namespace: string;
  /**
   * ResourceVersion is the metadata.ResourceVersion of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.
   */
  resourceVersion?: string;
  /**
   * UID is the metadata.UID of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.
   */
  uid?: string;
}

/**
 * The node this Taint is attached to has the "effect" on any pod that does not tolerate the Taint.
 */
export interface ITaint {
  /**
   * Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect: string;
  /**
   * Required. The taint key to be applied to a node.
   */
  key: string;
  /**
   * TimeAdded represents the time at which the taint was added. It is only written for NoExecute taints.
   */
  timeAdded?: Time;
  /**
   * The taint value corresponding to the taint key.
   */
  value?: string;
}

/**
 * LimitRangeItem defines a min/max usage limit for any resource that matches on kind.
 */
export interface ILimitRangeItem {
  /**
   * Default resource requirement limit value by resource name if resource limit is omitted.
   */
  default?: Record<string, string>;
  /**
   * DefaultRequest is the default resource requirement request value by resource name if resource request is omitted.
   */
  defaultRequest?: Record<string, string>;
  /**
   * Max usage constraints on this kind by resource name.
   */
  max?: Record<string, string>;
  /**
   * MaxLimitRequestRatio if specified, the named resource must have a request and limit that are both non-zero where limit divided by request is less than or equal to the enumerated value; this represents the max burst for the named resource.
   */
  maxLimitRequestRatio?: Record<string, string>;
  /**
   * Min usage constraints on this kind by resource name.
   */
  min?: Record<string, string>;
  /**
   * Type of resource that this limit applies to.
   */
  type: string;
}

/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export interface IEventSeries {
  /**
   * Number of occurrences in this series up to the last heartbeat time
   */
  count?: number | bigint;
  /**
   * Time of the last occurrence observed
   */
  lastObservedTime?: MicroTime;
}

/**
 * EndpointAddress is a tuple that describes single IP address.
 */
export interface IEndpointAddress {
  /**
   * The Hostname of this endpoint
   */
  hostname?: string;
  /**
   * The IP of this endpoint. May not be loopback (127.0.0.0/8 or ::1), link-local (169.254.0.0/16 or fe80::/10), or link-local multicast (224.0.0.0/24 or ff02::/16).
   */
  ip: string;
  /**
   * Optional: Node hosting this endpoint. This can be used to determine endpoints local to a node.
   */
  nodeName?: string;
  /**
   * Reference to object providing the endpoint.
   */
  targetRef?: IObjectReference;
}

/**
 * EndpointPort is a tuple that describes a single port.
 */
export interface IEndpointPort {
  /**
   * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:
   *
   * * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).
   *
   * * Kubernetes-defined prefixed names:
   * * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540
   *
   * * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * The name of this port.  This must match the 'name' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.
   */
  name?: string;
  /**
   * The port number of the endpoint.
   */
  port: number | bigint;
  /**
   * The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
   */
  protocol?: string;
}

/**
 * PersistentVolumeClaim is a user's request for and claim to a persistent volume
 */
export interface IPersistentVolumeClaim {
  /**
   * accessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
   */
  accessModes?: string[];
  /**
   * dataSource field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef, and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified. If the namespace is specified, then dataSourceRef will not be copied to dataSource.
   */
  dataSource?: ITypedLocalObjectReference;
  /**
   * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the dataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, when namespace isn't specified in dataSourceRef, both fields (dataSource and dataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. When namespace is specified in dataSourceRef, dataSource isn't set to the same value and must be empty. There are three important differences between dataSource and dataSourceRef: * While dataSource only allows two specific types of objects, dataSourceRef
   * allows any non-core object, as well as PersistentVolumeClaim objects.
   * * While dataSource ignores disallowed values (dropping them), dataSourceRef
   * preserves all values, and generates an error if a disallowed value is
   * specified.
   * * While dataSource only allows local objects, dataSourceRef allows objects
   * in any namespaces.
   * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled. (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
   */
  dataSourceRef?: ITypedObjectReference;
  /**
   * resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
   */
  resources?: IResourceRequirements;
  /**
   * selector is a label query over volumes to consider for binding.
   */
  selector?: ILabelSelector;
  /**
   * storageClassName is the name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
   */
  storageClassName?: string;
  /**
   * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
   */
  volumeMode?: string;
  /**
   * volumeName is the binding reference to the PersistentVolume backing this claim.
   */
  volumeName?: string;
}

/** * Binding ties one object to another; for example, a pod is bound to a node by a scheduler. Deprecated in 1.7, please use the bindings subresource of pods instead. */
export const Binding = (
  props: {
    /**
     * If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.
     */
    fieldPath?: string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    name?: string;
    /**
     * Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
     */
    namespace?: string;
    /**
     * Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     */
    resourceVersion?: string;
    /**
     * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
     */
    uid?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "target",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Binding"
      kind="Binding"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * ConfigMap holds configuration data for pods to consume. */
export const ConfigMap = (
  props: {
    /**
     * BinaryData contains the binary data. Each key must consist of alphanumeric characters, '-', '_' or '.'. BinaryData can contain byte sequences that are not in the UTF-8 range. The keys stored in BinaryData must not overlap with the ones in the Data field, this is enforced during validation process. Using this field will require 1.10+ apiserver and kubelet.
     */
    binaryData?: Record<string, string>;
    /**
     * Data contains the configuration data. Each key must consist of alphanumeric characters, '-', '_' or '.'. Values with non-UTF-8 byte sequences must use the BinaryData field. The keys stored in Data must not overlap with the keys in the BinaryData field, this is enforced during validation process.
     */
    data?: Record<string, string>;
    /**
     * Immutable, if set to true, ensures that data stored in the ConfigMap cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.
     */
    immutable?: boolean;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.core.v1.ConfigMap"
      kind="ConfigMap"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * Endpoints is a collection of endpoints that implement the actual service. Example:
 *
 * Name: "mysvc",
 * Subsets: [
 * {
 * Addresses: [{"ip": "10.10.1.1"}, {"ip": "10.10.2.2"}],
 * Ports: [{"name": "a", "port": 8675}, {"name": "b", "port": 309}]
 * },
 * {
 * Addresses: [{"ip": "10.10.3.3"}],
 * Ports: [{"name": "a", "port": 93}, {"name": "b", "port": 76}]
 * },
 * ]
 *
 * Child components:
 * - subsets.ports: {@link EndpointPort}
 * - subsets.addresses: {@link EndpointAddress} with 'address' flag
 * - subsets.notReadyAddresses: {@link EndpointAddress} with 'notReady' flag */
export const Endpoints = ({
  children,
  ...props
}: {
  /**
   * IP addresses which offer the related ports that are marked as ready. These endpoints should be considered safe for load balancers and clients to utilize.
   */
  addresses?: IEndpointAddress[];
  /**
   * IP addresses which offer the related ports but are not currently marked as ready because they have not yet finished starting, have recently failed a readiness check, or have recently failed a liveness check.
   */
  notReadyAddresses?: IEndpointAddress[];
  /**
   * Port numbers available on the related IP addresses.
   */
  ports?: IEndpointPort[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "subsets",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Endpoints"
      kind="Endpoints"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Event is a report of an event somewhere in the cluster.  Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data. */
export const Event = (
  props: {
    /**
     * What action was taken/failed regarding to the Regarding object.
     */
    action?: string;
    /**
     * The number of times this event has occurred.
     */
    count?: number | bigint;
    /**
     * Time when this Event was first observed.
     */
    eventTime?: MicroTime;
    /**
     * The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)
     */
    firstTimestamp?: Time;
    /**
     * The object that this event is about.
     */
    involvedObject: IObjectReference;
    /**
     * The time at which the most recent occurrence of this event was recorded.
     */
    lastTimestamp?: Time;
    /**
     * A human-readable description of the status of this operation.
     */
    message?: string;
    /**
     * This should be a short, machine understandable string that gives the reason for the transition into the object's current status.
     */
    reason?: string;
    /**
     * Optional secondary object for more complex actions.
     */
    related?: IObjectReference;
    /**
     * Name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`.
     */
    reportingComponent?: string;
    /**
     * ID of the controller instance, e.g. `kubelet-xyzf`.
     */
    reportingInstance?: string;
    /**
     * Data about the Event series this event represents or nil if it's a singleton Event.
     */
    series?: IEventSeries;
    /**
     * The component reporting this event. Should be a short machine understandable string.
     */
    source?: IEventSource;
    /**
     * Type of this event (Normal, Warning), new types could be added in the future
     */
    type?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.core.v1.Event"
      kind="Event"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * LimitRange sets resource usage limits for each kind of resource in a Namespace.
 *
 * Child components:
 * - spec.limits: {@link LimitRangeItem} */
export const LimitRange = ({
  children,
  ...props
}: {
  /**
   * Limits is the list of LimitRangeItem objects that are enforced.
   */
  limits?: ILimitRangeItem[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.LimitRange"
      kind="LimitRange"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Namespace provides a scope for Names. Use of multiple namespaces is optional. */
export const Namespace = (
  props: {
    /**
     * Finalizers is an opaque list of values that must be empty to permanently remove object from storage. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/
     */
    finalizers?: string[];
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Namespace"
      kind="Namespace"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * Node is a worker node in Kubernetes. Each node will have a unique identifier in the cache (i.e. in etcd).
 *
 * Child components:
 * - spec.taints: {@link Taint} */
export const Node = ({
  children,
  ...props
}: {
  /**
   * Deprecated: Previously used to specify the source of the node's configuration for the DynamicKubeletConfig feature. This feature is removed.
   */
  configSource?: INodeConfigSource;
  /**
   * Deprecated. Not all kubelets will set this field. Remove field after 1.13. see: https://issues.k8s.io/61966
   */
  externalID?: string;
  /**
   * PodCIDR represents the pod IP range assigned to the node.
   */
  podCIDR?: string;
  /**
   * podCIDRs represents the IP ranges assigned to the node for usage by Pods on that node. If this field is specified, the 0th entry must match the podCIDR field. It may contain at most 1 value for each of IPv4 and IPv6.
   */
  podCIDRs?: string[];
  /**
   * ID of the node assigned by the cloud provider in the format: <ProviderName>://<ProviderSpecificNodeID>
   */
  providerID?: string;
  /**
   * If specified, the node's taints.
   */
  taints?: ITaint[];
  /**
   * Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration
   */
  unschedulable?: boolean;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Node"
      kind="Node"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PersistentVolume (PV) is a storage resource provisioned by an administrator. It is analogous to a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes
 *
 * Child components:
 * - spec.cephfs: {@link CephFSPersistentVolumeSource} (single element)
 * - spec.cinder: {@link CinderPersistentVolumeSource} (single element)
 * - spec.csi: {@link CSIPersistentVolumeSource} (single element)
 * - spec.flexVolume: {@link FlexPersistentVolumeSource} (single element)
 * - spec.iscsi: {@link ISCSIPersistentVolumeSource} (single element)
 * - spec.nodeAffinity: {@link VolumeNodeAffinity} (single element)
 * - spec.rbd: {@link RBDPersistentVolumeSource} (single element)
 * - spec.scaleIO: {@link ScaleIOPersistentVolumeSource} (single element)
 * - spec.storageos: {@link StorageOSPersistentVolumeSource} (single element) */
export const PersistentVolume = ({
  children,
  ...props
}: {
  /**
   * accessModes contains all ways the volume can be mounted. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
   */
  accessModes?: string[];
  /**
   * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  awsElasticBlockStore?: IAWSElasticBlockStoreVolumeSource;
  /**
   * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
   */
  azureDisk?: IAzureDiskVolumeSource;
  /**
   * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
   */
  azureFile?: IAzureFilePersistentVolumeSource;
  /**
   * capacity is the description of the persistent volume's resources and capacity. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
   */
  capacity?: Record<string, string>;
  /**
   * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
   */
  cephfs?: ICephFSPersistentVolumeSource;
  /**
   * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  cinder?: ICinderPersistentVolumeSource;
  /**
   * claimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim. Expected to be non-nil when bound. claim.VolumeName is the authoritative bind between PV and PVC. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
   */
  claimRef?: IObjectReference;
  /**
   * csi represents storage that is handled by an external CSI driver (Beta feature).
   */
  csi?: ICSIPersistentVolumeSource;
  /**
   * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
   */
  fc?: IFCVolumeSource;
  /**
   * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
   */
  flexVolume?: IFlexPersistentVolumeSource;
  /**
   * flocker represents a Flocker volume attached to a kubelet's host machine and exposed to the pod for its usage. This depends on the Flocker control service being running
   */
  flocker?: IFlockerVolumeSource;
  /**
   * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  gcePersistentDisk?: IGCEPersistentDiskVolumeSource;
  /**
   * glusterfs represents a Glusterfs volume that is attached to a host and exposed to the pod. Provisioned by an admin. More info: https://examples.k8s.io/volumes/glusterfs/README.md
   */
  glusterfs?: IGlusterfsPersistentVolumeSource;
  /**
   * hostPath represents a directory on the host. Provisioned by a developer or tester. This is useful for single-node development and testing only! On-host storage is not supported in any way and WILL NOT WORK in a multi-node cluster. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  hostPath?: IHostPathVolumeSource;
  /**
   * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin.
   */
  iscsi?: IISCSIPersistentVolumeSource;
  /**
   * local represents directly-attached storage with node affinity
   */
  local?: ILocalVolumeSource;
  /**
   * mountOptions is the list of mount options, e.g. ["ro", "soft"]. Not validated - mount will simply fail if one is invalid. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options
   */
  mountOptions?: string[];
  /**
   * nfs represents an NFS mount on the host. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  nfs?: INFSVolumeSource;
  /**
   * nodeAffinity defines constraints that limit what nodes this volume can be accessed from. This field influences the scheduling of pods that use this volume.
   */
  nodeAffinity?: IVolumeNodeAffinity;
  /**
   * persistentVolumeReclaimPolicy defines what happens to a persistent volume when released from its claim. Valid options are Retain (default for manually created PersistentVolumes), Delete (default for dynamically provisioned PersistentVolumes), and Recycle (deprecated). Recycle must be supported by the volume plugin underlying this PersistentVolume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
   */
  persistentVolumeReclaimPolicy?: string;
  /**
   * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
   */
  photonPersistentDisk?: IPhotonPersistentDiskVolumeSource;
  /**
   * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
   */
  portworxVolume?: IPortworxVolumeSource;
  /**
   * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
   */
  quobyte?: IQuobyteVolumeSource;
  /**
   * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
   */
  rbd?: IRBDPersistentVolumeSource;
  /**
   * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
   */
  scaleIO?: IScaleIOPersistentVolumeSource;
  /**
   * storageClassName is the name of StorageClass to which this persistent volume belongs. Empty value means that this volume does not belong to any StorageClass.
   */
  storageClassName?: string;
  /**
   * storageOS represents a StorageOS volume that is attached to the kubelet's host machine and mounted into the pod More info: https://examples.k8s.io/volumes/storageos/README.md
   */
  storageos?: IStorageOSPersistentVolumeSource;
  /**
   * volumeMode defines if a volume is intended to be used with a formatted filesystem or to remain in raw block state. Value of Filesystem is implied when not included in spec.
   */
  volumeMode?: string;
  /**
   * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
   */
  vsphereVolume?: IVsphereVirtualDiskVolumeSource;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.PersistentVolume"
      kind="PersistentVolume"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PersistentVolumeClaim is a user's request for and claim to a persistent volume
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.resources: {@link ResourceRequirements} (single element) */
export const PersistentVolumeClaim = ({
  children,
  ...props
}: {
  /**
   * accessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
   */
  accessModes?: string[];
  /**
   * dataSource field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef, and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified. If the namespace is specified, then dataSourceRef will not be copied to dataSource.
   */
  dataSource?: ITypedLocalObjectReference;
  /**
   * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the dataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, when namespace isn't specified in dataSourceRef, both fields (dataSource and dataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. When namespace is specified in dataSourceRef, dataSource isn't set to the same value and must be empty. There are three important differences between dataSource and dataSourceRef: * While dataSource only allows two specific types of objects, dataSourceRef
   * allows any non-core object, as well as PersistentVolumeClaim objects.
   * * While dataSource ignores disallowed values (dropping them), dataSourceRef
   * preserves all values, and generates an error if a disallowed value is
   * specified.
   * * While dataSource only allows local objects, dataSourceRef allows objects
   * in any namespaces.
   * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled. (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
   */
  dataSourceRef?: ITypedObjectReference;
  /**
   * resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
   */
  resources?: IResourceRequirements;
  /**
   * selector is a label query over volumes to consider for binding.
   */
  selector?: ILabelSelector;
  /**
   * storageClassName is the name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
   */
  storageClassName?: string;
  /**
   * volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.
   */
  volumeMode?: string;
  /**
   * volumeName is the binding reference to the PersistentVolume backing this claim.
   */
  volumeName?: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.PersistentVolumeClaim"
      kind="PersistentVolumeClaim"
      apiVersion="v1"
      contexts={[
        {
          id: "io.k8s.api.apps.v1.StatefulSet",
          path: "spec.volumeClaimTemplates",
          isItem: true,
        },
        {
          id: "io.k8s.api.apps.v1.StatefulSetSpec",
          path: "volumeClaimTemplates",
          isItem: true,
        },
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSet",
          path: "spec.volumeClaimTemplates",
          isItem: true,
        },
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
          path: "volumeClaimTemplates",
          isItem: true,
        },
        {
          id: "io.k8s.api.apps.v1beta2.StatefulSet",
          path: "spec.volumeClaimTemplates",
          isItem: true,
        },
        {
          id: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
          path: "volumeClaimTemplates",
          isItem: true,
        },
      ]}
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Pod is a collection of containers that can run on a host. This resource is created by clients and scheduled onto hosts.
 *
 * Child components:
 * - spec.tolerations: {@link Toleration}
 * - spec.affinity: {@link Affinity} (single element)
 * - spec.dnsConfig: {@link PodDNSConfig} (single element)
 * - spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.hostAliases: {@link HostAlias}
 * - spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.readinessGates: {@link PodReadinessGate}
 * - spec.resourceClaims: {@link PodResourceClaim}
 * - spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.securityContext: {@link PodSecurityContext} (single element)
 * - spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.volumes: {@link Volume}
 * - spec.containers: {@link Container} with 'container' flag
 * - spec.initContainers: {@link Container} with 'init' flag */
export const Pod = ({
  children,
  ...props
}: {
  /**
   * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * If specified, the pod's scheduling constraints
   */
  affinity?: IAffinity;
  /**
   * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
   */
  automountServiceAccountToken?: boolean;
  /**
   * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
   */
  containers?: IContainer[];
  /**
   * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
   */
  dnsConfig?: IPodDNSConfig;
  /**
   * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
   */
  dnsPolicy?: string;
  /**
   * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
   */
  enableServiceLinks?: boolean;
  /**
   * List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.
   */
  ephemeralContainers?: IEphemeralContainer[];
  /**
   * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
   */
  hostAliases?: IHostAlias[];
  /**
   * Use the host's ipc namespace. Optional: Default to false.
   */
  hostIPC?: boolean;
  /**
   * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
   */
  hostNetwork?: boolean;
  /**
   * Use the host's pid namespace. Optional: Default to false.
   */
  hostPID?: boolean;
  /**
   * Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host. This field is alpha-level and is only honored by servers that enable the UserNamespacesSupport feature.
   */
  hostUsers?: boolean;
  /**
   * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
   */
  hostname?: string;
  /**
   * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
   */
  initContainers?: IContainer[];
  /**
   * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
   */
  nodeName?: string;
  /**
   * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
   */
  nodeSelector?: Record<string, string>;
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md
   */
  overhead?: Record<string, string>;
  /**
   * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
   */
  preemptionPolicy?: string;
  /**
   * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
   */
  priority?: number | bigint;
  /**
   * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
   */
  priorityClassName?: string;
  /**
   * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates
   */
  readinessGates?: IPodReadinessGate[];
  /**
   * ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable.
   */
  resourceClaims?: IPodResourceClaim[];
  /**
   * Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
   */
  restartPolicy?: string;
  /**
   * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class
   */
  runtimeClassName?: string;
  /**
   * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
   */
  schedulerName?: string;
  /**
   * SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.
   *
   * SchedulingGates can only be set at pod creation time, and be removed only afterwards.
   *
   * This is a beta feature enabled by the PodSchedulingReadiness feature gate.
   */
  schedulingGates?: IPodSchedulingGate[];
  /**
   * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
   */
  securityContext?: IPodSecurityContext;
  /**
   * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
   */
  serviceAccount?: string;
  /**
   * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
   */
  serviceAccountName?: string;
  /**
   * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.
   */
  setHostnameAsFQDN?: boolean;
  /**
   * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.
   */
  shareProcessNamespace?: boolean;
  /**
   * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
   */
  subdomain?: string;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * If specified, the pod's tolerations.
   */
  tolerations?: IToleration[];
  /**
   * TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.
   */
  topologySpreadConstraints?: ITopologySpreadConstraint[];
  /**
   * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
   */
  volumes?: IVolume[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Pod"
      kind="Pod"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PodTemplate describes a template for creating copies of a predefined pod.
 *
 * Child components:
 * - template.spec: {@link PodSpec} (single element) */
export const PodTemplate = ({
  children,
  ...props
}: {
  /**
   * Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec?: IPodSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "template",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.PodTemplate"
      kind="PodTemplate"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ReplicationController represents the configuration of a replication controller.
 *
 * Child components:
 * - spec.template: {@link PodTemplateSpec} (single element) */
export const ReplicationController = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller
   */
  replicas?: number | bigint;
  /**
   * Selector is a label query over pods that should match the Replicas count. If Selector is empty, it is defaulted to the labels present on the Pod template. Label keys and values that must match in order to be controlled by this replication controller, if empty defaulted to labels on Pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: Record<string, string>;
  /**
   * Template is the object that describes the pod that will be created if insufficient replicas are detected. This takes precedence over a TemplateRef. The only allowed template.spec.restartPolicy value is "Always". More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.ReplicationController"
      kind="ReplicationController"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ResourceQuota sets aggregate quota restrictions enforced per namespace */
export const ResourceQuota = (
  props: {
    /**
     * hard is the set of desired hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/
     */
    hard?: Record<string, string>;
    /**
     * scopeSelector is also a collection of filters like scopes that must match each object tracked by a quota but expressed using ScopeSelectorOperator in combination with possible values. For a resource to match, both scopes AND scopeSelector (if specified in spec), must be matched.
     */
    scopeSelector?: IScopeSelector;
    /**
     * A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects.
     */
    scopes?: string[];
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.ResourceQuota"
      kind="ResourceQuota"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * Secret holds secret data of a certain type. The total bytes of the values in the Data field must be less than MaxSecretSize bytes. */
export const Secret = (
  props: {
    /**
     * Data contains the secret data. Each key must consist of alphanumeric characters, '-', '_' or '.'. The serialized form of the secret data is a base64 encoded string, representing the arbitrary (possibly non-string) data value here. Described in https://tools.ietf.org/html/rfc4648#section-4
     */
    data?: Record<string, string>;
    /**
     * Immutable, if set to true, ensures that data stored in the Secret cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.
     */
    immutable?: boolean;
    /**
     * stringData allows specifying non-binary secret data in string form. It is provided as a write-only input field for convenience. All keys and values are merged into the data field on write, overwriting any existing values. The stringData field is never output when reading from the API.
     */
    stringData?: Record<string, string>;
    /**
     * Used to facilitate programmatic handling of secret data. More info: https://kubernetes.io/docs/concepts/configuration/secret/#secret-types
     */
    type?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.core.v1.Secret"
      kind="Secret"
      apiVersion="v1"
      props={childProps}
    />
  );
};

/** * Service is a named abstraction of software service (for example, mysql) consisting of local port (for example 3306) that the proxy listens on, and the selector that determines which pods will answer requests sent through the proxy.
 *
 * Child components:
 * - spec.ports: {@link ServicePort} */
export const Service = ({
  children,
  ...props
}: {
  /**
   * allocateLoadBalancerNodePorts defines if NodePorts will be automatically allocated for services with type LoadBalancer.  Default is "true". It may be set to "false" if the cluster load-balancer does not rely on NodePorts.  If the caller requests specific NodePorts (by specifying a value), those requests will be respected, regardless of this field. This field may only be set for services with type LoadBalancer and will be cleared if the type is changed to any other type.
   */
  allocateLoadBalancerNodePorts?: boolean;
  /**
   * clusterIP is the IP address of the service and is usually assigned randomly. If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be blank) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address. Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
   */
  clusterIP?: string;
  /**
   * ClusterIPs is a list of IP addresses assigned to this service, and are usually assigned randomly.  If an address is specified manually, is in-range (as per system configuration), and is not in use, it will be allocated to the service; otherwise creation of the service will fail. This field may not be changed through updates unless the type field is also being changed to ExternalName (which requires this field to be empty) or the type field is being changed from ExternalName (in which case this field may optionally be specified, as describe above).  Valid values are "None", empty string (""), or a valid IP address.  Setting this to "None" makes a "headless service" (no virtual IP), which is useful when direct endpoint connections are preferred and proxying is not required.  Only applies to types ClusterIP, NodePort, and LoadBalancer. If this field is specified when creating a Service of type ExternalName, creation will fail. This field will be wiped when updating a Service to type ExternalName.  If this field is not specified, it will be initialized from the clusterIP field.  If this field is specified, clients must ensure that clusterIPs[0] and clusterIP have the same value.
   *
   * This field may hold a maximum of two entries (dual-stack IPs, in either order). These IPs must correspond to the values of the ipFamilies field. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
   */
  clusterIPs?: string[];
  /**
   * externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
   */
  externalIPs?: string[];
  /**
   * externalName is the external reference that discovery mechanisms will return as an alias for this service (e.g. a DNS CNAME record). No proxying will be involved.  Must be a lowercase RFC-1123 hostname (https://tools.ietf.org/html/rfc1123) and requires `type` to be "ExternalName".
   */
  externalName?: string;
  /**
   * externalTrafficPolicy describes how nodes distribute service traffic they receive on one of the Service's "externally-facing" addresses (NodePorts, ExternalIPs, and LoadBalancer IPs). If set to "Local", the proxy will configure the service in a way that assumes that external load balancers will take care of balancing the service traffic between nodes, and so each node will deliver traffic only to the node-local endpoints of the service, without masquerading the client source IP. (Traffic mistakenly sent to a node with no endpoints will be dropped.) The default value, "Cluster", uses the standard behavior of routing to all endpoints evenly (possibly modified by topology and other features). Note that traffic sent to an External IP or LoadBalancer IP from within the cluster will always get "Cluster" semantics, but clients sending to a NodePort from within the cluster may need to take traffic policy into account when picking a node.
   */
  externalTrafficPolicy?: string;
  /**
   * healthCheckNodePort specifies the healthcheck nodePort for the service. This only applies when type is set to LoadBalancer and externalTrafficPolicy is set to Local. If a value is specified, is in-range, and is not in use, it will be used.  If not specified, a value will be automatically allocated.  External systems (e.g. load-balancers) can use this port to determine if a given node holds endpoints for this service or not.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type). This field cannot be updated once set.
   */
  healthCheckNodePort?: number | bigint;
  /**
   * InternalTrafficPolicy describes how nodes distribute service traffic they receive on the ClusterIP. If set to "Local", the proxy will assume that pods only want to talk to endpoints of the service on the same node as the pod, dropping the traffic if there are no local endpoints. The default value, "Cluster", uses the standard behavior of routing to all endpoints evenly (possibly modified by topology and other features).
   */
  internalTrafficPolicy?: string;
  /**
   * IPFamilies is a list of IP families (e.g. IPv4, IPv6) assigned to this service. This field is usually assigned automatically based on cluster configuration and the ipFamilyPolicy field. If this field is specified manually, the requested family is available in the cluster, and ipFamilyPolicy allows it, it will be used; otherwise creation of the service will fail. This field is conditionally mutable: it allows for adding or removing a secondary IP family, but it does not allow changing the primary IP family of the Service. Valid values are "IPv4" and "IPv6".  This field only applies to Services of types ClusterIP, NodePort, and LoadBalancer, and does apply to "headless" services. This field will be wiped when updating a Service to type ExternalName.
   *
   * This field may hold a maximum of two entries (dual-stack families, in either order).  These families must correspond to the values of the clusterIPs field, if specified. Both clusterIPs and ipFamilies are governed by the ipFamilyPolicy field.
   */
  ipFamilies?: string[];
  /**
   * IPFamilyPolicy represents the dual-stack-ness requested or required by this Service. If there is no value provided, then this field will be set to SingleStack. Services can be "SingleStack" (a single IP family), "PreferDualStack" (two IP families on dual-stack configured clusters or a single IP family on single-stack clusters), or "RequireDualStack" (two IP families on dual-stack configured clusters, otherwise fail). The ipFamilies and clusterIPs fields depend on the value of this field. This field will be wiped when updating a service to type ExternalName.
   */
  ipFamilyPolicy?: string;
  /**
   * loadBalancerClass is the class of the load balancer implementation this Service belongs to. If specified, the value of this field must be a label-style identifier, with an optional prefix, e.g. "internal-vip" or "example.com/internal-vip". Unprefixed names are reserved for end-users. This field can only be set when the Service type is 'LoadBalancer'. If not set, the default load balancer implementation is used, today this is typically done through the cloud provider integration, but should apply for any default implementation. If set, it is assumed that a load balancer implementation is watching for Services with a matching class. Any default load balancer implementation (e.g. cloud providers) should ignore Services that set this field. This field can only be set when creating or updating a Service to type 'LoadBalancer'. Once set, it can not be changed. This field will be wiped when a service is updated to a non 'LoadBalancer' type.
   */
  loadBalancerClass?: string;
  /**
   * Only applies to Service Type: LoadBalancer. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature. Deprecated: This field was under-specified and its meaning varies across implementations, and it cannot support dual-stack. As of Kubernetes v1.24, users are encouraged to use implementation-specific annotations when available. This field may be removed in a future API version.
   */
  loadBalancerIP?: string;
  /**
   * If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/
   */
  loadBalancerSourceRanges?: string[];
  /**
   * The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
   */
  ports?: IServicePort[];
  /**
   * publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service should disregard any indications of ready/not-ready. The primary use case for setting this field is for a StatefulSet's Headless Service to propagate SRV DNS records for its Pods for the purpose of peer discovery. The Kubernetes controllers that generate Endpoints and EndpointSlice resources for Services interpret this to mean that all endpoints are considered "ready" even if the Pods themselves are not. Agents which consume only Kubernetes generated endpoints through the Endpoints or EndpointSlice resources can safely assume this behavior.
   */
  publishNotReadyAddresses?: boolean;
  /**
   * Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
   */
  selector?: Record<string, string>;
  /**
   * Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
   */
  sessionAffinity?: string;
  /**
   * sessionAffinityConfig contains the configurations of session affinity.
   */
  sessionAffinityConfig?: ISessionAffinityConfig;
  /**
   * type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object or EndpointSlice objects. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a virtual IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the same endpoints as the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the same endpoints as the clusterIP. "ExternalName" aliases this service to the specified externalName. Several other fields do not apply to ExternalName services. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
   */
  type?: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.core.v1.Service"
      kind="Service"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ServiceAccount binds together: * a name, understood by users, and perhaps by peripheral systems, for an identity * a principal that can be authenticated and authorized * a set of secrets
 *
 * Child components:
 * - imagePullSecrets: {@link LocalObjectReference}
 * - secrets: {@link ObjectReference} */
export const ServiceAccount = ({
  children,
  ...props
}: {
  /**
   * AutomountServiceAccountToken indicates whether pods running as this service account should have an API token automatically mounted. Can be overridden at the pod level.
   */
  automountServiceAccountToken?: boolean;
  /**
   * ImagePullSecrets is a list of references to secrets in the same namespace to use for pulling any images in pods that reference this ServiceAccount. ImagePullSecrets are distinct from Secrets because Secrets can be mounted in the pod, but ImagePullSecrets are only accessed by the kubelet. More info: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * Secrets is a list of the secrets in the same namespace that pods running using this ServiceAccount are allowed to use. Pods are only limited to this list if this service account has a "kubernetes.io/enforce-mountable-secrets" annotation set to "true". This field should not be used to find auto-generated service account token secrets for use outside of pods. Instead, tokens can be requested directly using the TokenRequest API, or service account token secrets can be manually created. More info: https://kubernetes.io/docs/concepts/configuration/secret
   */
  secrets?: IObjectReference[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.core.v1.ServiceAccount"
      kind="ServiceAccount"
      apiVersion="v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.
 *
 * Child components:
 * - nodeSelectorTerms.matchExpressions: {@link NodeSelectorRequirement} with 'matchExpression' flag
 * - nodeSelectorTerms.matchFields: {@link NodeSelectorRequirement} with 'matchField' flag */
export const NodeSelector = ({
  children,
  ...props
}: {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "nodeSelectorTerms",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.NodeSelector"
      contexts={[
        {
          id: "io.k8s.api.core.v1.NodeAffinity",
          path: "requiredDuringSchedulingIgnoredDuringExecution",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1alpha1.ClusterCIDR",
          path: "spec.nodeSelector",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1alpha1.ClusterCIDRSpec",
          path: "nodeSelector",
          isItem: false,
        },
        {
          id: "io.k8s.api.resource.v1alpha1.AllocationResult",
          path: "availableOnNodes",
          isItem: false,
        },
        {
          id: "io.k8s.api.resource.v1alpha1.ResourceClass",
          path: "suitableNodes",
          isItem: false,
        },
        {
          id: "io.k8s.api.resource.v1alpha2.AllocationResult",
          path: "availableOnNodes",
          isItem: false,
        },
        {
          id: "io.k8s.api.resource.v1alpha2.ResourceClass",
          path: "suitableNodes",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values. */
export const NodeSelectorRequirement = (
  props: {
    /**
     * The label key that the selector applies to.
     */
    key: string;
    /**
     * Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
     */
    operator: string;
    /**
     * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
     */
    values?: string[];
  } & ({ matchExpression: boolean } | { matchField: boolean })
) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["matchExpression", "matchField"],
  });
  return (
    <Item
      id="io.k8s.api.core.v1.NodeSelectorRequirement"
      contexts={[
        {
          id: "io.k8s.api.core.v1.NodeSelector",
          path: "nodeSelectorTerms.matchExpressions",
          isItem: true,
          flag: "matchExpression",
        },
        {
          id: "io.k8s.api.core.v1.NodeSelector",
          path: "nodeSelectorTerms.matchFields",
          isItem: true,
          flag: "matchField",
        },
        {
          id: "io.k8s.api.core.v1.NodeSelectorTerm",
          path: "matchExpressions",
          isItem: true,
          flag: "matchExpression",
        },
        {
          id: "io.k8s.api.core.v1.NodeSelectorTerm",
          path: "matchFields",
          isItem: true,
          flag: "matchField",
        },
        {
          id: "io.k8s.api.core.v1.VolumeNodeAffinity",
          path: "required.matchExpressions",
          isItem: true,
          flag: "matchExpression",
        },
        {
          id: "io.k8s.api.core.v1.VolumeNodeAffinity",
          path: "required.matchFields",
          isItem: true,
          flag: "matchField",
        },
      ]}
      value={childProps}
      flag={flag}
    />
  );
};

/** * The pod this Toleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>. */
export const Toleration = (props: {
  /**
   * Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect?: string;
  /**
   * Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.
   */
  key?: string;
  /**
   * Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
   */
  operator?: string;
  /**
   * TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.
   */
  tolerationSeconds?: number | bigint;
  /**
   * Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.
   */
  value?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Toleration"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.tolerations",
          isItem: true,
        },
        { id: "io.k8s.api.core.v1.PodSpec", path: "tolerations", isItem: true },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.tolerations",
          isItem: true,
        },
        {
          id: "io.k8s.api.node.v1.Scheduling",
          path: "tolerations",
          isItem: true,
        },
        {
          id: "io.k8s.api.node.v1alpha1.Scheduling",
          path: "tolerations",
          isItem: true,
        },
        {
          id: "io.k8s.api.node.v1beta1.Scheduling",
          path: "tolerations",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodTemplateSpec describes the data a pod should have when created from a template
 *
 * Child components:
 * - spec.tolerations: {@link Toleration}
 * - spec.affinity: {@link Affinity} (single element)
 * - spec.dnsConfig: {@link PodDNSConfig} (single element)
 * - spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.hostAliases: {@link HostAlias}
 * - spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.readinessGates: {@link PodReadinessGate}
 * - spec.resourceClaims: {@link PodResourceClaim}
 * - spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.securityContext: {@link PodSecurityContext} (single element)
 * - spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.volumes: {@link Volume}
 * - spec.containers: {@link Container} with 'container' flag
 * - spec.initContainers: {@link Container} with 'init' flag */
export const PodTemplateSpec = ({
  children,
  ...props
}: {
  /**
   * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * If specified, the pod's scheduling constraints
   */
  affinity?: IAffinity;
  /**
   * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
   */
  automountServiceAccountToken?: boolean;
  /**
   * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
   */
  containers?: IContainer[];
  /**
   * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
   */
  dnsConfig?: IPodDNSConfig;
  /**
   * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
   */
  dnsPolicy?: string;
  /**
   * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
   */
  enableServiceLinks?: boolean;
  /**
   * List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.
   */
  ephemeralContainers?: IEphemeralContainer[];
  /**
   * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
   */
  hostAliases?: IHostAlias[];
  /**
   * Use the host's ipc namespace. Optional: Default to false.
   */
  hostIPC?: boolean;
  /**
   * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
   */
  hostNetwork?: boolean;
  /**
   * Use the host's pid namespace. Optional: Default to false.
   */
  hostPID?: boolean;
  /**
   * Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host. This field is alpha-level and is only honored by servers that enable the UserNamespacesSupport feature.
   */
  hostUsers?: boolean;
  /**
   * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
   */
  hostname?: string;
  /**
   * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
   */
  initContainers?: IContainer[];
  /**
   * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
   */
  nodeName?: string;
  /**
   * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
   */
  nodeSelector?: Record<string, string>;
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md
   */
  overhead?: Record<string, string>;
  /**
   * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
   */
  preemptionPolicy?: string;
  /**
   * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
   */
  priority?: number | bigint;
  /**
   * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
   */
  priorityClassName?: string;
  /**
   * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates
   */
  readinessGates?: IPodReadinessGate[];
  /**
   * ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable.
   */
  resourceClaims?: IPodResourceClaim[];
  /**
   * Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
   */
  restartPolicy?: string;
  /**
   * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class
   */
  runtimeClassName?: string;
  /**
   * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
   */
  schedulerName?: string;
  /**
   * SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.
   *
   * SchedulingGates can only be set at pod creation time, and be removed only afterwards.
   *
   * This is a beta feature enabled by the PodSchedulingReadiness feature gate.
   */
  schedulingGates?: IPodSchedulingGate[];
  /**
   * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
   */
  securityContext?: IPodSecurityContext;
  /**
   * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
   */
  serviceAccount?: string;
  /**
   * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
   */
  serviceAccountName?: string;
  /**
   * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.
   */
  setHostnameAsFQDN?: boolean;
  /**
   * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.
   */
  shareProcessNamespace?: boolean;
  /**
   * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
   */
  subdomain?: string;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * If specified, the pod's tolerations.
   */
  tolerations?: IToleration[];
  /**
   * TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.
   */
  topologySpreadConstraints?: ITopologySpreadConstraint[];
  /**
   * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
   */
  volumes?: IVolume[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.PodTemplateSpec"
      contexts={[
        {
          id: "io.k8s.api.apps.v1.DaemonSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.DaemonSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.Deployment",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.DeploymentSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.ReplicaSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.ReplicaSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.StatefulSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.StatefulSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.Deployment",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.DeploymentSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.DaemonSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.DaemonSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.Deployment",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.DeploymentSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.ReplicaSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.ReplicaSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.StatefulSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
          path: "template",
          isItem: false,
        },
        { id: "io.k8s.api.batch.v1.Job", path: "spec.template", isItem: false },
        { id: "io.k8s.api.batch.v1.JobSpec", path: "template", isItem: false },
        {
          id: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.ReplicationController",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.ReplicationControllerSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.DaemonSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.Deployment",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.DeploymentSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.ReplicaSet",
          path: "spec.template",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.ReplicaSetSpec",
          path: "template",
          isItem: false,
        },
        {
          id: "io.k8s.api.batch.v1.JobTemplateSpec",
          path: "spec.template",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Affinity is a group of affinity scheduling rules.
 *
 * Child components:
 * - nodeAffinity: {@link NodeAffinity} (single element)
 * - podAffinity: {@link PodAffinity} (single element)
 * - podAntiAffinity: {@link PodAntiAffinity} (single element) */
export const Affinity = ({
  children,
  ...props
}: {
  /**
   * Describes node affinity scheduling rules for the pod.
   */
  nodeAffinity?: INodeAffinity;
  /**
   * Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
   */
  podAffinity?: IPodAffinity;
  /**
   * Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
   */
  podAntiAffinity?: IPodAntiAffinity;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Affinity"
      contexts={[
        { id: "io.k8s.api.core.v1.Pod", path: "spec.affinity", isItem: false },
        { id: "io.k8s.api.core.v1.PodSpec", path: "affinity", isItem: false },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.affinity",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.
 *
 * Child components:
 * - options: {@link PodDNSConfigOption} */
export const PodDNSConfig = ({
  children,
  ...props
}: {
  /**
   * A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.
   */
  nameservers?: string[];
  /**
   * A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.
   */
  options?: IPodDNSConfigOption[];
  /**
   * A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.
   */
  searches?: string[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodDNSConfig"
      contexts={[
        { id: "io.k8s.api.core.v1.Pod", path: "spec.dnsConfig", isItem: false },
        { id: "io.k8s.api.core.v1.PodSpec", path: "dnsConfig", isItem: false },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.dnsConfig",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.
 *
 * To add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.
 *
 * Child components:
 * - env: {@link EnvVar}
 * - envFrom: {@link EnvFromSource}
 * - lifecycle: {@link Lifecycle} (single element)
 * - ports: {@link ContainerPort}
 * - resizePolicy: {@link ContainerResizePolicy}
 * - resources: {@link ResourceRequirements} (single element)
 * - securityContext: {@link SecurityContext} (single element)
 * - volumeDevices: {@link VolumeDevice}
 * - volumeMounts: {@link VolumeMount}
 * - livenessProbe: {@link Probe} with 'livenessProbe' flag (single element)
 * - readinessProbe: {@link Probe} with 'readinessProbe' flag (single element)
 * - startupProbe: {@link Probe} with 'startupProbe' flag (single element) */
export const EphemeralContainer = ({
  children,
  ...props
}: {
  /**
   * Arguments to the entrypoint. The image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  args?: string[];
  /**
   * Entrypoint array. Not executed within a shell. The image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  command?: string[];
  /**
   * List of environment variables to set in the container. Cannot be updated.
   */
  env?: IEnvVar[];
  /**
   * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images
   */
  image?: string;
  /**
   * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
   */
  imagePullPolicy?: string;
  /**
   * Lifecycle is not allowed for ephemeral containers.
   */
  lifecycle?: ILifecycle;
  /**
   * Probes are not allowed for ephemeral containers.
   */
  livenessProbe?: IProbe;
  /**
   * Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.
   */
  name: string;
  /**
   * Ports are not allowed for ephemeral containers.
   */
  ports?: IContainerPort[];
  /**
   * Probes are not allowed for ephemeral containers.
   */
  readinessProbe?: IProbe;
  /**
   * Resources resize policy for the container.
   */
  resizePolicy?: IContainerResizePolicy[];
  /**
   * Resources are not allowed for ephemeral containers. Ephemeral containers use spare resources already allocated to the pod.
   */
  resources?: IResourceRequirements;
  /**
   * Optional: SecurityContext defines the security options the ephemeral container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
   */
  securityContext?: ISecurityContext;
  /**
   * Probes are not allowed for ephemeral containers.
   */
  startupProbe?: IProbe;
  /**
   * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
   */
  stdin?: boolean;
  /**
   * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
   */
  stdinOnce?: boolean;
  /**
   * If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container uses the namespaces configured in the Pod spec.
   *
   * The container runtime must implement support for this feature. If the runtime does not support namespace targeting then the result of setting this field is undefined.
   */
  targetContainerName?: string;
  /**
   * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
   */
  terminationMessagePath?: string;
  /**
   * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
   */
  terminationMessagePolicy?: string;
  /**
   * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
   */
  tty?: boolean;
  /**
   * volumeDevices is the list of block devices to be used by the container.
   */
  volumeDevices?: IVolumeDevice[];
  /**
   * Pod volumes to mount into the container's filesystem. Subpath mounts are not allowed for ephemeral containers. Cannot be updated.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
   */
  workingDir?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.EphemeralContainer"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.ephemeralContainers",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "ephemeralContainers",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.ephemeralContainers",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file. */
export const HostAlias = (props: {
  /**
   * Hostnames for the above IP address.
   */
  hostnames?: string[];
  /**
   * IP address of the host file entry.
   */
  ip?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.HostAlias"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.hostAliases",
          isItem: true,
        },
        { id: "io.k8s.api.core.v1.PodSpec", path: "hostAliases", isItem: true },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.hostAliases",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace. */
export const LocalObjectReference = (props: {
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.LocalObjectReference"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.imagePullSecrets",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "imagePullSecrets",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.imagePullSecrets",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.ServiceAccount",
          path: "imagePullSecrets",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodReadinessGate contains the reference to a pod condition */
export const PodReadinessGate = (props: {
  /**
   * ConditionType refers to a condition in the pod's condition list with matching type.
   */
  conditionType: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodReadinessGate"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.readinessGates",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "readinessGates",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.readinessGates",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodResourceClaim references exactly one ResourceClaim through a ClaimSource. It adds a name to it that uniquely identifies the ResourceClaim inside the Pod. Containers that need access to the ResourceClaim reference it with this name. */
export const PodResourceClaim = (props: {
  /**
   * Name uniquely identifies this resource claim inside the pod. This must be a DNS_LABEL.
   */
  name: string;
  /**
   * Source describes where to find the ResourceClaim.
   */
  source?: IClaimSource;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodResourceClaim"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.resourceClaims",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "resourceClaims",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.resourceClaims",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodSchedulingGate is associated to a Pod to guard its scheduling. */
export const PodSchedulingGate = (props: {
  /**
   * Name of the scheduling gate. Each scheduling gate must have a unique name field.
   */
  name: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodSchedulingGate"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.schedulingGates",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "schedulingGates",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.schedulingGates",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.
 *
 * Child components:
 * - sysctls: {@link Sysctl} */
export const PodSecurityContext = ({
  children,
  ...props
}: {
  /**
   * A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
   *
   * 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----
   *
   * If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.
   */
  fsGroup?: number | bigint;
  /**
   * fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used. Note that this field cannot be set when spec.os.name is windows.
   */
  fsGroupChangePolicy?: string;
  /**
   * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsGroup?: number | bigint;
  /**
   * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
   */
  runAsNonRoot?: boolean;
  /**
   * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsUser?: number | bigint;
  /**
   * The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
   */
  seLinuxOptions?: ISELinuxOptions;
  /**
   * The seccomp options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.
   */
  seccompProfile?: ISeccompProfile;
  /**
   * A list of groups applied to the first process run in each container, in addition to the container's primary GID, the fsGroup (if specified), and group memberships defined in the container image for the uid of the container process. If unspecified, no additional groups are added to any container. Note that group memberships defined in the container image for the uid of the container process are still effective, even if they are not included in this list. Note that this field cannot be set when spec.os.name is windows.
   */
  supplementalGroups?: number | bigint[];
  /**
   * Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.
   */
  sysctls?: ISysctl[];
  /**
   * The Windows specific settings applied to all containers. If unspecified, the options within a container's SecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.
   */
  windowsOptions?: IWindowsSecurityContextOptions;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodSecurityContext"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.securityContext",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "securityContext",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.securityContext",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * TopologySpreadConstraint specifies how to spread matching pods among the given topology.
 *
 * Child components:
 * - labelSelector: {@link LabelSelector} (single element) */
export const TopologySpreadConstraint = ({
  children,
  ...props
}: {
  /**
   * LabelSelector is used to find matching pods. Pods that match this label selector are counted to determine the number of pods in their corresponding topology domain.
   */
  labelSelector?: ILabelSelector;
  /**
   * MatchLabelKeys is a set of pod label keys to select the pods over which spreading will be calculated. The keys are used to lookup values from the incoming pod labels, those key-value labels are ANDed with labelSelector to select the group of existing pods over which spreading will be calculated for the incoming pod. The same key is forbidden to exist in both MatchLabelKeys and LabelSelector. MatchLabelKeys cannot be set when LabelSelector isn't set. Keys that don't exist in the incoming pod labels will be ignored. A null or empty list means only match against labelSelector.
   *
   * This is a beta field and requires the MatchLabelKeysInPodTopologySpread feature gate to be enabled (enabled by default).
   */
  matchLabelKeys?: string[];
  /**
   * MaxSkew describes the degree to which pods may be unevenly distributed. When `whenUnsatisfiable=DoNotSchedule`, it is the maximum permitted difference between the number of matching pods in the target topology and the global minimum. The global minimum is the minimum number of matching pods in an eligible domain or zero if the number of eligible domains is less than MinDomains. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 2/2/1: In this case, the global minimum is 1. | zone1 | zone2 | zone3 | |  P P  |  P P  |   P   | - if MaxSkew is 1, incoming pod can only be scheduled to zone3 to become 2/2/2; scheduling it onto zone1(zone2) would make the ActualSkew(3-1) on zone1(zone2) violate MaxSkew(1). - if MaxSkew is 2, incoming pod can be scheduled onto any zone. When `whenUnsatisfiable=ScheduleAnyway`, it is used to give higher precedence to topologies that satisfy it. It's a required field. Default value is 1 and 0 is not allowed.
   */
  maxSkew: number | bigint;
  /**
   * MinDomains indicates a minimum number of eligible domains. When the number of eligible domains with matching topology keys is less than minDomains, Pod Topology Spread treats "global minimum" as 0, and then the calculation of Skew is performed. And when the number of eligible domains with matching topology keys equals or greater than minDomains, this value has no effect on scheduling. As a result, when the number of eligible domains is less than minDomains, scheduler won't schedule more than maxSkew Pods to those domains. If value is nil, the constraint behaves as if MinDomains is equal to 1. Valid values are integers greater than 0. When value is not nil, WhenUnsatisfiable must be DoNotSchedule.
   *
   * For example, in a 3-zone cluster, MaxSkew is set to 2, MinDomains is set to 5 and pods with the same labelSelector spread as 2/2/2: | zone1 | zone2 | zone3 | |  P P  |  P P  |  P P  | The number of domains is less than 5(MinDomains), so "global minimum" is treated as 0. In this situation, new pod with the same labelSelector cannot be scheduled, because computed skew will be 3(3 - 0) if new Pod is scheduled to any of the three zones, it will violate MaxSkew.
   *
   * This is a beta field and requires the MinDomainsInPodTopologySpread feature gate to be enabled (enabled by default).
   */
  minDomains?: number | bigint;
  /**
   * NodeAffinityPolicy indicates how we will treat Pod's nodeAffinity/nodeSelector when calculating pod topology spread skew. Options are: - Honor: only nodes matching nodeAffinity/nodeSelector are included in the calculations. - Ignore: nodeAffinity/nodeSelector are ignored. All nodes are included in the calculations.
   *
   * If this value is nil, the behavior is equivalent to the Honor policy. This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
   */
  nodeAffinityPolicy?: string;
  /**
   * NodeTaintsPolicy indicates how we will treat node taints when calculating pod topology spread skew. Options are: - Honor: nodes without taints, along with tainted nodes for which the incoming pod has a toleration, are included. - Ignore: node taints are ignored. All nodes are included.
   *
   * If this value is nil, the behavior is equivalent to the Ignore policy. This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
   */
  nodeTaintsPolicy?: string;
  /**
   * TopologyKey is the key of node labels. Nodes that have a label with this key and identical values are considered to be in the same topology. We consider each <key, value> as a "bucket", and try to put balanced number of pods into each bucket. We define a domain as a particular instance of a topology. Also, we define an eligible domain as a domain whose nodes meet the requirements of nodeAffinityPolicy and nodeTaintsPolicy. e.g. If TopologyKey is "kubernetes.io/hostname", each Node is a domain of that topology. And, if TopologyKey is "topology.kubernetes.io/zone", each zone is a domain of that topology. It's a required field.
   */
  topologyKey: string;
  /**
   * WhenUnsatisfiable indicates how to deal with a pod if it doesn't satisfy the spread constraint. - DoNotSchedule (default) tells the scheduler not to schedule it. - ScheduleAnyway tells the scheduler to schedule the pod in any location,
   * but giving higher precedence to topologies that would help reduce the
   * skew.
   * A constraint is considered "Unsatisfiable" for an incoming pod if and only if every possible node assignment for that pod would violate "MaxSkew" on some topology. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 3/1/1: | zone1 | zone2 | zone3 | | P P P |   P   |   P   | If WhenUnsatisfiable is set to DoNotSchedule, incoming pod can only be scheduled to zone2(zone3) to become 3/2/1(3/1/2) as ActualSkew(2-1) on zone2(zone3) satisfies MaxSkew(1). In other words, the cluster can still be imbalanced, but scheduler won't make it *more* imbalanced. It's a required field.
   */
  whenUnsatisfiable: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.TopologySpreadConstraint"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.topologySpreadConstraints",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "topologySpreadConstraints",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.topologySpreadConstraints",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 *
 * Child components:
 * - cephfs: {@link CephFSVolumeSource} (single element)
 * - cinder: {@link CinderVolumeSource} (single element)
 * - configMap: {@link ConfigMapVolumeSource} (single element)
 * - csi: {@link CSIVolumeSource} (single element)
 * - downwardAPI: {@link DownwardAPIVolumeSource} (single element)
 * - flexVolume: {@link FlexVolumeSource} (single element)
 * - iscsi: {@link ISCSIVolumeSource} (single element)
 * - projected: {@link ProjectedVolumeSource} (single element)
 * - rbd: {@link RBDVolumeSource} (single element)
 * - scaleIO: {@link ScaleIOVolumeSource} (single element)
 * - secret: {@link SecretVolumeSource} (single element)
 * - storageos: {@link StorageOSVolumeSource} (single element) */
export const Volume = ({
  children,
  ...props
}: {
  /**
   * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  awsElasticBlockStore?: IAWSElasticBlockStoreVolumeSource;
  /**
   * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
   */
  azureDisk?: IAzureDiskVolumeSource;
  /**
   * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
   */
  azureFile?: IAzureFileVolumeSource;
  /**
   * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
   */
  cephfs?: ICephFSVolumeSource;
  /**
   * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  cinder?: ICinderVolumeSource;
  /**
   * configMap represents a configMap that should populate this volume
   */
  configMap?: IConfigMapVolumeSource;
  /**
   * csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature).
   */
  csi?: ICSIVolumeSource;
  /**
   * downwardAPI represents downward API about the pod that should populate this volume
   */
  downwardAPI?: IDownwardAPIVolumeSource;
  /**
   * emptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
   */
  emptyDir?: IEmptyDirVolumeSource;
  /**
   * ephemeral represents a volume that is handled by a cluster storage driver. The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts, and deleted when the pod is removed.
   *
   * Use this if: a) the volume is only needed while the pod runs, b) features of normal volumes like restoring from snapshot or capacity
   * tracking are needed,
   * c) the storage driver is specified through a storage class, and d) the storage driver supports dynamic volume provisioning through
   * a PersistentVolumeClaim (see EphemeralVolumeSource for more
   * information on the connection between this volume type
   * and PersistentVolumeClaim).
   *
   * Use PersistentVolumeClaim or one of the vendor-specific APIs for volumes that persist for longer than the lifecycle of an individual pod.
   *
   * Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to be used that way - see the documentation of the driver for more information.
   *
   * A pod can use both types of ephemeral volumes and persistent volumes at the same time.
   */
  ephemeral?: IEphemeralVolumeSource;
  /**
   * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
   */
  fc?: IFCVolumeSource;
  /**
   * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
   */
  flexVolume?: IFlexVolumeSource;
  /**
   * flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
   */
  flocker?: IFlockerVolumeSource;
  /**
   * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  gcePersistentDisk?: IGCEPersistentDiskVolumeSource;
  /**
   * gitRepo represents a git repository at a particular revision. DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
   */
  gitRepo?: IGitRepoVolumeSource;
  /**
   * glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/glusterfs/README.md
   */
  glusterfs?: IGlusterfsVolumeSource;
  /**
   * hostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  hostPath?: IHostPathVolumeSource;
  /**
   * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://examples.k8s.io/volumes/iscsi/README.md
   */
  iscsi?: IISCSIVolumeSource;
  /**
   * name of the volume. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name: string;
  /**
   * nfs represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  nfs?: INFSVolumeSource;
  /**
   * persistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
   */
  persistentVolumeClaim?: IPersistentVolumeClaimVolumeSource;
  /**
   * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
   */
  photonPersistentDisk?: IPhotonPersistentDiskVolumeSource;
  /**
   * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
   */
  portworxVolume?: IPortworxVolumeSource;
  /**
   * projected items for all in one resources secrets, configmaps, and downward API
   */
  projected?: IProjectedVolumeSource;
  /**
   * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
   */
  quobyte?: IQuobyteVolumeSource;
  /**
   * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
   */
  rbd?: IRBDVolumeSource;
  /**
   * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
   */
  scaleIO?: IScaleIOVolumeSource;
  /**
   * secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
   */
  secret?: ISecretVolumeSource;
  /**
   * storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
   */
  storageos?: IStorageOSVolumeSource;
  /**
   * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
   */
  vsphereVolume?: IVsphereVirtualDiskVolumeSource;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Volume"
      contexts={[
        { id: "io.k8s.api.core.v1.Pod", path: "spec.volumes", isItem: true },
        { id: "io.k8s.api.core.v1.PodSpec", path: "volumes", isItem: true },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.volumes",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPreset",
          path: "spec.volumes",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
          path: "volumes",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * A single application container that you want to run within a pod.
 *
 * Child components:
 * - env: {@link EnvVar}
 * - envFrom: {@link EnvFromSource}
 * - lifecycle: {@link Lifecycle} (single element)
 * - ports: {@link ContainerPort}
 * - resizePolicy: {@link ContainerResizePolicy}
 * - resources: {@link ResourceRequirements} (single element)
 * - securityContext: {@link SecurityContext} (single element)
 * - volumeDevices: {@link VolumeDevice}
 * - volumeMounts: {@link VolumeMount}
 * - livenessProbe: {@link Probe} with 'livenessProbe' flag (single element)
 * - readinessProbe: {@link Probe} with 'readinessProbe' flag (single element)
 * - startupProbe: {@link Probe} with 'startupProbe' flag (single element) */
export const Container = ({
  children,
  ...props
}: {
  /**
   * Arguments to the entrypoint. The container image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  args?: string[];
  /**
   * Entrypoint array. Not executed within a shell. The container image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  command?: string[];
  /**
   * List of environment variables to set in the container. Cannot be updated.
   */
  env?: IEnvVar[];
  /**
   * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.
   */
  image?: string;
  /**
   * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
   */
  imagePullPolicy?: string;
  /**
   * Actions that the management system should take in response to container lifecycle events. Cannot be updated.
   */
  lifecycle?: ILifecycle;
  /**
   * Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  livenessProbe?: IProbe;
  /**
   * Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
   */
  name: string;
  /**
   * List of ports to expose from the container. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Modifying this array with strategic merge patch may corrupt the data. For more information See https://github.com/kubernetes/kubernetes/issues/108255. Cannot be updated.
   */
  ports?: IContainerPort[];
  /**
   * Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  readinessProbe?: IProbe;
  /**
   * Resources resize policy for the container.
   */
  resizePolicy?: IContainerResizePolicy[];
  /**
   * Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  resources?: IResourceRequirements;
  /**
   * SecurityContext defines the security options the container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext. More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
   */
  securityContext?: ISecurityContext;
  /**
   * StartupProbe indicates that the Pod has successfully initialized. If specified, no other probes are executed until this completes successfully. If this probe fails, the Pod will be restarted, just as if the livenessProbe failed. This can be used to provide different probe parameters at the beginning of a Pod's lifecycle, when it might take a long time to load data or warm a cache, than during steady-state operation. This cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  startupProbe?: IProbe;
  /**
   * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
   */
  stdin?: boolean;
  /**
   * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
   */
  stdinOnce?: boolean;
  /**
   * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
   */
  terminationMessagePath?: string;
  /**
   * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
   */
  terminationMessagePolicy?: string;
  /**
   * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
   */
  tty?: boolean;
  /**
   * volumeDevices is the list of block devices to be used by the container.
   */
  volumeDevices?: IVolumeDevice[];
  /**
   * Pod volumes to mount into the container's filesystem. Cannot be updated.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
   */
  workingDir?: string;
  children?: React.ReactNode;
} & ({ container?: boolean } | { init?: boolean })) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["container", "init"],
    defaultFlag: "container",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.Container"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.containers",
          isItem: true,
          flag: "container",
        },
        {
          id: "io.k8s.api.core.v1.Pod",
          path: "spec.initContainers",
          isItem: true,
          flag: "init",
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "containers",
          isItem: true,
          flag: "container",
        },
        {
          id: "io.k8s.api.core.v1.PodSpec",
          path: "initContainers",
          isItem: true,
          flag: "init",
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.containers",
          isItem: true,
          flag: "container",
        },
        {
          id: "io.k8s.api.core.v1.PodTemplateSpec",
          path: "spec.initContainers",
          isItem: true,
          flag: "init",
        },
      ]}
      value={childProps}
      flag={flag}
    >
      {children}
    </Item>
  );
};

/** * EnvVar represents an environment variable present in a Container.
 *
 * Child components:
 * - valueFrom: {@link EnvVarSource} (single element) */
export const EnvVar = ({
  children,
  ...props
}: {
  /**
   * Name of the environment variable. Must be a C_IDENTIFIER.
   */
  name: string;
  /**
   * Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".
   */
  value?: string;
  /**
   * Source for the environment variable's value. Cannot be used if value is not empty.
   */
  valueFrom?: IEnvVarSource;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.EnvVar"
      contexts={[
        { id: "io.k8s.api.core.v1.Container", path: "env", isItem: true },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPreset",
          path: "spec.env",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
          path: "env",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "env",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.env",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * EnvFromSource represents the source of a set of ConfigMaps */
export const EnvFromSource = (props: {
  /**
   * The ConfigMap to select from
   */
  configMapRef?: IConfigMapEnvSource;
  /**
   * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
   */
  prefix?: string;
  /**
   * The Secret to select from
   */
  secretRef?: ISecretEnvSource;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.EnvFromSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Container", path: "envFrom", isItem: true },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPreset",
          path: "spec.envFrom",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
          path: "envFrom",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "envFrom",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.envFrom",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.
 *
 * Child components:
 * - postStart: {@link LifecycleHandler} with 'postStart' flag (single element)
 * - preStop: {@link LifecycleHandler} with 'preStop' flag (single element) */
export const Lifecycle = ({
  children,
  ...props
}: {
  /**
   * PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
   */
  postStart?: ILifecycleHandler;
  /**
   * PreStop is called immediately before a container is terminated due to an API request or management event such as liveness/startup probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits. The Pod's termination grace period countdown begins before the PreStop hook is executed. Regardless of the outcome of the handler, the container will eventually terminate within the Pod's termination grace period (unless delayed by finalizers). Other management of the container blocks until the hook completes or until the termination grace period is reached. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
   */
  preStop?: ILifecycleHandler;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Lifecycle"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "lifecycle",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "lifecycle",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.lifecycle",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * ContainerPort represents a network port in a single container. */
export const ContainerPort = (props: {
  /**
   * Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
   */
  containerPort: number | bigint;
  /**
   * What host IP to bind the external port to.
   */
  hostIP?: string;
  /**
   * Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.
   */
  hostPort?: number | bigint;
  /**
   * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.
   */
  name?: string;
  /**
   * Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
   */
  protocol?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ContainerPort"
      contexts={[
        { id: "io.k8s.api.core.v1.Container", path: "ports", isItem: true },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "ports",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.ports",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ContainerResizePolicy represents resource resize policy for the container. */
export const ContainerResizePolicy = (props: {
  /**
   * Name of the resource to which this resource resize policy applies. Supported values: cpu, memory.
   */
  resourceName: string;
  /**
   * Restart policy to apply when specified resource is resized. If not specified, it defaults to NotRequired.
   */
  restartPolicy: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ContainerResizePolicy"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "resizePolicy",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "resizePolicy",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.resizePolicy",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ResourceRequirements describes the compute resource requirements.
 *
 * Child components:
 * - claims: {@link ResourceClaim} */
export const ResourceRequirements = ({
  children,
  ...props
}: {
  /**
   * Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable. It can only be set for containers.
   */
  claims?: IResourceClaim[];
  /**
   * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  limits?: Record<string, string>;
  /**
   * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   */
  requests?: Record<string, string>;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ResourceRequirements"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.ContainerStatus",
          path: "resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeClaim",
          path: "spec.resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeClaimSpec",
          path: "resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.resources",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeClaimTemplate",
          path: "spec.resources",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence. */
export const SecurityContext = (props: {
  /**
   * AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime. Note that this field cannot be set when spec.os.name is windows.
   */
  capabilities?: ICapabilities;
  /**
   * Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.
   */
  privileged?: boolean;
  /**
   * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsGroup?: number | bigint;
  /**
   * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
   */
  runAsNonRoot?: boolean;
  /**
   * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  runAsUser?: number | bigint;
  /**
   * The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.
   */
  seLinuxOptions?: ISELinuxOptions;
  /**
   * The seccomp options to use by this container. If seccomp options are provided at both the pod & container level, the container options override the pod options. Note that this field cannot be set when spec.os.name is windows.
   */
  seccompProfile?: ISeccompProfile;
  /**
   * The Windows specific settings applied to all containers. If unspecified, the options from the PodSecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.
   */
  windowsOptions?: IWindowsSecurityContextOptions;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.SecurityContext"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "securityContext",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "securityContext",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.securityContext",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * volumeDevice describes a mapping of a raw block device within a container. */
export const VolumeDevice = (props: {
  /**
   * devicePath is the path inside of the container that the device will be mapped to.
   */
  devicePath: string;
  /**
   * name must match the name of a persistentVolumeClaim in the pod
   */
  name: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.VolumeDevice"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "volumeDevices",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "volumeDevices",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.volumeDevices",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * VolumeMount describes a mounting of a Volume within a container. */
export const VolumeMount = (props: {
  /**
   * Path within the container at which the volume should be mounted.  Must not contain ':'.
   */
  mountPath: string;
  /**
   * mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.
   */
  mountPropagation?: string;
  /**
   * This must match the Name of a Volume.
   */
  name: string;
  /**
   * Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
   */
  subPath?: string;
  /**
   * Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to "" (volume's root). SubPathExpr and SubPath are mutually exclusive.
   */
  subPathExpr?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.VolumeMount"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "volumeMounts",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPreset",
          path: "spec.volumeMounts",
          isItem: true,
        },
        {
          id: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
          path: "volumeMounts",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "volumeMounts",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.volumeMounts",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 *
 * Child components:
 * - httpGet: {@link HTTPGetAction} (single element) */
export const Probe = ({
  children,
  ...props
}: {
  /**
   * Exec specifies the action to take.
   */
  exec?: IExecAction;
  /**
   * Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
   */
  failureThreshold?: number | bigint;
  /**
   * GRPC specifies an action involving a GRPC port.
   */
  grpc?: IGRPCAction;
  /**
   * HTTPGet specifies the http request to perform.
   */
  httpGet?: IHTTPGetAction;
  /**
   * Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  initialDelaySeconds?: number | bigint;
  /**
   * How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
   */
  periodSeconds?: number | bigint;
  /**
   * Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
   */
  successThreshold?: number | bigint;
  /**
   * TCPSocket specifies an action involving a TCP port.
   */
  tcpSocket?: ITCPSocketAction;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  timeoutSeconds?: number | bigint;
  children?: React.ReactNode;
} & (
  | { livenessProbe: boolean }
  | { readinessProbe: boolean }
  | { startupProbe: boolean }
)) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["livenessProbe", "readinessProbe", "startupProbe"],
  });
  return (
    <Item
      id="io.k8s.api.core.v1.Probe"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Container",
          path: "livenessProbe",
          isItem: false,
          flag: "livenessProbe",
        },
        {
          id: "io.k8s.api.core.v1.Container",
          path: "readinessProbe",
          isItem: false,
          flag: "readinessProbe",
        },
        {
          id: "io.k8s.api.core.v1.Container",
          path: "startupProbe",
          isItem: false,
          flag: "startupProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "livenessProbe",
          isItem: false,
          flag: "livenessProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "readinessProbe",
          isItem: false,
          flag: "readinessProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainer",
          path: "startupProbe",
          isItem: false,
          flag: "startupProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.livenessProbe",
          isItem: false,
          flag: "livenessProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.readinessProbe",
          isItem: false,
          flag: "readinessProbe",
        },
        {
          id: "io.k8s.api.core.v1.EphemeralContainers",
          path: "ephemeralContainers.startupProbe",
          isItem: false,
          flag: "startupProbe",
        },
      ]}
      value={childProps}
      flag={flag}
    >
      {children}
    </Item>
  );
};

/** * HTTPGetAction describes an action based on HTTP Get requests.
 *
 * Child components:
 * - httpHeaders: {@link HTTPHeader} */
export const HTTPGetAction = ({
  children,
  ...props
}: {
  /**
   * Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
   */
  host?: string;
  /**
   * Custom headers to set in the request. HTTP allows repeated headers.
   */
  httpHeaders?: IHTTPHeader[];
  /**
   * Path to access on the HTTP server.
   */
  path?: string;
  /**
   * Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
   */
  port: IntOrString;
  /**
   * Scheme to use for connecting to the host. Defaults to HTTP.
   */
  scheme?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.HTTPGetAction"
      contexts={[
        { id: "io.k8s.api.core.v1.Handler", path: "httpGet", isItem: false },
        { id: "io.k8s.api.core.v1.Probe", path: "httpGet", isItem: false },
        {
          id: "io.k8s.api.core.v1.LifecycleHandler",
          path: "httpGet",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * HTTPHeader describes a custom header to be used in HTTP probes */
HTTPGetAction.HTTPHeader = (props: {
  /**
   * The header field name
   */
  name: string;
  /**
   * The header field value
   */
  value: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.HTTPHeader"
      contexts={[
        {
          id: "io.k8s.api.core.v1.HTTPGetAction",
          path: "httpHeaders",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ResourceClaim references one entry in PodSpec.ResourceClaims. */
ResourceRequirements.ResourceClaim = (props: {
  /**
   * Name must match the name of one entry in pod.spec.resourceClaims of the Pod where this field is used. It makes that resource available inside a container.
   */
  name: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ResourceClaim"
      contexts={[
        {
          id: "io.k8s.api.core.v1.ResourceRequirements",
          path: "claims",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.
 *
 * Child components:
 * - httpGet: {@link HTTPGetAction} (single element) */
export const LifecycleHandler = ({
  children,
  ...props
}: {
  /**
   * Exec specifies the action to take.
   */
  exec?: IExecAction;
  /**
   * HTTPGet specifies the http request to perform.
   */
  httpGet?: IHTTPGetAction;
  /**
   * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept for the backward compatibility. There are no validation of this field and lifecycle hooks will fail in runtime when tcp handler is specified.
   */
  tcpSocket?: ITCPSocketAction;
  children?: React.ReactNode;
} & ({ postStart: boolean } | { preStop: boolean })) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["postStart", "preStop"],
  });
  return (
    <Item
      id="io.k8s.api.core.v1.LifecycleHandler"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Lifecycle",
          path: "postStart",
          isItem: false,
          flag: "postStart",
        },
        {
          id: "io.k8s.api.core.v1.Lifecycle",
          path: "preStop",
          isItem: false,
          flag: "preStop",
        },
      ]}
      value={childProps}
      flag={flag}
    >
      {children}
    </Item>
  );
};

/** * EnvVarSource represents a source for the value of an EnvVar. */
export const EnvVarSource = (props: {
  /**
   * Selects a key of a ConfigMap.
   */
  configMapKeyRef?: IConfigMapKeySelector;
  /**
   * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
  /**
   * Selects a key of a secret in the pod's namespace
   */
  secretKeyRef?: ISecretKeySelector;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.EnvVarSource"
      contexts={[
        { id: "io.k8s.api.core.v1.EnvVar", path: "valueFrom", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling. */
export const CephFSVolumeSource = (props: {
  /**
   * monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
   */
  path?: string;
  /**
   * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretFile?: string;
  /**
   * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretRef?: ILocalObjectReference;
  /**
   * user is optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  user?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CephFSVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "cephfs", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling. */
export const CinderVolumeSource = (props: {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  fsType?: string;
  /**
   * secretRef is optional: points to a secret object containing parameters used to connect to OpenStack.
   */
  secretRef?: ILocalObjectReference;
  /**
   * volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  volumeID: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CinderVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "cinder", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Adapts a ConfigMap into a volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.
 *
 * Child components:
 * - items: {@link KeyToPath} */
export const ConfigMapVolumeSource = ({
  children,
  ...props
}: {
  /**
   * defaultMode is optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional specify whether the ConfigMap or its keys must be defined
   */
  optional?: boolean;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ConfigMapVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "configMap", isItem: false },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents a source location of a volume to mount, managed by an external CSI driver */
export const CSIVolumeSource = (props: {
  /**
   * driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.
   */
  driver: string;
  /**
   * fsType to mount. Ex. "ext4", "xfs", "ntfs". If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.
   */
  fsType?: string;
  /**
   * nodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and  may be empty if no secret is required. If the secret object contains more than one secret, all secret references are passed.
   */
  nodePublishSecretRef?: ILocalObjectReference;
  /**
   * volumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.
   */
  volumeAttributes?: Record<string, string>;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CSIVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "csi", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 *
 * Child components:
 * - items: {@link DownwardAPIVolumeFile} */
export const DownwardAPIVolumeSource = ({
  children,
  ...props
}: {
  /**
   * Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * Items is a list of downward API volume file
   */
  items?: IDownwardAPIVolumeFile[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.DownwardAPIVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "downwardAPI", isItem: false },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin. */
export const FlexVolumeSource = (props: {
  /**
   * driver is the name of the driver to use for this volume.
   */
  driver: string;
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
   */
  fsType?: string;
  /**
   * options is Optional: this field holds extra command options if any.
   */
  options?: Record<string, string>;
  /**
   * secretRef is Optional: secretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
   */
  secretRef?: ILocalObjectReference;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.FlexVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "flexVolume", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling. */
export const ISCSIVolumeSource = (props: {
  /**
   * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
   */
  chapAuthDiscovery?: boolean;
  /**
   * chapAuthSession defines whether support iSCSI Session CHAP authentication
   */
  chapAuthSession?: boolean;
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
   */
  fsType?: string;
  /**
   * initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
   */
  initiatorName?: string;
  /**
   * iqn is the target iSCSI Qualified Name.
   */
  iqn: string;
  /**
   * iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
   */
  iscsiInterface?: string;
  /**
   * lun represents iSCSI Target Lun number.
   */
  lun: number | bigint;
  /**
   * portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  portals?: string[];
  /**
   * secretRef is the CHAP Secret for iSCSI target and initiator authentication
   */
  secretRef?: ILocalObjectReference;
  /**
   * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  targetPortal: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ISCSIVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "iscsi", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Represents a projected volume source
 *
 * Child components:
 * - sources: {@link VolumeProjection} */
export const ProjectedVolumeSource = ({
  children,
  ...props
}: {
  /**
   * defaultMode are the mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * sources is the list of volume projections
   */
  sources?: IVolumeProjection[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ProjectedVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "projected", isItem: false },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling. */
export const RBDVolumeSource = (props: {
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
   */
  fsType?: string;
  /**
   * image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  image: string;
  /**
   * keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  keyring?: string;
  /**
   * monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  pool?: string;
  /**
   * secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  secretRef?: ILocalObjectReference;
  /**
   * user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  user?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.RBDVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "rbd", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * ScaleIOVolumeSource represents a persistent ScaleIO volume */
export const ScaleIOVolumeSource = (props: {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs".
   */
  fsType?: string;
  /**
   * gateway is the host address of the ScaleIO API Gateway.
   */
  gateway: string;
  /**
   * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
   */
  protectionDomain?: string;
  /**
   * secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
   */
  secretRef: ILocalObjectReference;
  /**
   * sslEnabled Flag enable/disable SSL communication with Gateway, default false
   */
  sslEnabled?: boolean;
  /**
   * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
   */
  storageMode?: string;
  /**
   * storagePool is the ScaleIO Storage Pool associated with the protection domain.
   */
  storagePool?: string;
  /**
   * system is the name of the storage system as configured in ScaleIO.
   */
  system: string;
  /**
   * volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.
   */
  volumeName?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ScaleIOVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "scaleIO", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Adapts a Secret into a volume.
 *
 * The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.
 *
 * Child components:
 * - items: {@link KeyToPath} */
export const SecretVolumeSource = ({
  children,
  ...props
}: {
  /**
   * defaultMode is Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  defaultMode?: number | bigint;
  /**
   * items If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * optional field specify whether the Secret or its keys must be defined
   */
  optional?: boolean;
  /**
   * secretName is the name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
   */
  secretName?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.SecretVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "secret", isItem: false },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents a StorageOS persistent volume resource. */
export const StorageOSVolumeSource = (props: {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.
   */
  secretRef?: ILocalObjectReference;
  /**
   * volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.
   */
  volumeName?: string;
  /**
   * volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.
   */
  volumeNamespace?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.StorageOSVolumeSource"
      contexts={[
        { id: "io.k8s.api.core.v1.Volume", path: "storageos", isItem: false },
      ]}
      value={childProps}
    />
  );
};

/** * Maps a string key to a path within a volume. */
export const KeyToPath = (props: {
  /**
   * key is the key to project.
   */
  key: string;
  /**
   * mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
   */
  path: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.KeyToPath"
      contexts={[
        {
          id: "io.k8s.api.core.v1.ConfigMapProjection",
          path: "items",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.ConfigMapVolumeSource",
          path: "items",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.SecretProjection",
          path: "items",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.SecretVolumeSource",
          path: "items",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Projection that may be projected along with other supported volume types
 *
 * Child components:
 * - configMap: {@link ConfigMapProjection} (single element)
 * - downwardAPI: {@link DownwardAPIProjection} (single element)
 * - secret: {@link SecretProjection} (single element) */
ProjectedVolumeSource.VolumeProjection = ({
  children,
  ...props
}: {
  /**
   * configMap information about the configMap data to project
   */
  configMap?: IConfigMapProjection;
  /**
   * downwardAPI information about the downwardAPI data to project
   */
  downwardAPI?: IDownwardAPIProjection;
  /**
   * secret information about the secret data to project
   */
  secret?: ISecretProjection;
  /**
   * serviceAccountToken is information about the serviceAccountToken data to project
   */
  serviceAccountToken?: IServiceAccountTokenProjection;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.VolumeProjection"
      contexts={[
        {
          id: "io.k8s.api.core.v1.ProjectedVolumeSource",
          path: "sources",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Adapts a ConfigMap into a projected volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.
 *
 * Child components:
 * - items: {@link KeyToPath} */
export const ConfigMapProjection = ({
  children,
  ...props
}: {
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional specify whether the ConfigMap or its keys must be defined
   */
  optional?: boolean;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ConfigMapProjection"
      contexts={[
        {
          id: "io.k8s.api.core.v1.VolumeProjection",
          path: "configMap",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode. */
export const DownwardAPIProjection = (props: {
  /**
   * Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
   */
  path: string;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "items",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.DownwardAPIProjection"
      contexts={[
        {
          id: "io.k8s.api.core.v1.VolumeProjection",
          path: "downwardAPI",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Adapts a secret into a projected volume.
 *
 * The contents of the target Secret's Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret volume source without the default mode.
 *
 * Child components:
 * - items: {@link KeyToPath} */
export const SecretProjection = ({
  children,
  ...props
}: {
  /**
   * items if unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
   */
  items?: IKeyToPath[];
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * optional field specify whether the Secret or its key must be defined
   */
  optional?: boolean;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.SecretProjection"
      contexts={[
        {
          id: "io.k8s.api.core.v1.VolumeProjection",
          path: "secret",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * DownwardAPIVolumeFile represents information to create the file containing the pod field */
DownwardAPIVolumeSource.DownwardAPIVolumeFile = (props: {
  /**
   * Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
   */
  fieldRef?: IObjectFieldSelector;
  /**
   * Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
   */
  mode?: number | bigint;
  /**
   * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
   */
  path: string;
  /**
   * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
   */
  resourceFieldRef?: IResourceFieldSelector;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.DownwardAPIVolumeFile"
      contexts={[
        {
          id: "io.k8s.api.core.v1.DownwardAPIVolumeSource",
          path: "items",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Sysctl defines a kernel parameter to be set */
PodSecurityContext.Sysctl = (props: {
  /**
   * Name of a property to set
   */
  name: string;
  /**
   * Value of a property to set
   */
  value: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Sysctl"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PodSecurityContext",
          path: "sysctls",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PodDNSConfigOption defines DNS resolver options of a pod. */
PodDNSConfig.PodDNSConfigOption = (props: {
  /**
   * Required.
   */
  name?: string;
  value?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodDNSConfigOption"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PodDNSConfig",
          path: "options",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Node affinity is a group of node affinity scheduling rules.
 *
 * Child components:
 * - requiredDuringSchedulingIgnoredDuringExecution: {@link NodeSelector} (single element)
 * - preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm} */
export const NodeAffinity = ({
  children,
  ...props
}: {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IPreferredSchedulingTerm[];
  /**
   * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: INodeSelector;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.NodeAffinity"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Affinity",
          path: "nodeAffinity",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Pod affinity is a group of inter pod affinity scheduling rules.
 *
 * Child components:
 * - preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm} */
export const PodAffinity = ({
  children,
  ...props
}: {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IWeightedPodAffinityTerm[];
  /**
   * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinityTerm[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodAffinity"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Affinity",
          path: "podAffinity",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Pod anti affinity is a group of inter pod anti affinity scheduling rules.
 *
 * Child components:
 * - preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm} */
export const PodAntiAffinity = ({
  children,
  ...props
}: {
  /**
   * The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
   */
  preferredDuringSchedulingIgnoredDuringExecution?: IWeightedPodAffinityTerm[];
  /**
   * If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
   */
  requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinityTerm[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodAntiAffinity"
      contexts={[
        {
          id: "io.k8s.api.core.v1.Affinity",
          path: "podAntiAffinity",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)
 *
 * Child components:
 * - podAffinityTerm: {@link PodAffinityTerm} (single element) */
export const WeightedPodAffinityTerm = ({
  children,
  ...props
}: {
  /**
   * Required. A pod affinity term, associated with the corresponding weight.
   */
  podAffinityTerm?: IPodAffinityTerm;
  /**
   * weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
   */
  weight: number | bigint;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.WeightedPodAffinityTerm"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PodAffinity",
          path: "preferredDuringSchedulingIgnoredDuringExecution",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodAntiAffinity",
          path: "preferredDuringSchedulingIgnoredDuringExecution",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 *
 * Child components:
 * - labelSelector: {@link LabelSelector} with 'labelSelector' flag (single element)
 * - namespaceSelector: {@link LabelSelector} with 'namespaceSelector' flag (single element) */
export const PodAffinityTerm = ({
  children,
  ...props
}: {
  /**
   * A label query over a set of resources, in this case pods.
   */
  labelSelector?: ILabelSelector;
  /**
   * A label query over the set of namespaces that the term applies to. The term is applied to the union of the namespaces selected by this field and the ones listed in the namespaces field. null selector and null or empty namespaces list means "this pod's namespace". An empty selector ({}) matches all namespaces.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod's namespace".
   */
  namespaces?: string[];
  /**
   * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.
   */
  topologyKey: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodAffinityTerm"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PodAffinity",
          path: "requiredDuringSchedulingIgnoredDuringExecution",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.PodAntiAffinity",
          path: "requiredDuringSchedulingIgnoredDuringExecution",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.WeightedPodAffinityTerm",
          path: "podAffinityTerm",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).
 *
 * Child components:
 * - preference: {@link NodeSelectorTerm} (single element) */
NodeAffinity.PreferredSchedulingTerm = ({
  children,
  ...props
}: {
  /**
   * A node selector term, associated with the corresponding weight.
   */
  preference?: INodeSelectorTerm;
  /**
   * Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
   */
  weight: number | bigint;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PreferredSchedulingTerm"
      contexts={[
        {
          id: "io.k8s.api.core.v1.NodeAffinity",
          path: "preferredDuringSchedulingIgnoredDuringExecution",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.
 *
 * Child components:
 * - matchExpressions: {@link NodeSelectorRequirement} with 'matchExpression' flag
 * - matchFields: {@link NodeSelectorRequirement} with 'matchField' flag */
export const NodeSelectorTerm = ({
  children,
  ...props
}: {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.NodeSelectorTerm"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PreferredSchedulingTerm",
          path: "preference",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * PersistentVolumeSpec is the specification of a persistent volume.
 *
 * Child components:
 * - cephfs: {@link CephFSPersistentVolumeSource} (single element)
 * - cinder: {@link CinderPersistentVolumeSource} (single element)
 * - csi: {@link CSIPersistentVolumeSource} (single element)
 * - flexVolume: {@link FlexPersistentVolumeSource} (single element)
 * - iscsi: {@link ISCSIPersistentVolumeSource} (single element)
 * - nodeAffinity: {@link VolumeNodeAffinity} (single element)
 * - rbd: {@link RBDPersistentVolumeSource} (single element)
 * - scaleIO: {@link ScaleIOPersistentVolumeSource} (single element)
 * - storageos: {@link StorageOSPersistentVolumeSource} (single element) */
export const PersistentVolumeSpec = ({
  children,
  ...props
}: {
  /**
   * accessModes contains all ways the volume can be mounted. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
   */
  accessModes?: string[];
  /**
   * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
   */
  awsElasticBlockStore?: IAWSElasticBlockStoreVolumeSource;
  /**
   * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
   */
  azureDisk?: IAzureDiskVolumeSource;
  /**
   * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
   */
  azureFile?: IAzureFilePersistentVolumeSource;
  /**
   * capacity is the description of the persistent volume's resources and capacity. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
   */
  capacity?: Record<string, string>;
  /**
   * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
   */
  cephfs?: ICephFSPersistentVolumeSource;
  /**
   * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  cinder?: ICinderPersistentVolumeSource;
  /**
   * claimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim. Expected to be non-nil when bound. claim.VolumeName is the authoritative bind between PV and PVC. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
   */
  claimRef?: IObjectReference;
  /**
   * csi represents storage that is handled by an external CSI driver (Beta feature).
   */
  csi?: ICSIPersistentVolumeSource;
  /**
   * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
   */
  fc?: IFCVolumeSource;
  /**
   * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
   */
  flexVolume?: IFlexPersistentVolumeSource;
  /**
   * flocker represents a Flocker volume attached to a kubelet's host machine and exposed to the pod for its usage. This depends on the Flocker control service being running
   */
  flocker?: IFlockerVolumeSource;
  /**
   * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
   */
  gcePersistentDisk?: IGCEPersistentDiskVolumeSource;
  /**
   * glusterfs represents a Glusterfs volume that is attached to a host and exposed to the pod. Provisioned by an admin. More info: https://examples.k8s.io/volumes/glusterfs/README.md
   */
  glusterfs?: IGlusterfsPersistentVolumeSource;
  /**
   * hostPath represents a directory on the host. Provisioned by a developer or tester. This is useful for single-node development and testing only! On-host storage is not supported in any way and WILL NOT WORK in a multi-node cluster. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
   */
  hostPath?: IHostPathVolumeSource;
  /**
   * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin.
   */
  iscsi?: IISCSIPersistentVolumeSource;
  /**
   * local represents directly-attached storage with node affinity
   */
  local?: ILocalVolumeSource;
  /**
   * mountOptions is the list of mount options, e.g. ["ro", "soft"]. Not validated - mount will simply fail if one is invalid. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options
   */
  mountOptions?: string[];
  /**
   * nfs represents an NFS mount on the host. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
   */
  nfs?: INFSVolumeSource;
  /**
   * nodeAffinity defines constraints that limit what nodes this volume can be accessed from. This field influences the scheduling of pods that use this volume.
   */
  nodeAffinity?: IVolumeNodeAffinity;
  /**
   * persistentVolumeReclaimPolicy defines what happens to a persistent volume when released from its claim. Valid options are Retain (default for manually created PersistentVolumes), Delete (default for dynamically provisioned PersistentVolumes), and Recycle (deprecated). Recycle must be supported by the volume plugin underlying this PersistentVolume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
   */
  persistentVolumeReclaimPolicy?: string;
  /**
   * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
   */
  photonPersistentDisk?: IPhotonPersistentDiskVolumeSource;
  /**
   * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
   */
  portworxVolume?: IPortworxVolumeSource;
  /**
   * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
   */
  quobyte?: IQuobyteVolumeSource;
  /**
   * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
   */
  rbd?: IRBDPersistentVolumeSource;
  /**
   * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
   */
  scaleIO?: IScaleIOPersistentVolumeSource;
  /**
   * storageClassName is the name of StorageClass to which this persistent volume belongs. Empty value means that this volume does not belong to any StorageClass.
   */
  storageClassName?: string;
  /**
   * storageOS represents a StorageOS volume that is attached to the kubelet's host machine and mounted into the pod More info: https://examples.k8s.io/volumes/storageos/README.md
   */
  storageos?: IStorageOSPersistentVolumeSource;
  /**
   * volumeMode defines if a volume is intended to be used with a formatted filesystem or to remain in raw block state. Value of Filesystem is implied when not included in spec.
   */
  volumeMode?: string;
  /**
   * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
   */
  vsphereVolume?: IVsphereVirtualDiskVolumeSource;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PersistentVolumeSpec"
      contexts={[
        {
          id: "io.k8s.api.storage.v1.VolumeAttachmentSource",
          path: "inlineVolumeSpec",
          isItem: false,
        },
        {
          id: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSource",
          path: "inlineVolumeSpec",
          isItem: false,
        },
        {
          id: "io.k8s.api.storage.v1beta1.VolumeAttachmentSource",
          path: "inlineVolumeSpec",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling. */
export const CephFSPersistentVolumeSource = (props: {
  /**
   * monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
   */
  path?: string;
  /**
   * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretFile?: string;
  /**
   * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  secretRef?: ISecretReference;
  /**
   * user is Optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
   */
  user?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CephFSPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.cephfs",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "cephfs",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling. */
export const CinderPersistentVolumeSource = (props: {
  /**
   * fsType Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  fsType?: string;
  /**
   * secretRef is Optional: points to a secret object containing parameters used to connect to OpenStack.
   */
  secretRef?: ISecretReference;
  /**
   * volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
   */
  volumeID: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CinderPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.cinder",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "cinder",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Represents storage that is managed by an external CSI volume driver (Beta feature) */
export const CSIPersistentVolumeSource = (props: {
  /**
   * controllerExpandSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI ControllerExpandVolume call. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  controllerExpandSecretRef?: ISecretReference;
  /**
   * controllerPublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI ControllerPublishVolume and ControllerUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  controllerPublishSecretRef?: ISecretReference;
  /**
   * driver is the name of the driver to use for this volume. Required.
   */
  driver: string;
  /**
   * fsType to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs".
   */
  fsType?: string;
  /**
   * nodeExpandSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodeExpandVolume call. This is a beta field which is enabled default by CSINodeExpandSecret feature gate. This field is optional, may be omitted if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodeExpandSecretRef?: ISecretReference;
  /**
   * nodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodePublishSecretRef?: ISecretReference;
  /**
   * nodeStageSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodeStageVolume and NodeStageVolume and NodeUnstageVolume calls. This field is optional, and may be empty if no secret is required. If the secret object contains more than one secret, all secrets are passed.
   */
  nodeStageSecretRef?: ISecretReference;
  /**
   * volumeAttributes of the volume to publish.
   */
  volumeAttributes?: Record<string, string>;
  /**
   * volumeHandle is the unique volume name returned by the CSI volume plugin’s CreateVolume to refer to the volume on all subsequent calls. Required.
   */
  volumeHandle: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.CSIPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.csi",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "csi",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * FlexPersistentVolumeSource represents a generic persistent volume resource that is provisioned/attached using an exec based plugin. */
export const FlexPersistentVolumeSource = (props: {
  /**
   * driver is the name of the driver to use for this volume.
   */
  driver: string;
  /**
   * fsType is the Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
   */
  fsType?: string;
  /**
   * options is Optional: this field holds extra command options if any.
   */
  options?: Record<string, string>;
  /**
   * secretRef is Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
   */
  secretRef?: ISecretReference;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.FlexPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.flexVolume",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "flexVolume",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ISCSIPersistentVolumeSource represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling. */
export const ISCSIPersistentVolumeSource = (props: {
  /**
   * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
   */
  chapAuthDiscovery?: boolean;
  /**
   * chapAuthSession defines whether support iSCSI Session CHAP authentication
   */
  chapAuthSession?: boolean;
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
   */
  fsType?: string;
  /**
   * initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
   */
  initiatorName?: string;
  /**
   * iqn is Target iSCSI Qualified Name.
   */
  iqn: string;
  /**
   * iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
   */
  iscsiInterface?: string;
  /**
   * lun is iSCSI Target Lun number.
   */
  lun: number | bigint;
  /**
   * portals is the iSCSI Target Portal List. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  portals?: string[];
  /**
   * secretRef is the CHAP Secret for iSCSI target and initiator authentication
   */
  secretRef?: ISecretReference;
  /**
   * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
   */
  targetPortal: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ISCSIPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.iscsi",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "iscsi",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * VolumeNodeAffinity defines constraints that limit what nodes this volume can be accessed from.
 *
 * Child components:
 * - required.matchExpressions: {@link NodeSelectorRequirement} with 'matchExpression' flag
 * - required.matchFields: {@link NodeSelectorRequirement} with 'matchField' flag */
export const VolumeNodeAffinity = ({
  children,
  ...props
}: {
  /**
   * A list of node selector requirements by node's labels.
   */
  matchExpressions?: INodeSelectorRequirement[];
  /**
   * A list of node selector requirements by node's fields.
   */
  matchFields?: INodeSelectorRequirement[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "required",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.VolumeNodeAffinity"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.nodeAffinity",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "nodeAffinity",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling. */
export const RBDPersistentVolumeSource = (props: {
  /**
   * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
   */
  fsType?: string;
  /**
   * image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  image: string;
  /**
   * keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  keyring?: string;
  /**
   * monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  monitors: string[];
  /**
   * pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  pool?: string;
  /**
   * secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  secretRef?: ISecretReference;
  /**
   * user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
   */
  user?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.RBDPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.rbd",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "rbd",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ScaleIOPersistentVolumeSource represents a persistent ScaleIO volume */
export const ScaleIOPersistentVolumeSource = (props: {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs"
   */
  fsType?: string;
  /**
   * gateway is the host address of the ScaleIO API Gateway.
   */
  gateway: string;
  /**
   * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
   */
  protectionDomain?: string;
  /**
   * secretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
   */
  secretRef: ISecretReference;
  /**
   * sslEnabled is the flag to enable/disable SSL communication with Gateway, default false
   */
  sslEnabled?: boolean;
  /**
   * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
   */
  storageMode?: string;
  /**
   * storagePool is the ScaleIO Storage Pool associated with the protection domain.
   */
  storagePool?: string;
  /**
   * system is the name of the storage system as configured in ScaleIO.
   */
  system: string;
  /**
   * volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.
   */
  volumeName?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ScaleIOPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.scaleIO",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "scaleIO",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Represents a StorageOS persistent volume resource. */
export const StorageOSPersistentVolumeSource = (props: {
  /**
   * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
   */
  fsType?: string;
  /**
   * secretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.
   */
  secretRef?: IObjectReference;
  /**
   * volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.
   */
  volumeName?: string;
  /**
   * volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.
   */
  volumeNamespace?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.StorageOSPersistentVolumeSource"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PersistentVolume",
          path: "spec.storageos",
          isItem: false,
        },
        {
          id: "io.k8s.api.core.v1.PersistentVolumeSpec",
          path: "storageos",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future. */
export const TopologySelectorTerm = (props: {
  /**
   * The label key that the selector applies to.
   */
  key: string;
  /**
   * An array of string values. One value must match the label to be selected. Each entry in Values is ORed.
   */
  values: string[];
}) => {
  const { childProps } = useKubeProps(props, {
    key: "matchLabelExpressions",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.TopologySelectorTerm"
      contexts={[
        {
          id: "io.k8s.api.storage.v1.StorageClass",
          path: "allowedTopologies",
          isItem: true,
        },
        {
          id: "io.k8s.api.storage.v1beta1.StorageClass",
          path: "allowedTopologies",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ObjectReference contains enough information to let you inspect or modify the referred object. */
export const ObjectReference = (props: {
  /**
   * If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.
   */
  fieldPath?: string;
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name?: string;
  /**
   * Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
   */
  namespace?: string;
  /**
   * Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   */
  resourceVersion?: string;
  /**
   * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
   */
  uid?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ObjectReference"
      contexts={[
        {
          id: "io.k8s.api.batch.v1beta1.CronJobStatus",
          path: "active",
          isItem: true,
        },
        {
          id: "io.k8s.api.batch.v2alpha1.CronJobStatus",
          path: "active",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.ServiceAccount",
          path: "secrets",
          isItem: true,
        },
        {
          id: "io.k8s.api.batch.v1.CronJobStatus",
          path: "active",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ServicePort contains information on service's port. */
export const ServicePort = (props: {
  /**
   * The application protocol for this port. This field follows standard Kubernetes label syntax. Un-prefixed names are reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names). Non-standard protocols should use prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. When considering the endpoints for a Service, this must match the 'name' field in the EndpointPort. Optional if only one ServicePort is defined on this service.
   */
  name?: string;
  /**
   * The port on each node on which this service is exposed when type is NodePort or LoadBalancer.  Usually assigned by the system. If a value is specified, in-range, and not in use it will be used, otherwise the operation will fail.  If not specified, a port will be allocated if this Service requires one.  If this field is specified when creating a Service which does not need it, creation will fail. This field will be wiped when updating a Service to no longer need it (e.g. changing type from NodePort to ClusterIP). More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
   */
  nodePort?: number | bigint;
  /**
   * The port that will be exposed by this service.
   */
  port: number | bigint;
  /**
   * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
   */
  protocol?: string;
  /**
   * Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
   */
  targetPort?: IntOrString;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.ServicePort"
      contexts={[
        { id: "io.k8s.api.core.v1.Service", path: "spec.ports", isItem: true },
        { id: "io.k8s.api.core.v1.ServiceSpec", path: "ports", isItem: true },
      ]}
      value={childProps}
    />
  );
};

/** * PodSpec is a description of a pod.
 *
 * Child components:
 * - tolerations: {@link Toleration}
 * - affinity: {@link Affinity} (single element)
 * - dnsConfig: {@link PodDNSConfig} (single element)
 * - ephemeralContainers: {@link EphemeralContainer}
 * - hostAliases: {@link HostAlias}
 * - imagePullSecrets: {@link LocalObjectReference}
 * - readinessGates: {@link PodReadinessGate}
 * - resourceClaims: {@link PodResourceClaim}
 * - schedulingGates: {@link PodSchedulingGate}
 * - securityContext: {@link PodSecurityContext} (single element)
 * - topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - volumes: {@link Volume}
 * - containers: {@link Container} with 'container' flag
 * - initContainers: {@link Container} with 'init' flag */
export const PodSpec = ({
  children,
  ...props
}: {
  /**
   * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * If specified, the pod's scheduling constraints
   */
  affinity?: IAffinity;
  /**
   * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
   */
  automountServiceAccountToken?: boolean;
  /**
   * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
   */
  containers?: IContainer[];
  /**
   * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
   */
  dnsConfig?: IPodDNSConfig;
  /**
   * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
   */
  dnsPolicy?: string;
  /**
   * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
   */
  enableServiceLinks?: boolean;
  /**
   * List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource.
   */
  ephemeralContainers?: IEphemeralContainer[];
  /**
   * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
   */
  hostAliases?: IHostAlias[];
  /**
   * Use the host's ipc namespace. Optional: Default to false.
   */
  hostIPC?: boolean;
  /**
   * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
   */
  hostNetwork?: boolean;
  /**
   * Use the host's pid namespace. Optional: Default to false.
   */
  hostPID?: boolean;
  /**
   * Use the host's user namespace. Optional: Default to true. If set to true or not present, the pod will be run in the host user namespace, useful for when the pod needs a feature only available to the host user namespace, such as loading a kernel module with CAP_SYS_MODULE. When set to false, a new userns is created for the pod. Setting false is useful for mitigating container breakout vulnerabilities even allowing users to run their containers as root without actually having root privileges on the host. This field is alpha-level and is only honored by servers that enable the UserNamespacesSupport feature.
   */
  hostUsers?: boolean;
  /**
   * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
   */
  hostname?: string;
  /**
   * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
   */
  imagePullSecrets?: ILocalObjectReference[];
  /**
   * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
   */
  initContainers?: IContainer[];
  /**
   * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
   */
  nodeName?: string;
  /**
   * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
   */
  nodeSelector?: Record<string, string>;
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md
   */
  overhead?: Record<string, string>;
  /**
   * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
   */
  preemptionPolicy?: string;
  /**
   * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
   */
  priority?: number | bigint;
  /**
   * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
   */
  priorityClassName?: string;
  /**
   * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates
   */
  readinessGates?: IPodReadinessGate[];
  /**
   * ResourceClaims defines which ResourceClaims must be allocated and reserved before the Pod is allowed to start. The resources will be made available to those containers which consume them by name.
   *
   * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
   *
   * This field is immutable.
   */
  resourceClaims?: IPodResourceClaim[];
  /**
   * Restart policy for all containers within the pod. One of Always, OnFailure, Never. In some contexts, only a subset of those values may be permitted. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
   */
  restartPolicy?: string;
  /**
   * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class
   */
  runtimeClassName?: string;
  /**
   * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
   */
  schedulerName?: string;
  /**
   * SchedulingGates is an opaque list of values that if specified will block scheduling the pod. If schedulingGates is not empty, the pod will stay in the SchedulingGated state and the scheduler will not attempt to schedule the pod.
   *
   * SchedulingGates can only be set at pod creation time, and be removed only afterwards.
   *
   * This is a beta feature enabled by the PodSchedulingReadiness feature gate.
   */
  schedulingGates?: IPodSchedulingGate[];
  /**
   * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
   */
  securityContext?: IPodSecurityContext;
  /**
   * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
   */
  serviceAccount?: string;
  /**
   * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
   */
  serviceAccountName?: string;
  /**
   * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.
   */
  setHostnameAsFQDN?: boolean;
  /**
   * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.
   */
  shareProcessNamespace?: boolean;
  /**
   * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
   */
  subdomain?: string;
  /**
   * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
   */
  terminationGracePeriodSeconds?: number | bigint;
  /**
   * If specified, the pod's tolerations.
   */
  tolerations?: IToleration[];
  /**
   * TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.
   */
  topologySpreadConstraints?: ITopologySpreadConstraint[];
  /**
   * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
   */
  volumes?: IVolume[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.PodSpec"
      contexts={[
        {
          id: "io.k8s.api.core.v1.PodTemplate",
          path: "template.spec",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * The node this Taint is attached to has the "effect" on any pod that does not tolerate the Taint. */
export const Taint = (props: {
  /**
   * Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect: string;
  /**
   * Required. The taint key to be applied to a node.
   */
  key: string;
  /**
   * TimeAdded represents the time at which the taint was added. It is only written for NoExecute taints.
   */
  timeAdded?: Time;
  /**
   * The taint value corresponding to the taint key.
   */
  value?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.Taint"
      contexts={[
        { id: "io.k8s.api.core.v1.Node", path: "spec.taints", isItem: true },
        { id: "io.k8s.api.core.v1.NodeSpec", path: "taints", isItem: true },
      ]}
      value={childProps}
    />
  );
};

/** * LimitRangeItem defines a min/max usage limit for any resource that matches on kind. */
LimitRange.LimitRangeItem = (props: {
  /**
   * Default resource requirement limit value by resource name if resource limit is omitted.
   */
  default?: Record<string, string>;
  /**
   * DefaultRequest is the default resource requirement request value by resource name if resource request is omitted.
   */
  defaultRequest?: Record<string, string>;
  /**
   * Max usage constraints on this kind by resource name.
   */
  max?: Record<string, string>;
  /**
   * MaxLimitRequestRatio if specified, the named resource must have a request and limit that are both non-zero where limit divided by request is less than or equal to the enumerated value; this represents the max burst for the named resource.
   */
  maxLimitRequestRatio?: Record<string, string>;
  /**
   * Min usage constraints on this kind by resource name.
   */
  min?: Record<string, string>;
  /**
   * Type of resource that this limit applies to.
   */
  type: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.LimitRangeItem"
      contexts={[
        {
          id: "io.k8s.api.core.v1.LimitRange",
          path: "spec.limits",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * EndpointPort is a tuple that describes a single port. */
export const EndpointPort = (props: {
  /**
   * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:
   *
   * * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).
   *
   * * Kubernetes-defined prefixed names:
   * * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540
   *
   * * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * The name of this port.  This must match the 'name' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.
   */
  name?: string;
  /**
   * The port number of the endpoint.
   */
  port: number | bigint;
  /**
   * The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
   */
  protocol?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.core.v1.EndpointPort"
      contexts={[
        {
          id: "io.k8s.api.core.v1.EndpointSubset",
          path: "ports",
          isItem: true,
        },
        {
          id: "io.k8s.api.core.v1.Endpoints",
          path: "subsets.ports",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * EndpointAddress is a tuple that describes single IP address. */
export const EndpointAddress = (
  props: {
    /**
     * The Hostname of this endpoint
     */
    hostname?: string;
    /**
     * The IP of this endpoint. May not be loopback (127.0.0.0/8 or ::1), link-local (169.254.0.0/16 or fe80::/10), or link-local multicast (224.0.0.0/24 or ff02::/16).
     */
    ip: string;
    /**
     * Optional: Node hosting this endpoint. This can be used to determine endpoints local to a node.
     */
    nodeName?: string;
    /**
     * Reference to object providing the endpoint.
     */
    targetRef?: IObjectReference;
  } & ({ address?: boolean } | { notReady?: boolean })
) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["address", "notReady"],
    defaultFlag: "address",
  });
  return (
    <Item
      id="io.k8s.api.core.v1.EndpointAddress"
      contexts={[
        {
          id: "io.k8s.api.core.v1.EndpointSubset",
          path: "addresses",
          isItem: true,
          flag: "address",
        },
        {
          id: "io.k8s.api.core.v1.EndpointSubset",
          path: "notReadyAddresses",
          isItem: true,
          flag: "notReady",
        },
        {
          id: "io.k8s.api.core.v1.Endpoints",
          path: "subsets.addresses",
          isItem: true,
          flag: "address",
        },
        {
          id: "io.k8s.api.core.v1.Endpoints",
          path: "subsets.notReadyAddresses",
          isItem: true,
          flag: "notReady",
        },
      ]}
      value={childProps}
      flag={flag}
    />
  );
};
