import { IObjectMeta, ILabelSelector, IPreconditions } from "meta/v1";
import { IntOrString, useKubeProps, Resource } from "rekube";

/** * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element) */
export const PodDisruptionBudget = ({
  children,
  ...props
}: {
  /**
   * An eviction is allowed if at most "maxUnavailable" pods selected by "selector" are unavailable after the eviction, i.e. even in absence of the evicted pod. For example, one can prevent all voluntary evictions by specifying 0. This is a mutually exclusive setting with "minAvailable".
   */
  maxUnavailable?: IntOrString;
  /**
   * An eviction is allowed if at least "minAvailable" pods selected by "selector" will still be available after the eviction, i.e. even in the absence of the evicted pod.  So for example you can prevent all voluntary evictions by specifying "100%".
   */
  minAvailable?: IntOrString;
  /**
   * Label query over pods whose evictions are managed by the disruption budget. A null selector will match no pods, while an empty ({}) selector will select all pods within the namespace.
   */
  selector?: ILabelSelector;
  /**
   * UnhealthyPodEvictionPolicy defines the criteria for when unhealthy pods should be considered for eviction. Current implementation considers healthy pods, as pods that have status.conditions item with type="Ready",status="True".
   *
   * Valid policies are IfHealthyBudget and AlwaysAllow. If no policy is specified, the default behavior will be used, which corresponds to the IfHealthyBudget policy.
   *
   * IfHealthyBudget policy means that running pods (status.phase="Running"), but not yet healthy can be evicted only if the guarded application is not disrupted (status.currentHealthy is at least equal to status.desiredHealthy). Healthy pods will be subject to the PDB for eviction.
   *
   * AlwaysAllow policy means that all running pods (status.phase="Running"), but not yet healthy are considered disrupted and can be evicted regardless of whether the criteria in a PDB is met. This means perspective running pods of a disrupted application might not get a chance to become healthy. Healthy pods will be subject to the PDB for eviction.
   *
   * Additional policies may be added in the future. Clients making eviction decisions should disallow eviction of unhealthy pods if they encounter an unrecognized policy in this field.
   *
   * This field is beta-level. The eviction API uses this field when the feature gate PDBUnhealthyPodEvictionPolicy is enabled (enabled by default).
   */
  unhealthyPodEvictionPolicy?: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.policy.v1.PodDisruptionBudget"
      kind="PodDisruptionBudget"
      apiVersion="policy/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions. */
export const Eviction = (
  props: {
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     */
    dryRun?: string[];
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     */
    gracePeriodSeconds?: number | bigint;
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
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "deleteOptions",
  });
  return (
    <Resource
      id="io.k8s.api.policy.v1.Eviction"
      kind="Eviction"
      apiVersion="policy/v1"
      props={childProps}
    />
  );
};
