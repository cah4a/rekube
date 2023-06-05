import { IDeleteOptions, IOwnerReference, ILabelSelector } from "meta/v1";
import { Resource, useResourceProps, Item } from "rekube";
import { ISELinuxOptions } from "core/v1";

/**
 * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used.
 */
export interface IAllowedCSIDriver {
  /**
   * Name is the registered name of the CSI driver
   */
  name: string;
}

/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used.
 */
export interface IAllowedFlexVolume {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string;
}

/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined.
 */
export interface IAllowedHostPath {
  /**
   * pathPrefix is the path prefix that the host volume must match. It does not support `*`. Trailing slashes are trimmed when validating the path prefix with a host path.
   *
   * Examples: `/foo` would allow `/foo`, `/foo/` and `/foo/bar` `/foo` would not allow `/food` or `/etc/foo`
   */
  pathPrefix?: string;
}

/**
 * FSGroupStrategyOptions defines the strategy type and options used to create the strategy.
 */
export interface IFSGroupStrategyOptions {
  /**
   * ranges are the allowed ranges of fs groups.  If you would like to force a single fs group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate what FSGroup is used in the SecurityContext.
   */
  rule?: string;
}

/**
 * IDRange provides a min/max of an allowed range of IDs.
 */
export interface IIDRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number;
  /**
   * min is the start of the range, inclusive.
   */
  min: number;
}

/**
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined.
 */
export interface IHostPortRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number;
  /**
   * min is the start of the range, inclusive.
   */
  min: number;
}

/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface IRunAsGroupStrategyOptions {
  /**
   * ranges are the allowed ranges of gids that may be used. If you would like to force a single gid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate the allowable RunAsGroup values that may be set.
   */
  rule: string;
}

/**
 * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface IRunAsUserStrategyOptions {
  /**
   * ranges are the allowed ranges of uids that may be used. If you would like to force a single uid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate the allowable RunAsUser values that may be set.
   */
  rule: string;
}

/**
 * RuntimeClassStrategyOptions define the strategy that will dictate the allowable RuntimeClasses for a pod.
 */
export interface IRuntimeClassStrategyOptions {
  /**
   * allowedRuntimeClassNames is an allowlist of RuntimeClass names that may be specified on a pod. A value of "*" means that any RuntimeClass name is allowed, and must be the only item in the list. An empty list requires the RuntimeClassName field to be unset.
   */
  allowedRuntimeClassNames: string[];
  /**
   * defaultRuntimeClassName is the default RuntimeClassName to set on the pod. The default MUST be allowed by the allowedRuntimeClassNames list. A value of nil does not mutate the Pod.
   */
  defaultRuntimeClassName?: string;
}

/**
 * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface ISELinuxStrategyOptions {
  /**
   * rule is the strategy that will dictate the allowable labels that may be set.
   */
  rule: string;
  /**
   * seLinuxOptions required to run as; required for MustRunAs More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
   */
  seLinuxOptions?: ISELinuxOptions;
}

/**
 * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy.
 */
export interface ISupplementalGroupsStrategyOptions {
  /**
   * ranges are the allowed ranges of supplemental groups.  If you would like to force a single supplemental group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate what supplemental groups is used in the SecurityContext.
   */
  rule?: string;
}

/**
 * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions.
 */
export function Eviction(props: {
  /**
   * DeleteOptions may be provided
   */
  deleteOptions?: IDeleteOptions;
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
   */
  "meta:annotations"?: object;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   */
  "meta:finalizers"?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  "meta:generateName"?: string;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
   */
  "meta:labels"?: object;
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  "meta:name"?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
   */
  "meta:namespace"?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   */
  "meta:ownerReferences"?: IOwnerReference[];
}) {
  return (
    <Resource
      kind="Eviction"
      apiVersion="policy/v1beta1"
      id="io.k8s.api.policy.v1beta1.Eviction"
      props={props}
    />
  );
}

