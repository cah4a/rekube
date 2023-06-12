import { MicroTime, Time, useKubeProps, Resource } from "rekube";
import { IObjectMeta } from "meta/v1";
import { IEventSource, IObjectReference } from "core/v1";

/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export interface IEventSeries {
  /**
   * count is the number of occurrences in this series up to the last heartbeat time.
   */
  count: number | bigint;
  /**
   * lastObservedTime is the time when last Event from the series was seen before last heartbeat.
   */
  lastObservedTime: MicroTime;
}

/** * Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data. */
export const Event = (
  props: {
    /**
     * action is what action was taken/failed regarding to the regarding object. It is machine-readable. This field can have at most 128 characters.
     */
    action?: string;
    /**
     * deprecatedCount is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    deprecatedCount?: number | bigint;
    /**
     * deprecatedFirstTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    deprecatedFirstTimestamp?: Time;
    /**
     * deprecatedLastTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    deprecatedLastTimestamp?: Time;
    /**
     * deprecatedSource is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    deprecatedSource?: IEventSource;
    /**
     * eventTime is the time when this Event was first observed. It is required.
     */
    eventTime: MicroTime;
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
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.events.v1beta1.Event"
      kind="Event"
      apiVersion="events.k8s.io/v1beta1"
      props={childProps}
    />
  );
};
