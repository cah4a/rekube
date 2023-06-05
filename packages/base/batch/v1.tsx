import { IOwnerReference, ILabelSelector, IObjectMeta } from "meta/v1";
import { IPodTemplateSpec } from "core/v1";
import { Resource, useResourceProps, Item } from "rekube";

/**
 * PodFailurePolicy describes how failed pods influence the backoffLimit.
 */
export interface IPodFailurePolicy {
  /**
   * A list of pod failure policy rules. The rules are evaluated in order. Once a rule matches a Pod failure, the remaining of the rules are ignored. When no rule matches the Pod failure, the default handling applies - the counter of pod failures is incremented and it is checked against the backoffLimit. At most 20 elements are allowed.
   */
  rules: IPodFailurePolicyRule[];
}

/**
 * PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.
 */
export interface IPodFailurePolicyRule {
  /**
   * Specifies the action taken on a pod failure when the requirements are satisfied. Possible values are:
   *
   * - FailJob: indicates that the pod's job is marked as Failed and all
   * running pods are terminated.
   * - Ignore: indicates that the counter towards the .backoffLimit is not
   * incremented and a replacement pod is created.
   * - Count: indicates that the pod is handled in the default way - the
   * counter towards the .backoffLimit is incremented.
   * Additional values are considered to be added in the future. Clients should react to an unknown action by skipping the rule.
   */
  action: string;
  /**
   * Represents the requirement on the container exit codes.
   */
  onExitCodes?: IPodFailurePolicyOnExitCodesRequirement;
  /**
   * Represents the requirement on the pod conditions. The requirement is represented as a list of pod condition patterns. The requirement is satisfied if at least one pattern matches an actual pod condition. At most 20 elements are allowed.
   */
  onPodConditions: IPodFailurePolicyOnPodConditionsPattern[];
}

/**
 * PodFailurePolicyOnExitCodesRequirement describes the requirement for handling a failed pod based on its container exit codes. In particular, it lookups the .state.terminated.exitCode for each app container and init container status, represented by the .status.containerStatuses and .status.initContainerStatuses fields in the Pod status, respectively. Containers completed with success (exit code 0) are excluded from the requirement check.
 */
export interface IPodFailurePolicyOnExitCodesRequirement {
  /**
   * Restricts the check for exit codes to the container with the specified name. When null, the rule applies to all containers. When specified, it should match one the container or initContainer names in the pod template.
   */
  containerName?: string;
  /**
   * Represents the relationship between the container exit code(s) and the specified values. Containers completed with success (exit code 0) are excluded from the requirement check. Possible values are:
   *
   * - In: the requirement is satisfied if at least one container exit code
   * (might be multiple if there are multiple containers not restricted
   * by the 'containerName' field) is in the set of specified values.
   * - NotIn: the requirement is satisfied if at least one container exit code
   * (might be multiple if there are multiple containers not restricted
   * by the 'containerName' field) is not in the set of specified values.
   * Additional values are considered to be added in the future. Clients should react to an unknown operator by assuming the requirement is not satisfied.
   */
  operator: string;
  /**
   * Specifies the set of values. Each returned container exit code (might be multiple in case of multiple containers) is checked against this set of values with respect to the operator. The list of values must be ordered and must not contain duplicates. Value '0' cannot be used for the In operator. At least one element is required. At most 255 elements are allowed.
   */
  values: number[];
}

/**
 * PodFailurePolicyOnPodConditionsPattern describes a pattern for matching an actual pod condition type.
 */
export interface IPodFailurePolicyOnPodConditionsPattern {
  /**
   * Specifies the required Pod condition type. To match a pod condition it is required that specified type equals the pod condition type.
   */
  type: string;
}

/**
 * JobSpec describes how the job execution will look like.
 */
