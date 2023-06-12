import { Quantity, useKubeProps, Resource, Item } from "rekube";
import { ILabelSelector, IObjectMeta } from "meta/v1";

/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export interface ICrossVersionObjectReference {
  /**
   * Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names
   */
  name: string;
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
   * targetAverageUtilization is the target value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods.
   */
  targetAverageUtilization?: number | bigint;
  /**
   * targetAverageValue is the target value of the average of the resource metric across all relevant pods, as a raw value (instead of as a percentage of the request), similar to the "pods" metric source type.
   */
  targetAverageValue?: Quantity;
}

/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster). Exactly one "target" type should be set.
 */
export interface IExternalMetricSource {
  /**
   * metricName is the name of the metric in question.
   */
  metricName: string;
  /**
   * metricSelector is used to identify a specific time series within a given metric.
   */
  metricSelector?: ILabelSelector;
  /**
   * targetAverageValue is the target per-pod value of global metric (as a quantity). Mutually exclusive with TargetValue.
   */
  targetAverageValue?: Quantity;
  /**
   * targetValue is the target value of the metric (as a quantity). Mutually exclusive with TargetAverageValue.
   */
  targetValue?: Quantity;
}

/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricSource {
  /**
   * averageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  averageValue?: Quantity;
  /**
   * metricName is the name of the metric in question.
   */
  metricName: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
  /**
   * target is the described Kubernetes object.
   */
  target: ICrossVersionObjectReference;
  /**
   * targetValue is the target value of the metric (as a quantity).
   */
  targetValue: Quantity;
}

/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export interface IPodsMetricSource {
  /**
   * metricName is the name of the metric in question
   */
  metricName: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
  /**
   * targetAverageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  targetAverageValue: Quantity;
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
   * targetAverageUtilization is the target value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods.
   */
  targetAverageUtilization?: number | bigint;
  /**
   * targetAverageValue is the target value of the average of the resource metric across all relevant pods, as a raw value (instead of as a percentage of the request), similar to the "pods" metric source type.
   */
  targetAverageValue?: Quantity;
}

/**
 * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 */
export interface IMetricSpec {
  /**
   * container resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod of the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source. This is an alpha feature and can be enabled by the HPAContainerMetrics feature flag.
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

/** * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 *
 * Child components:
 * - spec.metrics: {@link MetricSpec} */
export const HorizontalPodAutoscaler = ({
  children,
  ...props
}: {
  /**
   * maxReplicas is the upper limit for the number of replicas to which the autoscaler can scale up. It cannot be less that minReplicas.
   */
  maxReplicas: number | bigint;
  /**
   * metrics contains the specifications for which to use to calculate the desired replica count (the maximum replica count across all metrics will be used).  The desired replica count is calculated multiplying the ratio between the target value and the current value by the current number of pods.  Ergo, metrics used must decrease as the pod count is increased, and vice-versa.  See the individual metric source types for more information about how each type of metric must respond.
   */
  metrics?: IMetricSpec[];
  /**
   * minReplicas is the lower limit for the number of replicas to which the autoscaler can scale down.  It defaults to 1 pod.  minReplicas is allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured.  Scaling is active as long as at least one metric value is available.
   */
  minReplicas?: number | bigint;
  /**
   * scaleTargetRef points to the target resource to scale, and is used to the pods for which metrics should be collected, as well as to actually change the replica count.
   */
  scaleTargetRef: ICrossVersionObjectReference;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscaler"
      kind="HorizontalPodAutoscaler"
      apiVersion="autoscaling/v2beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 *
 * Child components:
 * - external: {@link ExternalMetricSource} (single element)
 * - object: {@link ObjectMetricSource} (single element)
 * - pods: {@link PodsMetricSource} (single element) */
export const MetricSpec = ({
  children,
  ...props
}: {
  /**
   * container resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod of the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source. This is an alpha feature and can be enabled by the HPAContainerMetrics feature flag.
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
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta1.MetricSpec"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscaler",
          path: "spec.metrics",
          isItem: true,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerSpec",
          path: "metrics",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster). Exactly one "target" type should be set.
 *
 * Child components:
 * - metricSelector: {@link LabelSelector} (single element) */
export const ExternalMetricSource = ({
  children,
  ...props
}: {
  /**
   * metricName is the name of the metric in question.
   */
  metricName: string;
  /**
   * metricSelector is used to identify a specific time series within a given metric.
   */
  metricSelector?: ILabelSelector;
  /**
   * targetAverageValue is the target per-pod value of global metric (as a quantity). Mutually exclusive with TargetValue.
   */
  targetAverageValue?: Quantity;
  /**
   * targetValue is the target value of the metric (as a quantity). Mutually exclusive with TargetAverageValue.
   */
  targetValue?: Quantity;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta1.ExternalMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
          path: "external",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 *
 * Child components:
 * - selector: {@link LabelSelector} (single element) */
export const ObjectMetricSource = ({
  children,
  ...props
}: {
  /**
   * averageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  averageValue?: Quantity;
  /**
   * metricName is the name of the metric in question.
   */
  metricName: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
  /**
   * target is the described Kubernetes object.
   */
  target: ICrossVersionObjectReference;
  /**
   * targetValue is the target value of the metric (as a quantity).
   */
  targetValue: Quantity;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta1.ObjectMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
          path: "object",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 *
 * Child components:
 * - selector: {@link LabelSelector} (single element) */
export const PodsMetricSource = ({
  children,
  ...props
}: {
  /**
   * metricName is the name of the metric in question
   */
  metricName: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
  /**
   * targetAverageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  targetAverageValue: Quantity;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta1.PodsMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
          path: "pods",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};
