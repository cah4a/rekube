import { IToleration } from "core/v1";
import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";

/**
 * Overhead structure represents the resource overhead associated with running a pod.
 */
export interface IOverhead {
  /**
   * PodFixed represents the fixed resource overhead associated with running a pod.
   */
  podFixed?: Record<string, string>;
}

/**
 * Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
 */
export interface IScheduling {
  /**
   * nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.
   */
  nodeSelector?: Record<string, string>;
  /**
   * tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.
   */
  tolerations?: IToleration[];
}

/** * RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are (currently) manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://git.k8s.io/enhancements/keps/sig-node/runtime-class.md
 *
 * Child components:
 * - spec.scheduling: {@link Scheduling} (single element) */
export const RuntimeClass = ({
  children,
  ...props
}: {
  /**
   * Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. For more details, see https://git.k8s.io/enhancements/keps/sig-node/20190226-pod-overhead.md This field is alpha-level as of Kubernetes v1.15, and is only honored by servers that enable the PodOverhead feature.
   */
  overhead?: IOverhead;
  /**
   * RuntimeHandler specifies the underlying runtime and configuration that the CRI implementation will use to handle pods of this class. The possible values are specific to the node & CRI configuration.  It is assumed that all handlers are available on every node, and handlers of the same name are equivalent on every node. For example, a handler called "runc" might specify that the runc OCI runtime (using native Linux containers) will be used to run the containers in a pod. The RuntimeHandler must be lowercase, conform to the DNS Label (RFC 1123) requirements, and is immutable.
   */
  runtimeHandler: string;
  /**
   * Scheduling holds the scheduling constraints to ensure that pods running with this RuntimeClass are scheduled to nodes that support it. If scheduling is nil, this RuntimeClass is assumed to be supported by all nodes.
   */
  scheduling?: IScheduling;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.node.v1alpha1.RuntimeClass"
      kind="RuntimeClass"
      apiVersion="node.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
 *
 * Child components:
 * - tolerations: {@link Toleration} */
export const Scheduling = ({
  children,
  ...props
}: {
  /**
   * nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.
   */
  nodeSelector?: Record<string, string>;
  /**
   * tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.
   */
  tolerations?: IToleration[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.node.v1alpha1.Scheduling"
      contexts={[
        {
          id: "io.k8s.api.node.v1alpha1.RuntimeClass",
          path: "spec.scheduling",
          isItem: false,
        },
        {
          id: "io.k8s.api.node.v1alpha1.RuntimeClassSpec",
          path: "scheduling",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};