export interface IJobSpec {
  /**
   * Specifies the duration in seconds relative to the startTime that the job may be continuously active before the system tries to terminate it; value must be positive integer. If a Job is suspended (at creation or through an update), this timer will effectively be stopped and reset when the Job is resumed again.
   */
  activeDeadlineSeconds?: number;
  /**
   * Specifies the number of retries before marking this job failed. Defaults to 6
   */
  backoffLimit?: number;
  /**
   * completionMode specifies how Pod completions are tracked. It can be `NonIndexed` (default) or `Indexed`.
   *
   * `NonIndexed` means that the Job is considered complete when there have been .spec.completions successfully completed Pods. Each Pod completion is homologous to each other.
   *
   * `Indexed` means that the Pods of a Job get an associated completion index from 0 to (.spec.completions - 1), available in the annotation batch.kubernetes.io/job-completion-index. The Job is considered complete when there is one successfully completed Pod for each index. When value is `Indexed`, .spec.completions must be specified and `.spec.parallelism` must be less than or equal to 10^5. In addition, The Pod name takes the form `$(job-name)-$(index)-$(random-string)`, the Pod hostname takes the form `$(job-name)-$(index)`.
   *
   * More completion modes can be added in the future. If the Job controller observes a mode that it doesn't recognize, which is possible during upgrades due to version skew, the controller skips updates for the Job.
   */
  completionMode?: string;
  /**
   * Specifies the desired number of successfully finished pods the job should be run with.  Setting to null means that the success of any pod signals the success of all pods, and allows parallelism to have any positive value.  Setting to 1 means that parallelism is limited to 1 and the success of that pod signals the success of the job. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  completions?: number;
  /**
   * manualSelector controls generation of pod labels and pod selectors. Leave `manualSelector` unset unless you are certain what you are doing. When false or unset, the system pick labels unique to this job and appends those labels to the pod template.  When true, the user is responsible for picking unique labels and specifying the selector.  Failure to pick a unique label may cause this and other jobs to not function correctly.  However, You may see `manualSelector=true` in jobs that were created with the old `extensions/v1beta1` API. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#specifying-your-own-pod-selector
   */
  manualSelector?: boolean;
  /**
   * Specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when ((.spec.completions - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  parallelism?: number;
  /**
   * Specifies the policy of handling failed pods. In particular, it allows to specify the set of actions and conditions which need to be satisfied to take the associated action. If empty, the default behaviour applies - the counter of failed pods, represented by the jobs's .status.failed field, is incremented and it is checked against the backoffLimit. This field cannot be used in combination with restartPolicy=OnFailure.
   *
   * This field is alpha-level. To use this field, you must enable the `JobPodFailurePolicy` feature gate (disabled by default).
   */
  podFailurePolicy?: IPodFailurePolicy;
  /**
   * A label query over pods that should match the pod count. Normally, the system sets this field for you. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * suspend specifies whether the Job controller should create Pods or not. If a Job is created with suspend set to true, no Pods are created by the Job controller. If a Job is suspended after creation (i.e. the flag goes from false to true), the Job controller will delete all active Pods associated with this Job. Users must design their workload to gracefully handle this. Suspending a Job will reset the StartTime field of the Job, effectively resetting the ActiveDeadlineSeconds timer too. Defaults to false.
   */
  suspend?: boolean;
  /**
   * Describes the pod that will be created when executing a job. The only allowed template.spec.restartPolicy values are "Never" or "OnFailure". More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  template: IPodTemplateSpec;
  /**
   * ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won't be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes.
   */
  ttlSecondsAfterFinished?: number;
}

/**
 * JobTemplateSpec describes the data a Job should have when created from a template
 */
