import { IntOrString, useKubeProps, Resource, Item } from "rekube";
import {
  ITypedLocalObjectReference,
  ISELinuxOptions,
  IPodTemplateSpec,
} from "core/v1";
import { ILabelSelector, IObjectMeta } from "meta/v1";

/**
 * Spec to control the desired behavior of daemon set rolling update.
 */
export interface IRollingUpdateDaemonSet {
  /**
   * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0. Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
   */
  maxUnavailable?: IntOrString;
}

/**
 * Spec to control the desired behavior of rolling update.
 */
export interface IRollingUpdateDeployment {
  /**
   * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. By default, a value of 1 is used. Example: when this is set to 30%, the new RC can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new RC can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
   */
  maxSurge?: IntOrString;
  /**
   * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. By default, a fixed value of 1 is used. Example: when this is set to 30%, the old RC can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old RC can be scaled down further, followed by scaling up the new RC, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
   */
  maxUnavailable?: IntOrString;
}

/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface IIngressBackend {
  /**
   * Resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, serviceName and servicePort must not be specified.
   */
  resource?: ITypedLocalObjectReference;
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: string;
  /**
   * Specifies the port of the referenced service.
   */
  servicePort?: IntOrString;
}

/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export interface IHTTPIngressRuleValue {
  /**
   * Backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * Path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/'. When unspecified, all paths from incoming requests are matched.
   */
  path?: string;
  /**
   * PathType determines the interpretation of the Path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types. Defaults to ImplementationSpecific.
   */
  pathType?: string;
}

/**
 * DEPRECATED 1.9 - This group version of IPBlock is deprecated by networking/v1/IPBlock. IPBlock describes a particular CIDR (Ex. "192.168.1.1/24") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
 */
