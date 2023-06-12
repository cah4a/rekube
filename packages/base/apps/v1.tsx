import {
  IntOrString,
  RawExtension,
  useKubeProps,
  Resource,
  Item,
} from "rekube";
import { IObjectMeta, ILabelSelector } from "meta/v1";
import { IPodTemplateSpec, IPersistentVolumeClaim } from "core/v1";

/**
 * Spec to control the desired behavior of daemon set rolling update.
 */
export interface IRollingUpdateDaemonSet {
  /**
   * The maximum number of nodes with an existing available DaemonSet pod that can have an updated DaemonSet pod during during an update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up to a minimum of 1. Default value is 0. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their a new pod created before the old pod is marked as deleted. The update starts by launching new pods on 30% of nodes. Once an updated pod is available (Ready for at least minReadySeconds) the old DaemonSet pod on that node is marked deleted. If the old pod becomes unavailable for any reason (Ready transitions to false, is evicted, or is drained) an updated pod is immediatedly created on that node without considering surge limits. Allowing surge implies the possibility that the resources consumed by the daemonset on any given node can double if the readiness check fails, and so resource intensive daemonsets should take into account that they may cause evictions during disruption.
   */
  maxSurge?: IntOrString;
  /**
   * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0 if MaxSurge is 0 Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
   */
  maxUnavailable?: IntOrString;
}

/**
 * Spec to control the desired behavior of rolling update.
 */
export interface IRollingUpdateDeployment {
  /**
   * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
   */
  maxSurge?: IntOrString;
  /**
   * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
   */
  maxUnavailable?: IntOrString;
}

/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export interface IRollingUpdateStatefulSetStrategy {
  /**
   * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up. This can not be 0. Defaults to 1. This field is alpha-level and is only honored by servers that enable the MaxUnavailableStatefulSet feature. The field applies to all pods in the range 0 to Replicas-1. That means if there is any unavailable pod in the range 0 to Replicas-1, it will be counted towards MaxUnavailable.
   */
  maxUnavailable?: IntOrString;
  /**
   * Partition indicates the ordinal at which the StatefulSet should be partitioned for updates. During a rolling update, all pods from ordinal Replicas-1 to Partition are updated. All pods from ordinal Partition-1 to 0 remain untouched. This is helpful in being able to do a canary based deployment. The default value is 0.
   */
  partition?: number | bigint;
}

/**
 * StatefulSetOrdinals describes the policy used for replica ordinal assignment in this StatefulSet.
 */
export interface IStatefulSetOrdinals {
  /**
   * start is the number representing the first replica's index. It may be used to number replicas from an alternate index (eg: 1-indexed) over the default 0-indexed names, or to orchestrate progressive movement of replicas from one StatefulSet to another. If set, replica indices will be in the range:
   * [.spec.ordinals.start, .spec.ordinals.start + .spec.replicas).
   * If unset, defaults to 0. Replica indices will be in the range:
   * [0, .spec.replicas).
   */
  start?: number | bigint;
}

/**
 * StatefulSetPersistentVolumeClaimRetentionPolicy describes the policy used for PVCs created from the StatefulSet VolumeClaimTemplates.
 */
export interface IStatefulSetPersistentVolumeClaimRetentionPolicy {
  /**
   * WhenDeleted specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is deleted. The default policy of `Retain` causes PVCs to not be affected by StatefulSet deletion. The `Delete` policy causes those PVCs to be deleted.
   */
  whenDeleted?: string;
  /**
   * WhenScaled specifies what happens to PVCs created from StatefulSet VolumeClaimTemplates when the StatefulSet is scaled down. The default policy of `Retain` causes PVCs to not be affected by a scaledown. The `Delete` policy causes the associated PVCs for any excess pods above the replica count to be deleted.
   */
  whenScaled?: string;
}

/**
 * StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy.
 */
export interface IStatefulSetUpdateStrategy {
  /**
   * RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.
   */
  rollingUpdate?: IRollingUpdateStatefulSetStrategy;
  /**
   * Type indicates the type of the StatefulSetUpdateStrategy. Default is RollingUpdate.
   */
  type?: string;
}

/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export interface IDeploymentStrategy {
  /**
   * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
   */
  rollingUpdate?: IRollingUpdateDeployment;
  /**
   * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
   */
  type?: string;
}

/**
 * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
 */
export interface IDaemonSetUpdateStrategy {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: IRollingUpdateDaemonSet;
  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
   */
  type?: string;
}

/** * ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers. */
export const ControllerRevision = (
  props: {
    /**
     * Data is the serialized representation of the state.
     */
    data?: RawExtension;
    /**
     * Revision indicates the revision of the state represented by Data.
     */
    revision: number | bigint;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.apps.v1.ControllerRevision"
      kind="ControllerRevision"
      apiVersion="apps/v1"
      props={childProps}
    />
  );
};

/** * DaemonSet represents the configuration of a daemon set.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element)
 * - spec.updateStrategy: {@link DaemonSetUpdateStrategy} (single element) */
