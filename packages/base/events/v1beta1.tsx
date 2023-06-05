import { ITime, IMicroTime, IOwnerReference } from "meta/v1";
import { IEventSource, IObjectReference } from "core/v1";
import { Resource, useResourceProps } from "rekube";

/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export interface IEventSeries {
  /**
   * count is the number of occurrences in this series up to the last heartbeat time.
   */
  count: number;
  /**
   * lastObservedTime is the time when last Event from the series was seen before last heartbeat.
   */
  lastObservedTime: IMicroTime;
}

/**
 * Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 */
export function Event(props: {
  /**
   * action is what action was taken/failed regarding to the regarding object. It is machine-readable. This field can have at most 128 characters.
   */
  action?: string;
  /**
   * deprecatedCount is the deprecated field assuring backward compatibility with core.v1 Event type.
   */
  deprecatedCount?: number;
  /**
   * deprecatedFirstTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
   */
  deprecatedFirstTimestamp?: ITime;
  /**
   * deprecatedLastTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
   */
  deprecatedLastTimestamp?: ITime;
  /**
   * deprecatedSource is the deprecated field assuring backward compatibility with core.v1 Event type.
   */
  deprecatedSource?: IEventSource;
  /**
   * eventTime is the time when this Event was first observed. It is required.
   */
  eventTime: IMicroTime;
  /**
   * note is a human-readable description of the status of this operation. Maximal length of the note is 1kB, but libraries should be prepared to handle values up to 64kB.
   */
  note?: string;
  /**
   * reason is why the action was taken. It is human-readable. This field can have at most 128 characters.
   */
  reason?: string;
  /**
   * regarding contains the object this Event is about. In most cases it's an Object reporting controller implements, e.g. ReplicaSetController implements ReplicaSets and this event is emitted because it acts on some changes in a ReplicaSet object.
   */
  regarding?: IObjectReference;
  /**
   * related is the optional secondary object for more complex actions. E.g. when regarding object triggers a creation or deletion of related object.
   */
  related?: IObjectReference;
  /**
   * reportingController is the name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`. This field cannot be empty for new Events.
   */
  reportingController?: string;
  /**
   * reportingInstance is the ID of the controller instance, e.g. `kubelet-xyzf`. This field cannot be empty for new Events and it can have at most 128 characters.
   */
  reportingInstance?: string;
  /**
   * series is data about the Event series this event represents or nil if it's a singleton Event.
   */
  series?: IEventSeries;
  /**
   * type is the type of this event (Normal, Warning), new types could be added in the future. It is machine-readable.
   */
  type?: string;
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
      kind="Event"
      apiVersion="events.k8s.io/v1beta1"
      id="io.k8s.api.events.v1beta1.Event"
      props={props}
    />
  );
}
