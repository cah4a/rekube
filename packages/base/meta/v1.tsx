import { Item } from "rekube";

/**
 * OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.
 */
export interface IOwnerReference {
  /**
   * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
   */
  blockOwnerDeletion?: boolean;
  /**
   * If true, this reference points to the managing controller.
   */
  controller?: boolean;
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  name: string;
  /**
   * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
   */
  uid: string;
}

/**
 * MicroTime is version of Time with microsecond level precision.
 */
export interface IMicroTime {}

/**
 * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.
 */
export interface ITime {}

/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 */
export interface ILabelSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: ILabelSelectorRequirement[];
  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   */
  matchLabels?: object;
}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export interface ILabelSelectorRequirement {
  /**
   * key is the label key that the selector applies to.
   */
  key: string;
  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   */
  operator: string;
  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   */
  values?: string[];
}

/**
 * DeleteOptions may be provided when deleting an API object.
 */
export interface IDeleteOptions {
  /**
   * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
   */
  dryRun?: string[];
  /**
   * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
   */
  gracePeriodSeconds?: number;
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
}

/**
 * Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out.
 */
export interface IPreconditions {
  /**
   * Specifies the target ResourceVersion
   */
  resourceVersion?: string;
  /**
   * Specifies the target UID.
   */
  uid?: string;
}

/**
 * ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
 */
export interface IObjectMeta {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
   */
  annotations?: object;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   */
  finalizers?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  generateName?: string;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
   */
  labels?: object;
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  name?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
   */
  namespace?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   */
  ownerReferences?: IOwnerReference[];
}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export function LabelSelectorRequirement(props: {
  /**
   * key is the label key that the selector applies to.
   */
  key: string;
  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   */
  operator: string;
  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   */
  values?: string[];
}) {
  return (
    <Item
      id="io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelectorRequirement"
      paths={{
        "io.k8s.api.core.v1.PersistentVolumeClaim":
          "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1.DaemonSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1.Deployment": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1.ReplicaSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1.StatefulSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta1.Deployment": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta1.StatefulSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta2.DaemonSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta2.Deployment": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta2.ReplicaSet": "spec.selector.matchExpressions",
        "io.k8s.api.apps.v1beta2.StatefulSet": "spec.selector.matchExpressions",
        "io.k8s.api.batch.v1.Job": "spec.selector.matchExpressions",
        "io.k8s.api.batch.v1beta1.CronJob":
          "spec.jobTemplate.spec.selector.matchExpressions",
        "io.k8s.api.batch.v2alpha1.CronJob":
          "spec.jobTemplate.spec.selector.matchExpressions",
        "io.k8s.api.extensions.v1beta1.DaemonSet":
          "spec.selector.matchExpressions",
        "io.k8s.api.extensions.v1beta1.Deployment":
          "spec.selector.matchExpressions",
        "io.k8s.api.extensions.v1beta1.NetworkPolicy":
          "spec.podSelector.matchExpressions",
        "io.k8s.api.extensions.v1beta1.ReplicaSet":
          "spec.selector.matchExpressions",
        "io.k8s.api.networking.v1.NetworkPolicy":
          "spec.podSelector.matchExpressions",
        "io.k8s.api.policy.v1beta1.PodDisruptionBudget":
          "spec.selector.matchExpressions",
        "io.k8s.api.settings.v1alpha1.PodPreset":
          "spec.selector.matchExpressions",
        "io.k8s.api.batch.v1.CronJob":
          "spec.jobTemplate.spec.selector.matchExpressions",
        "io.k8s.api.policy.v1.PodDisruptionBudget":
          "spec.selector.matchExpressions",
        "io.k8s.api.storage.v1alpha1.CSIStorageCapacity":
          "nodeTopology.matchExpressions",
        "io.k8s.api.storage.v1beta1.CSIStorageCapacity":
          "nodeTopology.matchExpressions",
        "io.k8s.api.storage.v1.CSIStorageCapacity":
          "nodeTopology.matchExpressions",
        "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy":
          "spec.matchConstraints.namespaceSelector.matchExpressions",
        "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyBinding":
          "spec.matchResources.namespaceSelector.matchExpressions",
      }}
      value={props}
    />
  );
}

/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 *
 * Child components:
 * - matchExpressions: {@link LabelSelectorRequirement}
 */
export function LabelSelector({
  children,
  ...props
}: {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: ILabelSelectorRequirement[];
  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   */
  matchLabels?: object;
  children?: React.ReactNode;
}) {
  return (
    <Item
      id="io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector"
      paths={{
        "io.k8s.api.rbac.v1.ClusterRole":
          "aggregationRule.clusterRoleSelectors",
        "io.k8s.api.rbac.v1alpha1.ClusterRole":
          "aggregationRule.clusterRoleSelectors",
        "io.k8s.api.rbac.v1beta1.ClusterRole":
          "aggregationRule.clusterRoleSelectors",
      }}
      value={props}
    >
      {children}
    </Item>
  );
}
