import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * DEPRECATED - This group version of PriorityClass is deprecated by scheduling.k8s.io/v1/PriorityClass. PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer. */
export const PriorityClass = (
  props: {
    /**
     * description is an arbitrary string that usually provides guidelines on when this priority class should be used.
     */
    description?: string;
    /**
     * globalDefault specifies whether this PriorityClass should be considered as the default priority for pods that do not have any priority class. Only one PriorityClass can be marked as `globalDefault`. However, if more than one PriorityClasses exists with their `globalDefault` field set to true, the smallest value of such global default PriorityClasses will be used as the default priority.
     */
    globalDefault?: boolean;
    /**
     * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset. This field is beta-level, gated by the NonPreemptingPriority feature-gate.
     */
    preemptionPolicy?: string;
    /**
     * The value of this priority class. This is the actual priority that pods receive when they have the name of this class in their pod spec.
     */
    value: number | bigint;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.scheduling.v1alpha1.PriorityClass"
      kind="PriorityClass"
      apiVersion="scheduling.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};