/**
 * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 *
 * Child components:
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 */
export function PodDisruptionBudget({
  children,
  ...props
}: {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
   */
  "meta:annotations"?: object;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   */
  "meta:finalizers"?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  "meta:generateName"?: string;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
   */
  "meta:labels"?: object;
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  "meta:name"?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
   */
  "meta:namespace"?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   */
  "meta:ownerReferences"?: IOwnerReference[];
  maxUnavailable?: number | string;
  minAvailable?: number | string;
  /**
   * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
   */
  selector?: ILabelSelector;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="PodDisruptionBudget"
      apiVersion="policy/v1beta1"
      id="io.k8s.api.policy.v1beta1.PodDisruptionBudget"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated in 1.21.
 *
 * Child components:
 * - spec.allowedCSIDrivers: {@link AllowedCSIDriver}
 * - spec.allowedFlexVolumes: {@link AllowedFlexVolume}
 * - spec.allowedHostPaths: {@link AllowedHostPath}
 * - spec.fsGroup.ranges: {@link IDRange}
 * - spec.hostPorts: {@link HostPortRange}
 * - spec.runAsGroup.ranges: {@link IDRange}
 * - spec.runAsUser.ranges: {@link IDRange}
 * - spec.supplementalGroups.ranges: {@link IDRange}
 */
export function PodSecurityPolicy({
  children,
  ...props
}: {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
   */
  "meta:annotations"?: object;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   */
  "meta:finalizers"?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  "meta:generateName"?: string;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
   */
  "meta:labels"?: object;
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  "meta:name"?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
   */
  "meta:namespace"?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   */
  "meta:ownerReferences"?: IOwnerReference[];
  /**
   * allowPrivilegeEscalation determines if a pod can request to allow privilege escalation. If unspecified, defaults to true.
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * AllowedCSIDrivers is an allowlist of inline CSI drivers that must be explicitly set to be embedded within a pod spec. An empty value indicates that any CSI driver can be used for inline ephemeral volumes. This is a beta field, and is only honored if the API server enables the CSIInlineVolume feature gate.
   */
  allowedCSIDrivers?: IAllowedCSIDriver[];
  /**
   * allowedCapabilities is a list of capabilities that can be requested to add to the container. Capabilities in this field may be added at the pod author's discretion. You must not list a capability in both allowedCapabilities and requiredDropCapabilities.
   */
  allowedCapabilities?: string[];
  /**
   * allowedFlexVolumes is an allowlist of Flexvolumes.  Empty or nil indicates that all Flexvolumes may be used.  This parameter is effective only when the usage of the Flexvolumes is allowed in the "volumes" field.
   */
  allowedFlexVolumes?: IAllowedFlexVolume[];
  /**
   * allowedHostPaths is an allowlist of host paths. Empty indicates that all host paths may be used.
   */
  allowedHostPaths?: IAllowedHostPath[];
  /**
   * AllowedProcMountTypes is an allowlist of allowed ProcMountTypes. Empty or nil indicates that only the DefaultProcMountType may be used. This requires the ProcMountType feature flag to be enabled.
   */
  allowedProcMountTypes?: string[];
  /**
   * allowedUnsafeSysctls is a list of explicitly allowed unsafe sysctls, defaults to none. Each entry is either a plain sysctl name or ends in "*" in which case it is considered as a prefix of allowed sysctls. Single * means all unsafe sysctls are allowed. Kubelet has to allowlist all allowed unsafe sysctls explicitly to avoid rejection.
   *
   * Examples: e.g. "foo/*" allows "foo/bar", "foo/baz", etc. e.g. "foo.*" allows "foo.bar", "foo.baz", etc.
   */
  allowedUnsafeSysctls?: string[];
  /**
   * defaultAddCapabilities is the default set of capabilities that will be added to the container unless the pod spec specifically drops the capability.  You may not list a capability in both defaultAddCapabilities and requiredDropCapabilities. Capabilities added here are implicitly allowed, and need not be included in the allowedCapabilities list.
   */
  defaultAddCapabilities?: string[];
  /**
   * defaultAllowPrivilegeEscalation controls the default setting for whether a process can gain more privileges than its parent process.
   */
  defaultAllowPrivilegeEscalation?: boolean;
  /**
   * forbiddenSysctls is a list of explicitly forbidden sysctls, defaults to none. Each entry is either a plain sysctl name or ends in "*" in which case it is considered as a prefix of forbidden sysctls. Single * means all sysctls are forbidden.
   *
   * Examples: e.g. "foo/*" forbids "foo/bar", "foo/baz", etc. e.g. "foo.*" forbids "foo.bar", "foo.baz", etc.
   */
  forbiddenSysctls?: string[];
  /**
   * fsGroup is the strategy that will dictate what fs group is used by the SecurityContext.
   */
  fsGroup: IFSGroupStrategyOptions;
  /**
   * hostIPC determines if the policy allows the use of HostIPC in the pod spec.
   */
  hostIPC?: boolean;
  /**
   * hostNetwork determines if the policy allows the use of HostNetwork in the pod spec.
   */
  hostNetwork?: boolean;
  /**
   * hostPID determines if the policy allows the use of HostPID in the pod spec.
   */
  hostPID?: boolean;
  /**
   * hostPorts determines which host port ranges are allowed to be exposed.
   */
  hostPorts?: IHostPortRange[];
  /**
   * privileged determines if a pod can request to be run as privileged.
   */
  privileged?: boolean;
  /**
   * requiredDropCapabilities are the capabilities that will be dropped from the container.  These are required to be dropped and cannot be added.
   */
  requiredDropCapabilities?: string[];
  /**
   * RunAsGroup is the strategy that will dictate the allowable RunAsGroup values that may be set. If this field is omitted, the pod's RunAsGroup can take any value. This field requires the RunAsGroup feature gate to be enabled.
   */
  runAsGroup?: IRunAsGroupStrategyOptions;
  /**
   * runAsUser is the strategy that will dictate the allowable RunAsUser values that may be set.
   */
  runAsUser: IRunAsUserStrategyOptions;
  /**
   * runtimeClass is the strategy that will dictate the allowable RuntimeClasses for a pod. If this field is omitted, the pod's runtimeClassName field is unrestricted. Enforcement of this field depends on the RuntimeClass feature gate being enabled.
   */
  runtimeClass?: IRuntimeClassStrategyOptions;
  /**
   * seLinux is the strategy that will dictate the allowable labels that may be set.
   */
  seLinux: ISELinuxStrategyOptions;
  /**
   * supplementalGroups is the strategy that will dictate what supplemental groups are used by the SecurityContext.
   */
  supplementalGroups: ISupplementalGroupsStrategyOptions;
  /**
   * volumes is an allowlist of volume plugins. Empty indicates that no volumes may be used. To allow all volumes you may use '*'.
   */
  volumes?: string[];
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="PodSecurityPolicy"
      apiVersion="policy/v1beta1"
      id="io.k8s.api.policy.v1beta1.PodSecurityPolicy"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used.
 */
export function AllowedCSIDriver(props: {
  /**
   * Name is the registered name of the CSI driver
   */
  name: string;
}) {
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedCSIDriver"
      paths={{
        "io.k8s.api.policy.v1beta1.PodSecurityPolicy": "spec.allowedCSIDrivers",
      }}
      value={props}
    />
  );
}

/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used.
 */
export function AllowedFlexVolume(props: {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string;
}) {
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedFlexVolume"
      paths={{
        "io.k8s.api.policy.v1beta1.PodSecurityPolicy":
          "spec.allowedFlexVolumes",
      }}
      value={props}
    />
  );
}

/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined.
 */
export function AllowedHostPath(props: {
  /**
   * pathPrefix is the path prefix that the host volume must match. It does not support `*`. Trailing slashes are trimmed when validating the path prefix with a host path.
   *
   * Examples: `/foo` would allow `/foo`, `/foo/` and `/foo/bar` `/foo` would not allow `/food` or `/etc/foo`
   */
  pathPrefix?: string;
}) {
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedHostPath"
      paths={{
        "io.k8s.api.policy.v1beta1.PodSecurityPolicy": "spec.allowedHostPaths",
      }}
      value={props}
    />
  );
}

/**
 * IDRange provides a min/max of an allowed range of IDs.
 */
export function IDRange(props: {
  /**
   * max is the end of the range, inclusive.
   */
  max: number;
  /**
   * min is the start of the range, inclusive.
   */
  min: number;
}) {
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.IDRange"
      paths={{
        "io.k8s.api.policy.v1beta1.PodSecurityPolicy": "spec.fsGroup.ranges",
      }}
      value={props}
    />
  );
}

/**
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined.
 */
export function HostPortRange(props: {
  /**
   * max is the end of the range, inclusive.
   */
  max: number;
  /**
   * min is the start of the range, inclusive.
   */
  min: number;
}) {
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.HostPortRange"
      paths={{
        "io.k8s.api.policy.v1beta1.PodSecurityPolicy": "spec.hostPorts",
      }}
      value={props}
    />
  );
}