export const DaemonSet = ({
  children,
  ...props
}: {
  /**
   * The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).
   */
  minReadySeconds?: number | bigint;
  /**
   * The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * A label query over pods that are managed by the daemon set. Must match in order to be controlled. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). The only allowed template.spec.restartPolicy value is "Always". More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  /**
   * An update strategy to replace existing DaemonSet pods with new pods.
   */
  updateStrategy?: IDaemonSetUpdateStrategy;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apps.v1.DaemonSet"
      kind="DaemonSet"
      apiVersion="apps/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Deployment enables declarative updates for Pods and ReplicaSets.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element)
 * - spec.strategy: {@link DeploymentStrategy} (single element) */
export const Deployment = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * Indicates that the deployment is paused.
   */
  paused?: boolean;
  /**
   * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.
   */
  progressDeadlineSeconds?: number | bigint;
  /**
   * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   */
  replicas?: number | bigint;
  /**
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment. It must match the pod template's labels.
   */
  selector?: ILabelSelector;
  /**
   * The deployment strategy to use to replace existing pods with new ones.
   */
  strategy?: IDeploymentStrategy;
  /**
   * Template describes the pods that will be created. The only allowed template.spec.restartPolicy value is "Always".
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apps.v1.Deployment"
      kind="Deployment"
      apiVersion="apps/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element) */
export const ReplicaSet = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
   */
  replicas?: number | bigint;
  /**
   * Selector is a label query over pods that should match the replica count. Label keys and values that must match in order to be controlled by this replica set. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * Template is the object that describes the pod that will be created if insufficient replicas are detected. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apps.v1.ReplicaSet"
      kind="ReplicaSet"
      apiVersion="apps/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * StatefulSet represents a set of pods with consistent identities. Identities are defined as:
 * - Network: A single stable DNS and hostname.
 * - Storage: As many VolumeClaims as requested.
 *
 * The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.template: {@link PodTemplateSpec} (single element)
 * - spec.updateStrategy: {@link StatefulSetUpdateStrategy} (single element) */
export const StatefulSet = ({
  children,
  ...props
}: {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number | bigint;
  /**
   * ordinals controls the numbering of replica indices in a StatefulSet. The default ordinals behavior assigns a "0" index to the first replica and increments the index by one for each additional replica requested. Using the ordinals field requires the StatefulSetStartOrdinal feature gate to be enabled, which is beta.
   */
  ordinals?: IStatefulSetOrdinals;
  /**
   * persistentVolumeClaimRetentionPolicy describes the lifecycle of persistent volume claims created from volumeClaimTemplates. By default, all persistent volume claims are created as needed and retained until manually deleted. This policy allows the lifecycle to be altered, for example by deleting persistent volume claims when their stateful set is deleted, or when their pod is scaled down. This requires the StatefulSetAutoDeletePVC feature gate to be enabled, which is alpha.  +optional
   */
  persistentVolumeClaimRetentionPolicy?: IStatefulSetPersistentVolumeClaimRetentionPolicy;
  /**
   * podManagementPolicy controls how pods are created during initial scale up, when replacing pods on nodes, or when scaling down. The default policy is `OrderedReady`, where pods are created in increasing order (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before continuing. When scaling down, the pods are removed in the opposite order. The alternative policy is `Parallel` which will create pods in parallel to match the desired scale without waiting, and on scale down will delete all pods at once.
   */
  podManagementPolicy?: string;
  /**
   * replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1.
   */
  replicas?: number | bigint;
  /**
   * revisionHistoryLimit is the maximum number of revisions that will be maintained in the StatefulSet's revision history. The revision history consists of all revisions not represented by a currently applied StatefulSetSpec version. The default value is 10.
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * selector is a label query over pods that should match the replica count. It must match the pod template's labels. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.
   */
  serviceName: string;
  /**
   * template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet. Each pod will be named with the format <statefulsetname>-<podindex>. For example, a pod in a StatefulSet named "web" with index number "3" would be named "web-3". The only allowed template.spec.restartPolicy value is "Always".
   */
  template?: IPodTemplateSpec;
  /**
   * updateStrategy indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.
   */
  updateStrategy?: IStatefulSetUpdateStrategy;
  /**
   * volumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name.
   */
  volumeClaimTemplates?: IPersistentVolumeClaim[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apps.v1.StatefulSet"
      kind="StatefulSet"
      apiVersion="apps/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy. */
export const StatefulSetUpdateStrategy = (props: {
  /**
   * RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.
   */
  rollingUpdate?: IRollingUpdateStatefulSetStrategy;
  /**
   * Type indicates the type of the StatefulSetUpdateStrategy. Default is RollingUpdate.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.apps.v1.StatefulSetUpdateStrategy"
      contexts={[
        {
          id: "io.k8s.api.apps.v1.StatefulSet",
          path: "spec.updateStrategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.StatefulSetSpec",
          path: "updateStrategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * DeploymentStrategy describes how to replace existing pods with new ones. */
export const DeploymentStrategy = (props: {
  /**
   * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
   */
  rollingUpdate?: IRollingUpdateDeployment;
  /**
   * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.apps.v1.DeploymentStrategy"
      contexts={[
        {
          id: "io.k8s.api.apps.v1.Deployment",
          path: "spec.strategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.DeploymentSpec",
          path: "strategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet. */
export const DaemonSetUpdateStrategy = (props: {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: IRollingUpdateDaemonSet;
  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.apps.v1.DaemonSetUpdateStrategy"
      contexts={[
        {
          id: "io.k8s.api.apps.v1.DaemonSet",
          path: "spec.updateStrategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1.DaemonSetSpec",
          path: "updateStrategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
