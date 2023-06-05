import { IOwnerReference, ILabelSelector } from "meta/v1";
import { IEnvVar, IEnvFromSource, IVolumeMount, IVolume } from "core/v1";
import { Resource, useResourceProps } from "rekube";

/**
 * PodPreset is a policy resource that defines additional runtime requirements for a Pod.
 *
 * Child components:
 * - spec.env: {@link EnvVar}
 * - spec.envFrom: {@link EnvFromSource}
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.volumeMounts: {@link VolumeMount}
 * - spec.volumes: {@link Volume}
 */
export function PodPreset({
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
   * Env defines the collection of EnvVar to inject into containers.
   */
  env?: IEnvVar[];
  /**
   * EnvFrom defines the collection of EnvFromSource to inject into containers.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Selector is a label query over a set of resources, in this case pods. Required.
   */
  selector?: ILabelSelector;
  /**
   * VolumeMounts defines the collection of VolumeMount to inject into containers.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Volumes defines the collection of Volume to inject into the pod.
   */
  volumes?: IVolume[];
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="PodPreset"
      apiVersion="settings.k8s.io/v1alpha1"
      id="io.k8s.api.settings.v1alpha1.PodPreset"
      props={childProps}
    >
      {children}
    </Resource>
  );
}