export interface IIPBlock {
  /**
   * CIDR is a string representing the IP Block Valid examples are "192.168.1.1/24"
   */
  cidr: string;
  /**
   * Except is a slice of CIDRs that should not be included within an IP Block Valid examples are "192.168.1.1/24" Except values will be rejected if they are outside the CIDR range
   */
  except?: string[];
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPeer is deprecated by networking/v1/NetworkPolicyPeer.
 */
export interface INetworkPolicyPeer {
  /**
   * IPBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
   */
  ipBlock?: IIPBlock;
  /**
   * Selects Namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
   *
   * If PodSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects all Pods in the Namespaces selected by NamespaceSelector.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * This is a label selector which selects Pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
   *
   * If NamespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the Pods matching PodSelector in the policy's own Namespace.
   */
  podSelector?: ILabelSelector;
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPort is deprecated by networking/v1/NetworkPolicyPort.
 */
export interface INetworkPolicyPort {
  /**
   * If specified, the port on the given protocol.  This can either be a numerical or named port on a pod.  If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
   */
  port?: IntOrString;
  /**
   * Optional.  The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
   */
  protocol?: string;
}

/**
 * IDRange provides a min/max of an allowed range of IDs. Deprecated: use IDRange from policy API Group instead.
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
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. Deprecated: use AllowedFlexVolume from policy API Group instead.
 */
export interface IAllowedFlexVolume {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string;
}

/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined. Deprecated: use AllowedHostPath from policy API Group instead.
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
 * FSGroupStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use FSGroupStrategyOptions from policy API Group instead.
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
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. Deprecated: use HostPortRange from policy API Group instead.
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
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsGroupStrategyOptions from policy API Group instead.
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
 * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsUserStrategyOptions from policy API Group instead.
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
   * allowedRuntimeClassNames is a whitelist of RuntimeClass names that may be specified on a pod. A value of "*" means that any RuntimeClass name is allowed, and must be the only item in the list. An empty list requires the RuntimeClassName field to be unset.
   */
  allowedRuntimeClassNames: string[];
  /**
   * defaultRuntimeClassName is the default RuntimeClassName to set on the pod. The default MUST be allowed by the allowedRuntimeClassNames list. A value of nil does not mutate the Pod.
   */
  defaultRuntimeClassName?: string;
}

/**
 * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use SELinuxStrategyOptions from policy API Group instead.
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
 * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use SupplementalGroupsStrategyOptions from policy API Group instead.
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
 * DEPRECATED 1.9 - This group version of NetworkPolicyEgressRule is deprecated by networking/v1/NetworkPolicyEgressRule. NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8
 */
export interface INetworkPolicyEgressRule {
  /**
   * List of destination ports for outgoing traffic. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  /**
   * List of destinations for outgoing traffic of pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all destinations (traffic not restricted by destination). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the to list.
   */
  to?: INetworkPolicyPeer[];
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyIngressRule is deprecated by networking/v1/NetworkPolicyIngressRule. This NetworkPolicyIngressRule matches traffic if and only if the traffic matches both ports AND from.
 */
export interface INetworkPolicyIngressRule {
  /**
   * List of sources which should be able to access the pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all sources (traffic not restricted by source). If this field is present and contains at least on item, this rule allows traffic only if the traffic matches at least one item in the from list.
   */
  from?: INetworkPolicyPeer[];
  /**
   * List of ports which should be made accessible on the pods selected for this rule. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
}

/**
 * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 */
export interface IIngressRule {
  /**
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * Host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If Host is precise, the request matches this rule if the http host header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
}

/**
 * IngressTLS describes the transport layer security associated with an Ingress.
 */
export interface IIngressTLS {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * SecretName is the name of the secret used to terminate SSL traffic on 443. Field is left optional to allow SSL routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.
   */
  secretName?: string;
}

/**
 * DEPRECATED.
 */
export interface IRollbackConfig {
  /**
   * The revision to rollback to. If set to 0, rollback to the last revision.
   */
  revision?: number | bigint;
}

/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export interface IDeploymentStrategy {
  /**
   * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
   */
  rollingUpdate?: IRollingUpdateDeployment;
  /**
   * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
   */
  type?: string;
}

export interface IDaemonSetUpdateStrategy {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: IRollingUpdateDaemonSet;
  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is OnDelete.
   */
  type?: string;
}

/** * DEPRECATED - This group version of DaemonSet is deprecated by apps/v1beta2/DaemonSet. See the release notes for more information. DaemonSet represents the configuration of a daemon set.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element)
 * - spec.updateStrategy: {@link DaemonSetUpdateStrategy} (single element) */
export const DaemonSet = ({
  children,
  ...props
}: {
  /**
   * The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).
   */
  minReadySeconds?: number | bigint;
  /**
   * The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * A label query over pods that are managed by the daemon set. Must match in order to be controlled. If empty, defaulted to labels on Pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  /**
   * DEPRECATED. A sequence number representing a specific generation of the template. Populated by the system. It can be set only during the creation.
   */
  templateGeneration?: number | bigint;
  /**
   * An update strategy to replace existing DaemonSet pods with new pods.
   */
  updateStrategy?: IDaemonSetUpdateStrategy;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.DaemonSet"
      kind="DaemonSet"
      apiVersion="extensions/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED - This group version of Deployment is deprecated by apps/v1beta2/Deployment. See the release notes for more information. Deployment enables declarative updates for Pods and ReplicaSets.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element)
 * - spec.strategy: {@link DeploymentStrategy} (single element) */
export const Deployment = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * Indicates that the deployment is paused and will not be processed by the deployment controller.
   */
  paused?: boolean;
  /**
   * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. This is set to the max value of int32 (i.e. 2147483647) by default, which means "no deadline".
   */
  progressDeadlineSeconds?: number | bigint;
  /**
   * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   */
  replicas?: number | bigint;
  /**
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. This is set to the max value of int32 (i.e. 2147483647) by default, which means "retaining all old RelicaSets".
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * DEPRECATED. The config this deployment is rolling back to. Will be cleared after rollback is done.
   */
  rollbackTo?: IRollbackConfig;
  /**
   * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment.
   */
  selector?: ILabelSelector;
  /**
   * The deployment strategy to use to replace existing pods with new ones.
   */
  strategy?: IDeploymentStrategy;
  /**
   * Template describes the pods that will be created.
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.Deployment"
      kind="Deployment"
      apiVersion="extensions/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED. DeploymentRollback stores the information required to rollback a deployment. */
export const DeploymentRollback = (props: {
  /**
   * Required: This must match the Name of a deployment.
   */
  name: string;
  /**
   * The config of this deployment rollback.
   */
  rollbackTo: IRollbackConfig;
  /**
   * The annotations to be updated to a deployment
   */
  updatedAnnotations?: Record<string, string>;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.DeploymentRollback"
      kind="DeploymentRollback"
      apiVersion="extensions/v1beta1"
      props={childProps}
    />
  );
};

/** * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc. DEPRECATED - This group version of Ingress is deprecated by networking.k8s.io/v1beta1 Ingress. See the release notes for more information.
 *
 * Child components:
 * - spec.backend: {@link IngressBackend} (single element)
 * - spec.rules: {@link IngressRule}
 * - spec.tls: {@link IngressTLS} */
export const Ingress = ({
  children,
  ...props
}: {
  /**
   * A default backend capable of servicing requests that don't match any rule. At least one of 'backend' or 'rules' must be specified. This field is optional to allow the loadbalancer controller or defaulting logic to specify a global default.
   */
  backend?: IIngressBackend;
  /**
   * IngressClassName is the name of the IngressClass cluster resource. The associated IngressClass defines which controller will implement the resource. This replaces the deprecated `kubernetes.io/ingress.class` annotation. For backwards compatibility, when that annotation is set, it must be given precedence over this field. The controller may emit a warning if the field and annotation have different values. Implementations of this API should ignore Ingresses without a class specified. An IngressClass resource may be marked as default, which can be used to set a default value for this field. For more information, refer to the IngressClass documentation.
   */
  ingressClassName?: string;
  /**
   * A list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.
   */
  rules?: IIngressRule[];
  /**
   * TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.
   */
  tls?: IIngressTLS[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.Ingress"
      kind="Ingress"
      apiVersion="extensions/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED 1.9 - This group version of NetworkPolicy is deprecated by networking/v1/NetworkPolicy. NetworkPolicy describes what network traffic is allowed for a set of Pods
 *
 * Child components:
 * - spec.podSelector: {@link LabelSelector} (single element)
 * - spec.egress: {@link NetworkPolicyEgressRule}
 * - spec.ingress: {@link NetworkPolicyIngressRule} */
export const NetworkPolicy = ({
  children,
  ...props
}: {
  /**
   * List of egress rules to be applied to the selected pods. Outgoing traffic is allowed if there are no NetworkPolicies selecting the pod (and cluster policy otherwise allows the traffic), OR if the traffic matches at least one egress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy limits all outgoing traffic (and serves solely to ensure that the pods it selects are isolated by default). This field is beta-level in 1.8
   */
  egress?: INetworkPolicyEgressRule[];
  /**
   * List of ingress rules to be applied to the selected pods. Traffic is allowed to a pod if there are no NetworkPolicies selecting the pod OR if the traffic source is the pod's local node, OR if the traffic matches at least one ingress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy does not allow any traffic (and serves solely to ensure that the pods it selects are isolated by default).
   */
  ingress?: INetworkPolicyIngressRule[];
  /**
   * Selects the pods to which this NetworkPolicy object applies.  The array of ingress rules is applied to any pods selected by this field. Multiple network policies can select the same set of pods.  In this case, the ingress rules for each are combined additively. This field is NOT optional and follows standard label selector semantics. An empty podSelector matches all pods in this namespace.
   */
  podSelector?: ILabelSelector;
  /**
   * List of rule types that the NetworkPolicy relates to. Valid options are "Ingress", "Egress", or "Ingress,Egress". If this field is not specified, it will default based on the existence of Ingress or Egress rules; policies that contain an Egress section are assumed to affect Egress, and all policies (whether or not they contain an Ingress section) are assumed to affect Ingress. If you want to write an egress-only policy, you must explicitly specify policyTypes [ "Egress" ]. Likewise, if you want to write a policy that specifies that no egress is allowed, you must specify a policyTypes value that include "Egress" (since such a policy would not include an Egress section and would otherwise default to just [ "Ingress" ]). This field is beta-level in 1.8
   */
  policyTypes?: string[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.NetworkPolicy"
      kind="NetworkPolicy"
      apiVersion="extensions/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated: use PodSecurityPolicy from policy API Group instead.
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
   * AllowedCSIDrivers is a whitelist of inline CSI drivers that must be explicitly set to be embedded within a pod spec. An empty value indicates that any CSI driver can be used for inline ephemeral volumes. This is an alpha field, and is only honored if the API server enables the CSIInlineVolume feature gate.
   */
  allowedCSIDrivers?: IAllowedCSIDriver[];
  /**
   * allowedCapabilities is a list of capabilities that can be requested to add to the container. Capabilities in this field may be added at the pod author's discretion. You must not list a capability in both allowedCapabilities and requiredDropCapabilities.
   */
  allowedCapabilities?: string[];
  /**
   * allowedFlexVolumes is a whitelist of allowed Flexvolumes.  Empty or nil indicates that all Flexvolumes may be used.  This parameter is effective only when the usage of the Flexvolumes is allowed in the "volumes" field.
   */
  allowedFlexVolumes?: IAllowedFlexVolume[];
  /**
   * allowedHostPaths is a white list of allowed host paths. Empty indicates that all host paths may be used.
   */
  allowedHostPaths?: IAllowedHostPath[];
  /**
   * AllowedProcMountTypes is a whitelist of allowed ProcMountTypes. Empty or nil indicates that only the DefaultProcMountType may be used. This requires the ProcMountType feature flag to be enabled.
   */
  allowedProcMountTypes?: string[];
  /**
   * allowedUnsafeSysctls is a list of explicitly allowed unsafe sysctls, defaults to none. Each entry is either a plain sysctl name or ends in "*" in which case it is considered as a prefix of allowed sysctls. Single * means all unsafe sysctls are allowed. Kubelet has to whitelist all allowed unsafe sysctls explicitly to avoid rejection.
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
   * volumes is a white list of allowed volume plugins. Empty indicates that no volumes may be used. To allow all volumes you may use '*'.
   */
  volumes?: string[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.PodSecurityPolicy"
      kind="PodSecurityPolicy"
      apiVersion="extensions/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED - This group version of ReplicaSet is deprecated by apps/v1beta2/ReplicaSet. See the release notes for more information. ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element) */
export const ReplicaSet = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
   */
  replicas?: number | bigint;
  /**
   * Selector is a label query over pods that should match the replica count. If the selector is empty, it is defaulted to the labels present on the pod template. Label keys and values that must match in order to be controlled by this replica set. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * Template is the object that describes the pod that will be created if insufficient replicas are detected. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.extensions.v1beta1.ReplicaSet"
      kind="ReplicaSet"
      apiVersion="extensions/v1beta1"
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
      id="io.k8s.api.extensions.v1beta1.AllowedCSIDriver"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.allowedCSIDrivers",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
          path: "allowedCSIDrivers",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. Deprecated: use AllowedFlexVolume from policy API Group instead. */
export const AllowedFlexVolume = (props: {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.AllowedFlexVolume"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.allowedFlexVolumes",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
          path: "allowedFlexVolumes",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined. Deprecated: use AllowedHostPath from policy API Group instead. */
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
      id="io.k8s.api.extensions.v1beta1.AllowedHostPath"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.allowedHostPaths",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
          path: "allowedHostPaths",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * FSGroupStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use FSGroupStrategyOptions from policy API Group instead.
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
      id="io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.fsGroup",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
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

/** * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. Deprecated: use HostPortRange from policy API Group instead. */
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
      id="io.k8s.api.extensions.v1beta1.HostPortRange"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.hostPorts",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
          path: "hostPorts",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsGroupStrategyOptions from policy API Group instead.
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
      id="io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.runAsGroup",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
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

/** * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsUserStrategyOptions from policy API Group instead.
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
      id="io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.runAsUser",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
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

/** * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use SELinuxStrategyOptions from policy API Group instead. */
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
      id="io.k8s.api.extensions.v1beta1.SELinuxStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.seLinux",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
          path: "seLinux",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use SupplementalGroupsStrategyOptions from policy API Group instead.
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
      id="io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
          path: "spec.supplementalGroups",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
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

/** * IDRange provides a min/max of an allowed range of IDs. Deprecated: use IDRange from policy API Group instead. */
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
      id="io.k8s.api.extensions.v1beta1.IDRange"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions",
          path: "ranges",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions",
          path: "ranges",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * DEPRECATED 1.9 - This group version of NetworkPolicyEgressRule is deprecated by networking/v1/NetworkPolicyEgressRule. NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8
 *
 * Child components:
 * - to: {@link NetworkPolicyPeer}
 * - ports: {@link NetworkPolicyPort} */
export const NetworkPolicyEgressRule = ({
  children,
  ...props
}: {
  /**
   * List of destination ports for outgoing traffic. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  /**
   * List of destinations for outgoing traffic of pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all destinations (traffic not restricted by destination). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the to list.
   */
  to?: INetworkPolicyPeer[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicy",
          path: "spec.egress",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
          path: "egress",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * DEPRECATED 1.9 - This group version of NetworkPolicyIngressRule is deprecated by networking/v1/NetworkPolicyIngressRule. This NetworkPolicyIngressRule matches traffic if and only if the traffic matches both ports AND from.
 *
 * Child components:
 * - from: {@link NetworkPolicyPeer}
 * - ports: {@link NetworkPolicyPort} */
export const NetworkPolicyIngressRule = ({
  children,
  ...props
}: {
  /**
   * List of sources which should be able to access the pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all sources (traffic not restricted by source). If this field is present and contains at least on item, this rule allows traffic only if the traffic matches at least one item in the from list.
   */
  from?: INetworkPolicyPeer[];
  /**
   * List of ports which should be made accessible on the pods selected for this rule. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicy",
          path: "spec.ingress",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
          path: "ingress",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * DEPRECATED 1.9 - This group version of NetworkPolicyPeer is deprecated by networking/v1/NetworkPolicyPeer.
 *
 * Child components:
 * - namespaceSelector: {@link LabelSelector} with 'namespaceSelector' flag (single element)
 * - podSelector: {@link LabelSelector} with 'podSelector' flag (single element) */
export const NetworkPolicyPeer = ({
  children,
  ...props
}: {
  /**
   * IPBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
   */
  ipBlock?: IIPBlock;
  /**
   * Selects Namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
   *
   * If PodSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects all Pods in the Namespaces selected by NamespaceSelector.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * This is a label selector which selects Pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
   *
   * If NamespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the Pods matching PodSelector in the policy's own Namespace.
   */
  podSelector?: ILabelSelector;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.NetworkPolicyPeer"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
          path: "to",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
          path: "from",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * DEPRECATED 1.9 - This group version of NetworkPolicyPort is deprecated by networking/v1/NetworkPolicyPort. */
export const NetworkPolicyPort = (props: {
  /**
   * If specified, the port on the given protocol.  This can either be a numerical or named port on a pod.  If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
   */
  port?: IntOrString;
  /**
   * Optional.  The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
   */
  protocol?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.NetworkPolicyPort"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
          path: "ports",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
          path: "ports",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * IngressBackend describes all endpoints for a given service and port. */
export const IngressBackend = (props: {
  /**
   * Resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, serviceName and servicePort must not be specified.
   */
  resource?: ITypedLocalObjectReference;
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: string;
  /**
   * Specifies the port of the referenced service.
   */
  servicePort?: IntOrString;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.IngressBackend"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.HTTPIngressPath",
          path: "backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.HTTPIngressRuleValue",
          path: "paths.backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.Ingress",
          path: "spec.backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.IngressSpec",
          path: "backend",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 *
 * Child components:
 * - http: {@link HTTPIngressRuleValue} (single element) */
export const IngressRule = ({
  children,
  ...props
}: {
  /**
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * Host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If Host is precise, the request matches this rule if the http host header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.IngressRule"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.Ingress",
          path: "spec.rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.IngressSpec",
          path: "rules",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * IngressTLS describes the transport layer security associated with an Ingress. */
export const IngressTLS = (props: {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * SecretName is the name of the secret used to terminate SSL traffic on 443. Field is left optional to allow SSL routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.
   */
  secretName?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.IngressTLS"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.Ingress",
          path: "spec.tls",
          isItem: true,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.IngressSpec",
          path: "tls",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 *
 * Child components:
 * - paths.backend: {@link IngressBackend} (single element) */
export const HTTPIngressRuleValue = ({
  children,
  ...props
}: {
  /**
   * Backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * Path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/'. When unspecified, all paths from incoming requests are matched.
   */
  path?: string;
  /**
   * PathType determines the interpretation of the Path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types. Defaults to ImplementationSpecific.
   */
  pathType?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "paths",
  });
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.HTTPIngressRuleValue"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.IngressRule",
          path: "http",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * DeploymentStrategy describes how to replace existing pods with new ones. */
export const DeploymentStrategy = (props: {
  /**
   * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
   */
  rollingUpdate?: IRollingUpdateDeployment;
  /**
   * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.DeploymentStrategy"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.Deployment",
          path: "spec.strategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.DeploymentSpec",
          path: "strategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** *  */
export const DaemonSetUpdateStrategy = (props: {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: IRollingUpdateDaemonSet;
  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is OnDelete.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.extensions.v1beta1.DaemonSetUpdateStrategy"
      contexts={[
        {
          id: "io.k8s.api.extensions.v1beta1.DaemonSet",
          path: "spec.updateStrategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
          path: "updateStrategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
