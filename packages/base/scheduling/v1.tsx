import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer. */
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
     * preemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
     */
    preemptionPolicy?: string;
    /**
     * value represents the integer value of this priority class. This is the actual priority that pods receive when they have the name of this class in their pod spec.
     */
    value: number | bigint;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.scheduling.v1.PriorityClass"
      kind="PriorityClass"
      apiVersion="scheduling.k8s.io/v1"
      props={childProps}
    />
  );
};
