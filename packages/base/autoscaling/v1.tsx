import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export interface ICrossVersionObjectReference {
  /**
   * name is the name of the referent; More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   */
  name: string;
}

/** * configuration of a horizontal pod autoscaler. */
export const HorizontalPodAutoscaler = (
  props: {
    /**
     * maxReplicas is the upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than MinReplicas.
     */
    maxReplicas: number | bigint;
    /**
     * minReplicas is the lower limit for the number of replicas to which the autoscaler can scale down.  It defaults to 1 pod.  minReplicas is allowed to be 0 if the alpha feature gate HPAScaleToZero is enabled and at least one Object or External metric is configured.  Scaling is active as long as at least one metric value is available.
     */
    minReplicas?: number | bigint;
    /**
     * reference to scaled resource; horizontal pod autoscaler will learn the current resource consumption and will set the desired number of pods by using its Scale subresource.
     */
    scaleTargetRef: ICrossVersionObjectReference;
    /**
     * targetCPUUtilizationPercentage is the target average CPU utilization (represented as a percentage of requested CPU) over all the pods; if not specified the default autoscaling policy will be used.
     */
    targetCPUUtilizationPercentage?: number | bigint;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler"
      kind="HorizontalPodAutoscaler"
      apiVersion="autoscaling/v1"
      props={childProps}
    />
  );
};
