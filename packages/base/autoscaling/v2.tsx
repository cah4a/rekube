import { IOwnerReference, ILabelSelector } from "meta/v1";
import { IQuantity } from "api/resource";
import { Resource, useResourceProps, Item } from "rekube";

/**
 * HorizontalPodAutoscalerBehavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively).
 */
export interface IHorizontalPodAutoscalerBehavior {
  /**
   * scaleDown is scaling policy for scaling Down. If not set, the default value is to allow to scale down to minReplicas pods, with a 300 second stabilization window (i.e., the highest recommendation for the last 300sec is used).
   */
  scaleDown?: IHPAScalingRules;
  /**
   * scaleUp is scaling policy for scaling Up. If not set, the default value is the higher of:
   * * increase no more than 4 pods per 60 seconds
   * * double the number of pods per 60 seconds
   * No stabilization is used.
   */
  scaleUp?: IHPAScalingRules;
}

/**
 * HPAScalingRules configures the scaling behavior for one direction. These Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.
 */
export interface IHPAScalingRules {
  /**
   * policies is a list of potential scaling polices which can be used during scaling. At least one policy must be specified, otherwise the HPAScalingRules will be discarded as invalid
   */
  policies?: IHPAScalingPolicy[];
  /**
   * selectPolicy is used to specify which policy should be used. If not set, the default value Max is used.
   */
  selectPolicy?: string;
  /**
   * stabilizationWindowSeconds is the number of seconds for which past recommendations should be considered while scaling up or scaling down. StabilizationWindowSeconds must be greater than or equal to zero and less than or equal to 3600 (one hour). If not set, use the default values: - For scale up: 0 (i.e. no stabilization is done). - For scale down: 300 (i.e. the stabilization window is 300 seconds long).
   */
  stabilizationWindowSeconds?: number;
}

/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export interface IHPAScalingPolicy {
  /**
   * periodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
   */
  periodSeconds: number;
  /**
   * type is used to specify the scaling policy.
   */
  type: string;
  /**
   * value contains the amount of change which is permitted by the policy. It must be greater than zero
   */
  value: number;
}

/**
 * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 */
export interface IMetricSpec {
  /**
   * containerResource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod of the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source. This is an alpha feature and can be enabled by the HPAContainerMetrics feature flag.
   */
  containerResource?: IContainerResourceMetricSource;
  /**
   * external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
   */
  external?: IExternalMetricSource;
  /**
   * object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).
   */
  object?: IObjectMetricSource;
  /**
   * pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.
   */
  pods?: IPodsMetricSource;
  /**
   * resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
   */
  resource?: IResourceMetricSource;
  /**
   * type is the type of metric source.  It should be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each mapping to a matching field in the object. Note: "ContainerResource" type is available on when the feature-gate HPAContainerMetrics is enabled
   */
  type: string;
}

/**
 * ContainerResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set.
 */
export interface IContainerResourceMetricSource {
  /**
   * container is the name of the container in the pods of the scaling target
   */
  container: string;
  /**
   * name is the name of the resource in question.
   */
  name: string;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * MetricTarget defines the target value, average value, or average utilization of a specific metric
 */
export interface IMetricTarget {
  /**
   * averageUtilization is the target value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods. Currently only valid for Resource metric source type
   */
  averageUtilization?: number;
  /**
   * averageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  averageValue?: IQuantity;
  /**
   * type represents whether the metric type is Utilization, Value, or AverageValue
   */
  type: string;
  /**
   * value is the target value of the metric (as a quantity).
   */
  value?: IQuantity;
}

/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
 */
export interface IExternalMetricSource {
  /**
   * metric identifies the target metric by name and selector
   */
  metric: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * MetricIdentifier defines the name and optionally selector for a metric
 */
export interface IMetricIdentifier {
  /**
   * name is the name of the given metric
   */
  name: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping. When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
}

/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricSource {
  /**
   * describedObject specifies the descriptions of a object,such as kind,name apiVersion
   */
  describedObject: ICrossVersionObjectReference;
  /**
   * metric identifies the target metric by name and selector
   */
  metric: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export interface ICrossVersionObjectReference {
  /**
   * name is the name of the referent; More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name: string;
}

/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export interface IPodsMetricSource {
  /**
   * metric identifies the target metric by name and selector
   */
  metric: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * ResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set.
 */
export interface IResourceMetricSource {
  /**
   * name is the name of the resource in question.
   */
  name: string;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 *
 * Child components:
 * - spec.behavior.scaleDown.policies: {@link HPAScalingPolicy}
 * - spec.behavior.scaleUp.policies: {@link HPAScalingPolicy}
 * - spec.metrics: {@link MetricSpec}
 */
export function HorizontalPodAutoscaler({
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
   * behavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively). If not set, the default HPAScalingRules for scale up and scale down are used.
   */
  behavior?: IHorizontalPodAutoscalerBehavior;
  /**
   * maxReplicas is the upper limit for the number of replicas to which the autoscaler can scale up. It cannot be less that minReplicas.
   */
  maxReplicas: number;
  /**
   * metrics contains the specifications for which to use to calculate the desired replica count (the maximum replica count across all metrics will be used).  The desired replica count is calculated multiplying the ratio between the target value and the current value by the current number of pods.  Ergo, metrics used must decrease as the pod count is increased, and vice-versa.  See the individual metric source types for more information about how each type of metric must respond. If not set, the default metric will be set to 80% average CPU utilization.
   */
  metrics?: IMetricSpec[];
  /**
   * minReplicas is the lower limit for the number of replicas to which the autoscaler can scale down.  It defaults to 1 pod.  minReplicas is allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured.  Scaling is active as long as at least one metric value is available.
   */
  minReplicas?: number;
  /**
   * scaleTargetRef points to the target resource to scale, and is used to the pods for which metrics should be collected, as well as to actually change the replica count.
   */
  scaleTargetRef: ICrossVersionObjectReference;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="HorizontalPodAutoscaler"
      apiVersion="autoscaling/v2"
      id="io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export function HPAScalingPolicy(props: {
  /**
   * periodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
   */
  periodSeconds: number;
  /**
   * type is used to specify the scaling policy.
   */
  type: string;
  /**
   * value contains the amount of change which is permitted by the policy. It must be greater than zero
   */
  value: number;
}) {
  return (
    <Item
      id="io.k8s.api.autoscaling.v2.HPAScalingPolicy"
      paths={{
        "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler":
          "spec.behavior.scaleDown.policies",
      }}
      value={props}
    />
  );
}

/**
 * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 *
 * Child components:
 * - external.metric.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - object.metric.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - pods.metric.selector.matchExpressions: {@link LabelSelectorRequirement}
 */
export function MetricSpec({
  children,
  ...props
}: {
  /**
   * containerResource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod of the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source. This is an alpha feature and can be enabled by the HPAContainerMetrics feature flag.
   */
  containerResource?: IContainerResourceMetricSource;
  /**
   * external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
   */
  external?: IExternalMetricSource;
  /**
   * object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).
   */
  object?: IObjectMetricSource;
  /**
   * pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.
   */
  pods?: IPodsMetricSource;
  /**
   * resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
   */
  resource?: IResourceMetricSource;
  /**
   * type is the type of metric source.  It should be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each mapping to a matching field in the object. Note: "ContainerResource" type is available on when the feature-gate HPAContainerMetrics is enabled
   */
  type: string;
  children?: React.ReactNode;
}) {
  return (
    <Item
      id="io.k8s.api.autoscaling.v2.MetricSpec"
      paths={{
        "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler": "spec.metrics",
      }}
      value={props}
    >
      {children}
    </Item>
  );
}
