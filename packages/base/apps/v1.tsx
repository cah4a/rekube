import { IRawExtension } from "pkg/runtime";
import { IOwnerReference, ILabelSelector } from "meta/v1";
import { Resource, useResourceProps } from "rekube";
import { IPodTemplateSpec, IPersistentVolumeClaim } from "core/v1";

/**
 * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
 */
export interface IDaemonSetUpdateStrategy {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: IRollingUpdateDaemonSet;
  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
   */
  type?: string;
}

/**
 * Spec to control the desired behavior of daemon set rolling update.
 */
export interface IRollingUpdateDaemonSet {
  maxSurge?: number | string;
  maxUnavailable?: number | string;
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

/**
 * Spec to control the desired behavior of rolling update.
 */
export interface IRollingUpdateDeployment {
  maxSurge?: number | string;
  maxUnavailable?: number | string;
}

/**
 * StatefulSetOrdinals describes the policy used for replica ordinal assignment in this StatefulSet.
 */
export interface IStatefulSetOrdinals {
  /**
   * start is the number representing the first replica's index. It may be used to number replicas from an alternate index (eg: 1-indexed) over the default 0-indexed names, or to orchestrate progressive movement of replicas from one StatefulSet to another. If set, replica indices will be in the range:
   * [.spec.ordinals.start, .spec.ordinals.start + .spec.replicas).
   * If unset, defaults to 0. Replica indices will be in the range:
   * [0, .spec.replicas).
   */
  start?: number;
}

/**
 * StatefulSetPersistentVolumeClaimRetentionPolicy describes the policy used for PVCs created from the StatefulSet VolumeClaimTemplates.
 */
export interface IStatefulSetPersistentVolumeClaimRetentionPolicy {
  /**
   * WhenDeleted specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is deleted. The default policy of `Retain` causes PVCs to not be affected by StatefulSet deletion. The `Delete` policy causes those PVCs to be deleted.
   */
  whenDeleted?: string;
  /**
   * WhenScaled specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is scaled down. The default policy of `Retain` causes PVCs to not be affected by a scaledown. The `Delete` policy causes the associated PVCs for any excess pods above the replica count to be deleted.
   */
  whenScaled?: string;
}

/**
 * StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy.
 */
export interface IStatefulSetUpdateStrategy {
  /**
   * RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.
   */
  rollingUpdate?: IRollingUpdateStatefulSetStrategy;
  /**
   * Type indicates the type of the StatefulSetUpdateStrategy. Default is RollingUpdate.
   */
  type?: string;
}

/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export interface IRollingUpdateStatefulSetStrategy {
  maxUnavailable?: number | string;
  /**
   * Partition indicates the ordinal at which the StatefulSet should be partitioned for updates. During a rolling update, all pods from ordinal Replicas-1 to Partition are updated. All pods from ordinal Partition-1 to 0 remain untouched. This is helpful in being able to do a canary based deployment. The default value is 0.
   */
  partition?: number;
}

/**
 * ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers.
 */
export function ControllerRevision(props: {
  /**
   * Data is the serialized representation of the state.
   */
  data?: IRawExtension;
  /**
   * Revision indicates the revision of the state represented by Data.
   */
  revision: number;
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
      kind="ControllerRevision"
      apiVersion="apps/v1"
      id="io.k8s.api.apps.v1.ControllerRevision"
      props={props}
    />
  );
}

/**
 * DaemonSet represents the configuration of a daemon set.
 *
 * Child components:
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.containers: {@link Container}
 * - spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.template.spec.initContainers: {@link Container}
 * - spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.template.spec.tolerations: {@link Toleration}
 * - spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.template.spec.volumes: {@link Volume}
 */
export function DaemonSet({
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
   * The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).
   */
  minReadySeconds?: number;
  /**
   * The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number;
  /**
   * A label query over pods that are managed by the daemon set. Must match in order to be controlled. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector: ILabelSelector;
  /**
   * An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). The only allowed template.spec.restartPolicy value is "Always". More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template: IPodTemplateSpec;
  /**
   * An update strategy to replace existing DaemonSet pods with new pods.
   */
  updateStrategy?: IDaemonSetUpdateStrategy;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="DaemonSet"
      apiVersion="apps/v1"
      id="io.k8s.api.apps.v1.DaemonSet"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 *
 * Child components:
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.containers: {@link Container}
 * - spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.template.spec.initContainers: {@link Container}
 * - spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.template.spec.tolerations: {@link Toleration}
 * - spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.template.spec.volumes: {@link Volume}
 */
export function Deployment({
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
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number;
  /**
   * Indicates that the deployment is paused.
   */
  paused?: boolean;
  /**
   * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.
   */
  progressDeadlineSeconds?: number;
  /**
   * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   */
  replicas?: number;
  /**
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number;
  /**
   * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment. It must match the pod template's labels.
   */
  selector: ILabelSelector;
  /**
   * The deployment strategy to use to replace existing pods with new ones.
   */
  strategy?: IDeploymentStrategy;
  /**
   * Template describes the pods that will be created. The only allowed template.spec.restartPolicy value is "Always".
   */
  template: IPodTemplateSpec;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="Deployment"
      apiVersion="apps/v1"
      id="io.k8s.api.apps.v1.Deployment"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 *
 * Child components:
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.containers: {@link Container}
 * - spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.template.spec.initContainers: {@link Container}
 * - spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.template.spec.tolerations: {@link Toleration}
 * - spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.template.spec.volumes: {@link Volume}
 */
export function ReplicaSet({
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
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number;
  /**
   * Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
   */
  replicas?: number;
  /**
   * Selector is a label query over pods that should match the replica count. Label keys and values that must match in order to be controlled by this replica set. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector: ILabelSelector;
  /**
   * Template is the object that describes the pod that will be created if insufficient replicas are detected. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="ReplicaSet"
      apiVersion="apps/v1"
      id="io.k8s.api.apps.v1.ReplicaSet"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * StatefulSet represents a set of pods with consistent identities. Identities are defined as:
 * - Network: A single stable DNS and hostname.
 * - Storage: As many VolumeClaims as requested.
 *
 * The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 *
 * Child components:
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.containers: {@link Container}
 * - spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.template.spec.initContainers: {@link Container}
 * - spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.template.spec.tolerations: {@link Toleration}
 * - spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.template.spec.volumes: {@link Volume}
 * - spec.volumeClaimTemplates: {@link PersistentVolumeClaim}
 */
export function StatefulSet({
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
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number;
  /**
   * ordinals controls the numbering of replica indices in a StatefulSet. The default ordinals behavior assigns a "0" index to the first replica and increments the index by one for each additional replica requested. Using the ordinals field requires the StatefulSetStartOrdinal feature gate to be enabled, which is beta.
   */
  ordinals?: IStatefulSetOrdinals;
  /**
   * persistentVolumeClaimRetentionPolicy describes the lifecycle of persistent volume claims created from volumeClaimTemplates. By default, all persistent volume claims are created as needed and retained until manually deleted. This policy allows the lifecycle to be altered, for example by deleting persistent volume claims when their stateful set is deleted, or when their pod is scaled down. This requires the StatefulSetAutoDeletePVC feature gate to be enabled, which is alpha.  +optional
   */
  persistentVolumeClaimRetentionPolicy?: IStatefulSetPersistentVolumeClaimRetentionPolicy;
  /**
   * podManagementPolicy controls how pods are created during initial scale up, when replacing pods on nodes, or when scaling down. The default policy is `OrderedReady`, where pods are created in increasing order (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before continuing. When scaling down, the pods are removed in the opposite order. The alternative policy is `Parallel` which will create pods in parallel to match the desired scale without waiting, and on scale down will delete all pods at once.
   */
  podManagementPolicy?: string;
  /**
   * replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1.
   */
  replicas?: number;
  /**
   * revisionHistoryLimit is the maximum number of revisions that will be maintained in the StatefulSet's revision history. The revision history consists of all revisions not represented by a currently applied StatefulSetSpec version. The default value is 10.
   */
  revisionHistoryLimit?: number;
  /**
   * selector is a label query over pods that should match the replica count. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector: ILabelSelector;
  /**
   * serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.
   */
  serviceName: string;
  /**
   * template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet. Each pod will be named with the format <statefulsetname>-<podindex>. For example, a pod in a StatefulSet named "web" with index number "3" would be named "web-3". The only allowed template.spec.restartPolicy value is "Always".
   */
  template: IPodTemplateSpec;
  /**
   * updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.
   */
  updateStrategy?: IStatefulSetUpdateStrategy;
  /**
   * volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name.
   */
  volumeClaimTemplates?: IPersistentVolumeClaim[];
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="StatefulSet"
      apiVersion="apps/v1"
      id="io.k8s.api.apps.v1.StatefulSet"
      props={childProps}
    >
      {children}
    </Resource>
  );
}
