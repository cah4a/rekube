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
   * Partition indicates the ordinal at which the StatefulSet should be partitioned.
   */
  partition?: number | bigint;
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
   * Type indicates the type of the StatefulSetUpdateStrategy.
   */
  type?: string;
}

/**
 * DEPRECATED.
 */
export interface IRollbackConfig {
  /**
   * The revision to rollback to. If set to 0, rollback to the last revision.
   */
  revision?: number | bigint;
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

/** * DEPRECATED - This group version of ControllerRevision is deprecated by apps/v1beta2/ControllerRevision. See the release notes for more information. ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers. */
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
      id="io.k8s.api.apps.v1beta1.ControllerRevision"
      kind="ControllerRevision"
      apiVersion="apps/v1beta1"
      props={childProps}
    />
  );
};

/** * DEPRECATED - This group version of Deployment is deprecated by apps/v1beta2/Deployment. See the release notes for more information. Deployment enables declarative updates for Pods and ReplicaSets.
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
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 2.
   */
  revisionHistoryLimit?: number | bigint;
  /**
   * DEPRECATED. The config this deployment is rolling back to. Will be cleared after rollback is done.
   */
  rollbackTo?: IRollbackConfig;
  /**
   * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment.
   */
  selector?: ILabelSelector;
  /**
   * The deployment strategy to use to replace existing pods with new ones.
   */
  strategy?: IDeploymentStrategy;
  /**
   * Template describes the pods that will be created.
   */
  template?: IPodTemplateSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apps.v1beta1.Deployment"
      kind="Deployment"
      apiVersion="apps/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED. DeploymentRollback stores the information required to rollback a deployment. */
export const DeploymentRollback = (props: {
  /**
   * Required: This must match the Name of a deployment.
   */
  name: string;
  /**
   * The config of this deployment rollback.
   */
  rollbackTo: IRollbackConfig;
  /**
   * The annotations to be updated to a deployment
   */
  updatedAnnotations?: Record<string, string>;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.apps.v1beta1.DeploymentRollback"
      kind="DeploymentRollback"
      apiVersion="apps/v1beta1"
      props={childProps}
    />
  );
};

/** * DEPRECATED - This group version of StatefulSet is deprecated by apps/v1beta2/StatefulSet. See the release notes for more information. StatefulSet represents a set of pods with consistent identities. Identities are defined as:
 * - Network: A single stable DNS and hostname.
 * - Storage: As many VolumeClaims as requested.
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
   * selector is a label query over pods that should match the replica count. If empty, defaulted to labels on the pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: ILabelSelector;
  /**
   * serviceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.
   */
  serviceName: string;
  /**
   * template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet.
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
      id="io.k8s.api.apps.v1beta1.StatefulSet"
      kind="StatefulSet"
      apiVersion="apps/v1beta1"
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
   * Type indicates the type of the StatefulSetUpdateStrategy.
   */
  type?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.apps.v1beta1.StatefulSetUpdateStrategy"
      contexts={[
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSet",
          path: "spec.updateStrategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
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
      id="io.k8s.api.apps.v1beta1.DeploymentStrategy"
      contexts={[
        {
          id: "io.k8s.api.apps.v1beta1.Deployment",
          path: "spec.strategy",
          isItem: false,
        },
        {
          id: "io.k8s.api.apps.v1beta1.DeploymentSpec",
          path: "strategy",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