export interface IJobTemplateSpec {
  /**
   * Standard object's metadata of the jobs created from this template. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: IObjectMeta;
  /**
   * Specification of the desired behavior of the job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec?: IJobSpec;
}

/**
 * Job represents the configuration of a single job.
 *
 * Child components:
 * - spec.podFailurePolicy.rules: {@link PodFailurePolicyRule}
 * - spec.selector.matchExpressions: {@link LabelSelectorRequirement}
 * - spec.template.spec.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link PreferredSchedulingTerm}
 * - spec.template.spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms: {@link NodeSelectorTerm}
 * - spec.template.spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution: {@link WeightedPodAffinityTerm}
 * - spec.template.spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution: {@link PodAffinityTerm}
 * - spec.template.spec.containers: {@link Container}
 * - spec.template.spec.dnsConfig.options: {@link PodDNSConfigOption}
 * - spec.template.spec.ephemeralContainers: {@link EphemeralContainer}
 * - spec.template.spec.hostAliases: {@link HostAlias}
 * - spec.template.spec.imagePullSecrets: {@link LocalObjectReference}
 * - spec.template.spec.initContainers: {@link Container}
 * - spec.template.spec.readinessGates: {@link PodReadinessGate}
 * - spec.template.spec.resourceClaims: {@link PodResourceClaim}
 * - spec.template.spec.schedulingGates: {@link PodSchedulingGate}
 * - spec.template.spec.securityContext.sysctls: {@link Sysctl}
 * - spec.template.spec.tolerations: {@link Toleration}
 * - spec.template.spec.topologySpreadConstraints: {@link TopologySpreadConstraint}
 * - spec.template.spec.volumes: {@link Volume}
 */
export function Job({
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
   * Specifies the duration in seconds relative to the startTime that the job may be continuously active before the system tries to terminate it; value must be positive integer. If a Job is suspended (at creation or through an update), this timer will effectively be stopped and reset when the Job is resumed again.
   */
  activeDeadlineSeconds?: number;
  /**
   * Specifies the number of retries before marking this job failed. Defaults to 6
   */
  backoffLimit?: number;
  /**
   * completionMode specifies how Pod completions are tracked. It can be `NonIndexed` (default) or `Indexed`.
   *
   * `NonIndexed` means that the Job is considered complete when there have been .spec.completions successfully completed Pods. Each Pod completion is homologous to each other.
   *
   * `Indexed` means that the Pods of a Job get an associated completion index from 0 to (.spec.completions - 1), available in the annotation batch.kubernetes.io/job-completion-index. The Job is considered complete when there is one successfully completed Pod for each index. When value is `Indexed`, .spec.completions must be specified and `.spec.parallelism` must be less than or equal to 10^5. In addition, The Pod name takes the form `$(job-name)-$(index)-$(random-string)`, the Pod hostname takes the form `$(job-name)-$(index)`.
   *
   * More completion modes can be added in the future. If the Job controller observes a mode that it doesn't recognize, which is possible during upgrades due to version skew, the controller skips updates for the Job.
   */
  completionMode?: string;
  /**
   * Specifies the desired number of successfully finished pods the job should be run with.  Setting to null means that the success of any pod signals the success of all pods, and allows parallelism to have any positive value.  Setting to 1 means that parallelism is limited to 1 and the success of that pod signals the success of the job. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  completions?: number;
  /**
   * manualSelector controls generation of pod labels and pod selectors. Leave `manualSelector` unset unless you are certain what you are doing. When false or unset, the system pick labels unique to this job and appends those labels to the pod template.  When true, the user is responsible for picking unique labels and specifying the selector.  Failure to pick a unique label may cause this and other jobs to not function correctly.  However, You may see `manualSelector=true` in jobs that were created with the old `extensions/v1beta1` API. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#specifying-your-own-pod-selector
   */
  manualSelector?: boolean;
  /**
   * Specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when ((.spec.completions - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  parallelism?: number;
  /**
   * Specifies the policy of handling failed pods. In particular, it allows to specify the set of actions and conditions which need to be satisfied to take the associated action. If empty, the default behaviour applies - the counter of failed pods, represented by the jobs's .status.failed field, is incremented and it is checked against the backoffLimit. This field cannot be used in combination with restartPolicy=OnFailure.
   *
   * This field is alpha-level. To use this field, you must enable the `JobPodFailurePolicy` feature gate (disabled by default).
   */
  podFailurePolicy?: IPodFailurePolicy;
  /**
   * A label query over pods that should match the pod count. Normally, the system sets this field for you. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * suspend specifies whether the Job controller should create Pods or not. If a Job is created with suspend set to true, no Pods are created by the Job controller. If a Job is suspended after creation (i.e. the flag goes from false to true), the Job controller will delete all active Pods associated with this Job. Users must design their workload to gracefully handle this. Suspending a Job will reset the StartTime field of the Job, effectively resetting the ActiveDeadlineSeconds timer too. Defaults to false.
   */
  suspend?: boolean;
  /**
   * Describes the pod that will be created when executing a job. The only allowed template.spec.restartPolicy values are "Never" or "OnFailure". More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  template: IPodTemplateSpec;
  /**
   * ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won't be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes.
   */
  ttlSecondsAfterFinished?: number;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="Job"
      apiVersion="batch/v1"
      id="io.k8s.api.batch.v1.Job"
      props={childProps}
    >
      {children}
    </Resource>
  );
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
   * Specifies how to treat concurrent executions of a Job. Valid values are:
   *
   * - "Allow" (default): allows CronJobs to run concurrently; - "Forbid": forbids concurrent runs, skipping next run if previous run hasn't finished yet; - "Replace": cancels currently running job and replaces it with a new one
   */
  concurrencyPolicy?: string;
  /**
   * The number of failed finished jobs to retain. Value must be non-negative integer. Defaults to 1.
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
   * The number of successful finished jobs to retain. Value must be non-negative integer. Defaults to 3.
   */
  successfulJobsHistoryLimit?: number;
  /**
   * This flag tells the controller to suspend subsequent executions, it does not apply to already started executions.  Defaults to false.
   */
  suspend?: boolean;
  /**
   * The time zone name for the given schedule, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. If not specified, this will default to the time zone of the kube-controller-manager process. The set of valid time zone names and the time zone offset is loaded from the system-wide time zone database by the API server during CronJob validation and the controller manager during execution. If no system-wide time zone database can be found a bundled version of the database is used instead. If the time zone name becomes invalid during the lifetime of a CronJob or due to a change in host configuration, the controller will stop creating new new Jobs and will create a system event with the reason UnknownTimeZone. More information can be found in https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#time-zones
   */
  timeZone?: string;
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="CronJob"
      apiVersion="batch/v1"
      id="io.k8s.api.batch.v1.CronJob"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.
 *
 * Child components:
 * - onPodConditions: {@link PodFailurePolicyOnPodConditionsPattern}
 */
export function PodFailurePolicyRule({
  children,
  ...props
}: {
  /**
   * Specifies the action taken on a pod failure when the requirements are satisfied. Possible values are:
   *
   * - FailJob: indicates that the pod's job is marked as Failed and all
   * running pods are terminated.
   * - Ignore: indicates that the counter towards the .backoffLimit is not
   * incremented and a replacement pod is created.
   * - Count: indicates that the pod is handled in the default way - the
   * counter towards the .backoffLimit is incremented.
   * Additional values are considered to be added in the future. Clients should react to an unknown action by skipping the rule.
   */
  action: string;
  /**
   * Represents the requirement on the container exit codes.
   */
  onExitCodes?: IPodFailurePolicyOnExitCodesRequirement;
  /**
   * Represents the requirement on the pod conditions. The requirement is represented as a list of pod condition patterns. The requirement is satisfied if at least one pattern matches an actual pod condition. At most 20 elements are allowed.
   */
  onPodConditions: IPodFailurePolicyOnPodConditionsPattern[];
  children?: React.ReactNode;
}) {
  return (
    <Item
      id="io.k8s.api.batch.v1.PodFailurePolicyRule"
      paths={{
        "io.k8s.api.batch.v1.Job": "spec.podFailurePolicy.rules",
        "io.k8s.api.batch.v1beta1.CronJob":
          "spec.jobTemplate.spec.podFailurePolicy.rules",
        "io.k8s.api.batch.v2alpha1.CronJob":
          "spec.jobTemplate.spec.podFailurePolicy.rules",
        "io.k8s.api.batch.v1.CronJob":
          "spec.jobTemplate.spec.podFailurePolicy.rules",
      }}
      value={props}
    >
      {children}
    </Item>
  );
}

/**
 * PodFailurePolicyOnPodConditionsPattern describes a pattern for matching an actual pod condition type.
 */
export function PodFailurePolicyOnPodConditionsPattern(props: {
  /**
   * Specifies the required Pod condition type. To match a pod condition it is required that specified type equals the pod condition type.
   */
  type: string;
}) {
  return (
    <Item
      id="io.k8s.api.batch.v1.PodFailurePolicyOnPodConditionsPattern"
      paths={{ "io.k8s.api.batch.v1.PodFailurePolicyRule": "onPodConditions" }}
      value={props}
    />
  );
}
