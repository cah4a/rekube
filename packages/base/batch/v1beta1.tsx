import { IPodFailurePolicy } from "batch/v1";
import { ILabelSelector, IObjectMeta } from "meta/v1";
import { IPodTemplateSpec } from "core/v1";
import { useKubeProps, Resource, Item } from "rekube";

/**
 * JobTemplateSpec describes the data a Job should have when created from a template
 */
export interface IJobTemplateSpec {
  /**
   * Specifies the duration in seconds relative to the startTime that the job may be continuously active before the system tries to terminate it; value must be positive integer. If a Job is suspended (at creation or through an update), this timer will effectively be stopped and reset when the Job is resumed again.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * Specifies the number of retries before marking this job failed. Defaults to 6
   */
  backoffLimit?: number | bigint;
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
  completions?: number | bigint;
  /**
   * manualSelector controls generation of pod labels and pod selectors. Leave `manualSelector` unset unless you are certain what you are doing. When false or unset, the system pick labels unique to this job and appends those labels to the pod template.  When true, the user is responsible for picking unique labels and specifying the selector.  Failure to pick a unique label may cause this and other jobs to not function correctly.  However, You may see `manualSelector=true` in jobs that were created with the old `extensions/v1beta1` API. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#specifying-your-own-pod-selector
   */
  manualSelector?: boolean;
  /**
   * Specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when ((.spec.completions - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  parallelism?: number | bigint;
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
  template?: IPodTemplateSpec;
  /**
   * ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won't be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes.
   */
  ttlSecondsAfterFinished?: number | bigint;
}

/** * CronJob represents the configuration of a single cron job.
 *
 * Child components:
 * - spec.jobTemplate: {@link JobTemplateSpec} (single element) */
export const CronJob = ({
  children,
  ...props
}: {
  /**
   * Specifies how to treat concurrent executions of a Job. Valid values are: - "Allow" (default): allows CronJobs to run concurrently; - "Forbid": forbids concurrent runs, skipping next run if previous run hasn't finished yet; - "Replace": cancels currently running job and replaces it with a new one
   */
  concurrencyPolicy?: string;
  /**
   * The number of failed finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   */
  failedJobsHistoryLimit?: number | bigint;
  /**
   * Specifies the job that will be created when executing a CronJob.
   */
  jobTemplate?: IJobTemplateSpec;
  /**
   * The schedule in Cron format, see https://en.wikipedia.org/wiki/Cron.
   */
  schedule: string;
  /**
   * Optional deadline in seconds for starting the job if it misses scheduled time for any reason.  Missed jobs executions will be counted as failed ones.
   */
  startingDeadlineSeconds?: number | bigint;
  /**
   * The number of successful finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified. Defaults to 3.
   */
  successfulJobsHistoryLimit?: number | bigint;
  /**
   * This flag tells the controller to suspend subsequent executions, it does not apply to already started executions.  Defaults to false.
   */
  suspend?: boolean;
  /**
   * The time zone for the given schedule, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. If not specified, this will rely on the time zone of the kube-controller-manager process. ALPHA: This field is in alpha and must be enabled via the `CronJobTimeZone` feature gate.
   */
  timeZone?: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.batch.v1beta1.CronJob"
      kind="CronJob"
      apiVersion="batch/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * JobTemplateSpec describes the data a Job should have when created from a template
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.podFailurePolicy: {@link PodFailurePolicy} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element) */
export const JobTemplateSpec = ({
  children,
  ...props
}: {
  /**
   * Specifies the duration in seconds relative to the startTime that the job may be continuously active before the system tries to terminate it; value must be positive integer. If a Job is suspended (at creation or through an update), this timer will effectively be stopped and reset when the Job is resumed again.
   */
  activeDeadlineSeconds?: number | bigint;
  /**
   * Specifies the number of retries before marking this job failed. Defaults to 6
   */
  backoffLimit?: number | bigint;
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
  completions?: number | bigint;
  /**
   * manualSelector controls generation of pod labels and pod selectors. Leave `manualSelector` unset unless you are certain what you are doing. When false or unset, the system pick labels unique to this job and appends those labels to the pod template.  When true, the user is responsible for picking unique labels and specifying the selector.  Failure to pick a unique label may cause this and other jobs to not function correctly.  However, You may see `manualSelector=true` in jobs that were created with the old `extensions/v1beta1` API. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#specifying-your-own-pod-selector
   */
  manualSelector?: boolean;
  /**
   * Specifies the maximum desired number of pods the job should run at any given time. The actual number of pods running in steady state will be less than this number when ((.spec.completions - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  parallelism?: number | bigint;
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
  template?: IPodTemplateSpec;
  /**
   * ttlSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won't be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes.
   */
  ttlSecondsAfterFinished?: number | bigint;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Item
      id="io.k8s.api.batch.v1beta1.JobTemplateSpec"
      contexts={[
        {
          id: "io.k8s.api.batch.v1beta1.CronJob",
          path: "spec.jobTemplate",
          isItem: false,
        },
        {
          id: "io.k8s.api.batch.v1beta1.CronJobSpec",
          path: "jobTemplate",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};
