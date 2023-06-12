import { Quantity, useKubeProps, Resource, Item } from "rekube";
import { ILabelSelector, IObjectMeta } from "meta/v1";

/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export interface IHPAScalingPolicy {
  /**
   * PeriodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
   */
  periodSeconds: number | bigint;
  /**
   * Type is used to specify the scaling policy.
   */
  type: string;
  /**
   * Value contains the amount of change which is permitted by the policy. It must be greater than zero
   */
  value: number | bigint;
}

/**
 * MetricTarget defines the target value, average value, or average utilization of a specific metric
 */
export interface IMetricTarget {
  /**
   * averageUtilization is the target value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods. Currently only valid for Resource metric source type
   */
  averageUtilization?: number | bigint;
  /**
   * averageValue is the target value of the average of the metric across all relevant pods (as a quantity)
   */
  averageValue?: Quantity;
  /**
   * type represents whether the metric type is Utilization, Value, or AverageValue
   */
  type: string;
  /**
   * value is the target value of the metric (as a quantity).
   */
  value?: Quantity;
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
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
 */
export interface IExternalMetricSource {
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricSource {
  describedObject: ICrossVersionObjectReference;
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}

/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export interface IPodsMetricSource {
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
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
 * HPAScalingRules configures the scaling behavior for one direction. These Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.
 */
export interface IHPAScalingRules {
  /**
   * policies is a list of potential scaling polices which can be used during scaling. At least one policy must be specified, otherwise the HPAScalingRules will be discarded as invalid
   */
  policies?: IHPAScalingPolicy[];
  /**
   * selectPolicy is used to specify which policy should be used. If not set, the default value MaxPolicySelect is used.
   */
  selectPolicy?: string;
  /**
   * StabilizationWindowSeconds is the number of seconds for which past recommendations should be considered while scaling up or scaling down. StabilizationWindowSeconds must be greater than or equal to zero and less than or equal to 3600 (one hour). If not set, use the default values: - For scale up: 0 (i.e. no stabilization is done). - For scale down: 300 (i.e. the stabilization window is 300 seconds long).
   */
  stabilizationWindowSeconds?: number | bigint;
}

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
 * - spec.behavior: {@link HorizontalPodAutoscalerBehavior} (single element)
 * - spec.metrics: {@link MetricSpec} */
export const HorizontalPodAutoscaler = ({
  children,
  ...props
}: {
  /**
   * behavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively). If not set, the default HPAScalingRules for scale up and scale down are used.
   */
  behavior?: IHorizontalPodAutoscalerBehavior;
  /**
   * maxReplicas is the upper limit for the number of replicas to which the autoscaler can scale up. It cannot be less that minReplicas.
   */
  maxReplicas: number | bigint;
  /**
   * metrics contains the specifications for which to use to calculate the desired replica count (the maximum replica count across all metrics will be used).  The desired replica count is calculated multiplying the ratio between the target value and the current value by the current number of pods.  Ergo, metrics used must decrease as the pod count is increased, and vice-versa.  See the individual metric source types for more information about how each type of metric must respond. If not set, the default metric will be set to 80% average CPU utilization.
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
      id="io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler"
      kind="HorizontalPodAutoscaler"
      apiVersion="autoscaling/v2beta2"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * HorizontalPodAutoscalerBehavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively).
 *
 * Child components:
 * - scaleDown: {@link HPAScalingRules} with 'scaleDown' flag (single element)
 * - scaleUp: {@link HPAScalingRules} with 'scaleUp' flag (single element) */
export const HorizontalPodAutoscalerBehavior = ({
  children,
  ...props
}: {
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
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler",
          path: "spec.behavior",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerSpec",
          path: "behavior",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
 *
 * Child components:
 * - containerResource: {@link ContainerResourceMetricSource} (single element)
 * - external: {@link ExternalMetricSource} (single element)
 * - object: {@link ObjectMetricSource} (single element)
 * - pods: {@link PodsMetricSource} (single element)
 * - resource: {@link ResourceMetricSource} (single element) */
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
      id="io.k8s.api.autoscaling.v2beta2.MetricSpec"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler",
          path: "spec.metrics",
          isItem: true,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerSpec",
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

/** * ContainerResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set. */
export const ContainerResourceMetricSource = (props: {
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
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.ContainerResourceMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
          path: "containerResource",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
 *
 * Child components:
 * - metric: {@link MetricIdentifier} (single element) */
export const ExternalMetricSource = ({
  children,
  ...props
}: {
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.ExternalMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
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
 * - metric: {@link MetricIdentifier} (single element) */
export const ObjectMetricSource = ({
  children,
  ...props
}: {
  describedObject: ICrossVersionObjectReference;
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.ObjectMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
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
 * - metric: {@link MetricIdentifier} (single element) */
export const PodsMetricSource = ({
  children,
  ...props
}: {
  /**
   * metric identifies the target metric by name and selector
   */
  metric?: IMetricIdentifier;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.PodsMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
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

/** * ResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set. */
export const ResourceMetricSource = (props: {
  /**
   * name is the name of the resource in question.
   */
  name: string;
  /**
   * target specifies the target value for the given metric
   */
  target: IMetricTarget;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.ResourceMetricSource"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
          path: "resource",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * MetricIdentifier defines the name and optionally selector for a metric
 *
 * Child components:
 * - selector: {@link LabelSelector} (single element) */
export const MetricIdentifier = ({
  children,
  ...props
}: {
  /**
   * name is the name of the given metric
   */
  name: string;
  /**
   * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping. When unset, just the metricName will be used to gather metrics.
   */
  selector?: ILabelSelector;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.MetricIdentifier"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.ExternalMetricSource",
          path: "metric",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.ExternalMetricStatus",
          path: "metric",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.ObjectMetricSource",
          path: "metric",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.ObjectMetricStatus",
          path: "metric",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.PodsMetricSource",
          path: "metric",
          isItem: false,
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.PodsMetricStatus",
          path: "metric",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * HPAScalingRules configures the scaling behavior for one direction. These Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.
 *
 * Child components:
 * - policies: {@link HPAScalingPolicy} */
export const HPAScalingRules = ({
  children,
  ...props
}: {
  /**
   * policies is a list of potential scaling polices which can be used during scaling. At least one policy must be specified, otherwise the HPAScalingRules will be discarded as invalid
   */
  policies?: IHPAScalingPolicy[];
  /**
   * selectPolicy is used to specify which policy should be used. If not set, the default value MaxPolicySelect is used.
   */
  selectPolicy?: string;
  /**
   * StabilizationWindowSeconds is the number of seconds for which past recommendations should be considered while scaling up or scaling down. StabilizationWindowSeconds must be greater than or equal to zero and less than or equal to 3600 (one hour). If not set, use the default values: - For scale up: 0 (i.e. no stabilization is done). - For scale down: 300 (i.e. the stabilization window is 300 seconds long).
   */
  stabilizationWindowSeconds?: number | bigint;
  children?: React.ReactNode;
} & ({ scaleDown: boolean } | { scaleUp: boolean })) => {
  const { childProps, flag } = useKubeProps(props, {
    flags: ["scaleDown", "scaleUp"],
  });
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.HPAScalingRules"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
          path: "scaleDown",
          isItem: false,
          flag: "scaleDown",
        },
        {
          id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
          path: "scaleUp",
          isItem: false,
          flag: "scaleUp",
        },
      ]}
      value={childProps}
      flag={flag}
    >
      {children}
    </Item>
  );
};

/** * HPAScalingPolicy is a single policy which must hold true for a specified past interval. */
HPAScalingRules.HPAScalingPolicy = (props: {
  /**
   * PeriodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
   */
  periodSeconds: number | bigint;
  /**
   * Type is used to specify the scaling policy.
   */
  type: string;
  /**
   * Value contains the amount of change which is permitted by the policy. It must be greater than zero
   */
  value: number | bigint;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.autoscaling.v2beta2.HPAScalingPolicy"
      contexts={[
        {
          id: "io.k8s.api.autoscaling.v2beta2.HPAScalingRules",
          path: "policies",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
