import { IOwnerReference, IObjectMeta } from "meta/v1";
import { IJobSpec } from "batch/v1";
import { Resource, useResourceProps } from "rekube";

/**
 * JobTemplateSpec describes the data a Job should have when created from a template
 */
export interface IJobTemplateSpec {
  /**
   * Standard object's metadata of the jobs created from this template. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
   */
  metadata?: IObjectMeta;
  /**
   * Specification of the desired behavior of the job. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
   */
  spec?: IJobSpec;
}

/**
 * CronJob represents the configuration of a single cron job.
 *
 * Child components:
 * - spec.jobTemplate.spec.podFailurePolicy.rules: {@link PodFailurePolicyRule}
 * - spec.jobTemplate.spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.jobTemplate.spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.jobTemplate.spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.jobTemplate.spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.jobTemplate.spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.jobTemplate.spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.jobTemplate.spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.jobTemplate.spec.template.spec.containers: {@link Container}
 * - spec.jobTemplate.spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.jobTemplate.spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.jobTemplate.spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.jobTemplate.spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.jobTemplate.spec.template.spec.initContainers: {@link Container}
 * - spec.jobTemplate.spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.jobTemplate.spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.jobTemplate.spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.jobTemplate.spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.jobTemplate.spec.template.spec.tolerations: {@link Toleration}
 * - spec.jobTemplate.spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.jobTemplate.spec.template.spec.volumes: {@link Volume}
 */
export function CronJob({
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
   * Specifies how to treat concurrent executions of a Job. Valid values are: - "Allow" (default): allows CronJobs to run concurrently; - "Forbid": forbids concurrent runs, skipping next run if previous run hasn't finished yet; - "Replace": cancels currently running job and replaces it with a new one
   */
  concurrencyPolicy?: string;
  /**
   * The number of failed finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified.
   */
  failedJobsHistoryLimit?: number;
  /**
   * Specifies the job that will be created when executing a CronJob.
   */
  jobTemplate: IJobTemplateSpec;
  /**
   * The schedule in Cron format, see https://en.wikipedia.org/wiki/Cron.
   */
  schedule: string;
  /**
   * Optional deadline in seconds for starting the job if it misses scheduled time for any reason.  Missed jobs executions will be counted as failed ones.
   */
  startingDeadlineSeconds?: number;
  /**
   * The number of successful finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified.
   */
  successfulJobsHistoryLimit?: number;
  /**
   * This flag tells the controller to suspend subsequent executions, it does not apply to already started executions.  Defaults to false.
   */
  suspend?: boolean;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="CronJob"
      apiVersion="batch/v2alpha1"
      id="io.k8s.api.batch.v2alpha1.CronJob"
      props={childProps}
    >
      {children}
    </Resource>
  );
}
