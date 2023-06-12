import { ISELinuxOptions } from "core/v1";
import { IObjectMeta, IPreconditions, ILabelSelector } from "meta/v1";
import { useKubeProps, Resource, IntOrString, Item } from "rekube";

/**
 * IDRange provides a min/max of an allowed range of IDs.
 */
export interface IIDRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number | bigint;
  /**
   * min is the start of the range, inclusive.
   */
  min: number | bigint;
}

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
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined.
 */
export interface IHostPortRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number | bigint;
  /**
   * min is the start of the range, inclusive.
   */
  min: number | bigint;
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

/** * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions. */
export const Eviction = (
  props: {
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     */
    dryRun?: string[];
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     */
    gracePeriodSeconds?: number | bigint;
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the "orphan" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
     */
    orphanDependents?: boolean;
    /**
     * Must be fulfilled before a deletion is carried out. If not possible, a 409 Conflict status will be returned.
     */
    preconditions?: IPreconditions;
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: 'Orphan' - orphan the dependents; 'Background' - allow the garbage collector to delete the dependents in the background; 'Foreground' - a cascading policy that deletes all dependents in the foreground.
     */
    propagationPolicy?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "deleteOptions",
  });
  return (
    <Resource
      id="io.k8s.api.policy.v1beta1.Eviction"
      kind="Eviction"
      apiVersion="policy/v1beta1"
      props={childProps}
    />
  );
};

/** * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element) */
export const PodDisruptionBudget = ({
  children,
  ...props
}: {
  /**
   * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
   */
  maxUnavailable?: IntOrString;
  /**
   * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
   */
  minAvailable?: IntOrString;
  /**
   * Label query over pods whose evictions are managed by the disruption budget. A null selector selects no pods. An empty selector ({}) also selects no pods, which differs from standard behavior of selecting all pods. In policy/v1, an empty selector will select all pods in the namespace.
   */
  selector?: ILabelSelector;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.policy.v1beta1.PodDisruptionBudget"
      kind="PodDisruptionBudget"
      apiVersion="policy/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated in 1.21.
 *
 * Child components:
 * - spec.allowedCSIDrivers: {@link AllowedCSIDriver}
 * - spec.allowedFlexVolumes: {@link AllowedFlexVolume}
 * - spec.allowedHostPaths: {@link AllowedHostPath}
 * - spec.fsGroup: {@link FSGroupStrategyOptions} (single element)
 * - spec.hostPorts: {@link HostPortRange}
 * - spec.runAsGroup: {@link RunAsGroupStrategyOptions} (single element)
 * - spec.runAsUser: {@link RunAsUserStrategyOptions} (single element)
 * - spec.seLinux: {@link SELinuxStrategyOptions} (single element)
 * - spec.supplementalGroups: {@link SupplementalGroupsStrategyOptions} (single element) */
export const PodSecurityPolicy = ({
  children,
  ...props
}: {
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
  fsGroup?: IFSGroupStrategyOptions;
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
  runAsUser?: IRunAsUserStrategyOptions;
  /**
   * runtimeClass is the strategy that will dictate the allowable RuntimeClasses for a pod. If this field is omitted, the pod's runtimeClassName field is unrestricted. Enforcement of this field depends on the RuntimeClass feature gate being enabled.
   */
  runtimeClass?: IRuntimeClassStrategyOptions;
  /**
   * seLinux is the strategy that will dictate the allowable labels that may be set.
   */
  seLinux?: ISELinuxStrategyOptions;
  /**
   * supplementalGroups is the strategy that will dictate what supplemental groups are used by the SecurityContext.
   */
  supplementalGroups?: ISupplementalGroupsStrategyOptions;
  /**
   * volumes is an allowlist of volume plugins. Empty indicates that no volumes may be used. To allow all volumes you may use '*'.
   */
  volumes?: string[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.policy.v1beta1.PodSecurityPolicy"
      kind="PodSecurityPolicy"
      apiVersion="policy/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used. */
export const AllowedCSIDriver = (props: {
  /**
   * Name is the registered name of the CSI driver
   */
  name: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedCSIDriver"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.allowedCSIDrivers",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "allowedCSIDrivers",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. */
export const AllowedFlexVolume = (props: {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedFlexVolume"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.allowedFlexVolumes",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "allowedFlexVolumes",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined. */
export const AllowedHostPath = (props: {
  /**
   * pathPrefix is the path prefix that the host volume must match. It does not support `*`. Trailing slashes are trimmed when validating the path prefix with a host path.
   *
   * Examples: `/foo` would allow `/foo`, `/foo/` and `/foo/bar` `/foo` would not allow `/food` or `/etc/foo`
   */
  pathPrefix?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.AllowedHostPath"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.allowedHostPaths",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "allowedHostPaths",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * FSGroupStrategyOptions defines the strategy type and options used to create the strategy.
 *
 * Child components:
 * - ranges: {@link IDRange} */
export const FSGroupStrategyOptions = ({
  children,
  ...props
}: {
  /**
   * ranges are the allowed ranges of fs groups.  If you would like to force a single fs group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate what FSGroup is used in the SecurityContext.
   */
  rule?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.FSGroupStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.fsGroup",
          isItem: false,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "fsGroup",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. */
export const HostPortRange = (props: {
  /**
   * max is the end of the range, inclusive.
   */
  max: number | bigint;
  /**
   * min is the start of the range, inclusive.
   */
  min: number | bigint;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.HostPortRange"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.hostPorts",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "hostPorts",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy.
 *
 * Child components:
 * - ranges: {@link IDRange} */
export const RunAsGroupStrategyOptions = ({
  children,
  ...props
}: {
  /**
   * ranges are the allowed ranges of gids that may be used. If you would like to force a single gid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate the allowable RunAsGroup values that may be set.
   */
  rule: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.runAsGroup",
          isItem: false,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "runAsGroup",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy.
 *
 * Child components:
 * - ranges: {@link IDRange} */
export const RunAsUserStrategyOptions = ({
  children,
  ...props
}: {
  /**
   * ranges are the allowed ranges of uids that may be used. If you would like to force a single uid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate the allowable RunAsUser values that may be set.
   */
  rule: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.runAsUser",
          isItem: false,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "runAsUser",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy. */
export const SELinuxStrategyOptions = (props: {
  /**
   * rule is the strategy that will dictate the allowable labels that may be set.
   */
  rule: string;
  /**
   * seLinuxOptions required to run as; required for MustRunAs More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
   */
  seLinuxOptions?: ISELinuxOptions;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.SELinuxStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.seLinux",
          isItem: false,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "seLinux",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy.
 *
 * Child components:
 * - ranges: {@link IDRange} */
export const SupplementalGroupsStrategyOptions = ({
  children,
  ...props
}: {
  /**
   * ranges are the allowed ranges of supplemental groups.  If you would like to force a single supplemental group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: IIDRange[];
  /**
   * rule is the strategy that will dictate what supplemental groups is used in the SecurityContext.
   */
  rule?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
          path: "spec.supplementalGroups",
          isItem: false,
        },
        {
          id: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
          path: "supplementalGroups",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * IDRange provides a min/max of an allowed range of IDs. */
export const IDRange = (props: {
  /**
   * max is the end of the range, inclusive.
   */
  max: number | bigint;
  /**
   * min is the start of the range, inclusive.
   */
  min: number | bigint;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.policy.v1beta1.IDRange"
      contexts={[
        {
          id: "io.k8s.api.policy.v1beta1.FSGroupStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions",
          path: "ranges",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
