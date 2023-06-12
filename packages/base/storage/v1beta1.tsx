import { IPersistentVolumeSpec, ITopologySelectorTerm } from "core/v1";
import { IObjectMeta, ILabelSelector } from "meta/v1";
import { useKubeProps, Resource, Quantity, Item } from "rekube";

/**
 * VolumeNodeResources is a set of resource limits for scheduling of volumes.
 */
export interface IVolumeNodeResources {
  /**
   * Maximum number of unique volumes managed by the CSI driver that can be used on a node. A volume that is both attached and mounted on a node is considered to be used once, not twice. The same rule applies for a unique volume that is shared among multiple pods on the same node. If this field is nil, then the supported number of volumes on this node is unbounded.
   */
  count?: number | bigint;
}

/**
 * VolumeAttachmentSource represents a volume that should be attached. Right now only PersistenVolumes can be attached via external attacher, in future we may allow also inline volumes in pods. Exactly one member can be set.
 */
export interface IVolumeAttachmentSource {
  /**
   * inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is beta-level and is only honored by servers that enabled the CSIMigration feature.
   */
  inlineVolumeSpec?: IPersistentVolumeSpec;
  /**
   * Name of the persistent volume to attach.
   */
  persistentVolumeName?: string;
}

/**
 * CSINodeDriver holds information about the specification of one CSI driver installed on a node
 */
export interface ICSINodeDriver {
  /**
   * allocatable represents the volume resources of a node that are available for scheduling.
   */
  allocatable?: IVolumeNodeResources;
  /**
   * This is the name of the CSI driver that this object refers to. This MUST be the same name returned by the CSI GetPluginName() call for that driver.
   */
  name: string;
  /**
   * nodeID of the node from the driver point of view. This field enables Kubernetes to communicate with storage systems that do not share the same nomenclature for nodes. For example, Kubernetes may refer to a given node as "node1", but the storage system may refer to the same node as "nodeA". When Kubernetes issues a command to the storage system to attach a volume to a specific node, it can use this field to refer to the node name using the ID that the storage system will understand, e.g. "nodeA" instead of "node1". This field is required.
   */
  nodeID: string;
  /**
   * topologyKeys is the list of keys supported by the driver. When a driver is initialized on a cluster, it provides a set of topology keys that it understands (e.g. "company.com/zone", "company.com/region"). When a driver is initialized on a node, it provides the same topology keys along with values. Kubelet will expose these topology keys as labels on its own node object. When Kubernetes does topology aware provisioning, it can use this list to determine which labels it should retrieve from the node object and pass back to the driver. It is possible for different nodes to use different topology keys. This can be empty if driver does not support topology.
   */
  topologyKeys?: string[];
}

/**
 * TokenRequest contains parameters of a service account token.
 */
export interface ITokenRequest {
  /**
   * Audience is the intended audience of the token in "TokenRequestSpec". It will default to the audiences of kube apiserver.
   */
  audience: string;
  /**
   * ExpirationSeconds is the duration of validity of the token in "TokenRequestSpec". It has the same default value of "ExpirationSeconds" in "TokenRequestSpec"
   */
  expirationSeconds?: number | bigint;
}

/** * CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. CSI drivers do not need to create the CSIDriver object directly. Instead they may use the cluster-driver-registrar sidecar container. When deployed with a CSI driver it automatically creates a CSIDriver object representing the driver. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced.
 *
 * Child components:
 * - spec.tokenRequests: {@link TokenRequest} */
export const CSIDriver = ({
  children,
  ...props
}: {
  /**
   * attachRequired indicates this CSI volume driver requires an attach operation (because it implements the CSI ControllerPublishVolume() method), and that the Kubernetes attach detach controller should call the attach volume interface which checks the volumeattachment status and waits until the volume is attached before proceeding to mounting. The CSI external-attacher coordinates with CSI volume driver and updates the volumeattachment status when the attach operation is complete. If the CSIDriverRegistry feature gate is enabled and the value is specified to false, the attach operation will be skipped. Otherwise the attach operation will be called.
   *
   * This field is immutable.
   */
  attachRequired?: boolean;
  /**
   * Defines if the underlying volume supports changing ownership and permission of the volume before being mounted. Refer to the specific FSGroupPolicy values for additional details. This field is alpha-level, and is only honored by servers that enable the CSIVolumeFSGroupPolicy feature gate.
   *
   * This field is immutable.
   */
  fsGroupPolicy?: string;
  /**
   * If set to true, podInfoOnMount indicates this CSI volume driver requires additional pod information (like podName, podUID, etc.) during mount operations. If set to false, pod information will not be passed on mount. Default is false. The CSI driver specifies podInfoOnMount as part of driver deployment. If true, Kubelet will pass pod information as VolumeContext in the CSI NodePublishVolume() calls. The CSI driver is responsible for parsing and validating the information passed in as VolumeContext. The following VolumeConext will be passed if podInfoOnMount is set to true. This list might grow, but the prefix will be used. "csi.storage.k8s.io/pod.name": pod.Name "csi.storage.k8s.io/pod.namespace": pod.Namespace "csi.storage.k8s.io/pod.uid": string(pod.UID) "csi.storage.k8s.io/ephemeral": "true" if the volume is an ephemeral inline volume
   * defined by a CSIVolumeSource, otherwise "false"
   *
   * "csi.storage.k8s.io/ephemeral" is a new feature in Kubernetes 1.16. It is only required for drivers which support both the "Persistent" and "Ephemeral" VolumeLifecycleMode. Other drivers can leave pod info disabled and/or ignore this field. As Kubernetes 1.15 doesn't support this field, drivers can only support one mode when deployed on such a cluster and the deployment determines which mode that is, for example via a command line parameter of the driver.
   *
   * This field is immutable.
   */
  podInfoOnMount?: boolean;
  /**
   * RequiresRepublish indicates the CSI driver wants `NodePublishVolume` being periodically called to reflect any possible change in the mounted volume. This field defaults to false.
   *
   * Note: After a successful initial NodePublishVolume call, subsequent calls to NodePublishVolume should only update the contents of the volume. New mount points will not be seen by a running container.
   *
   * This is a beta feature and only available when the CSIServiceAccountToken feature is enabled.
   */
  requiresRepublish?: boolean;
  /**
   * If set to true, storageCapacity indicates that the CSI volume driver wants pod scheduling to consider the storage capacity that the driver deployment will report by creating CSIStorageCapacity objects with capacity information.
   *
   * The check can be enabled immediately when deploying a driver. In that case, provisioning new volumes with late binding will pause until the driver deployment has published some suitable CSIStorageCapacity object.
   *
   * Alternatively, the driver can be deployed with the field unset or false and it can be flipped later when storage capacity information has been published.
   *
   * This field is immutable.
   *
   * This is a beta field and only available when the CSIStorageCapacity feature is enabled. The default is false.
   */
  storageCapacity?: boolean;
  /**
   * TokenRequests indicates the CSI driver needs pods' service account tokens it is mounting volume for to do necessary authentication. Kubelet will pass the tokens in VolumeContext in the CSI NodePublishVolume calls. The CSI driver should parse and validate the following VolumeContext: "csi.storage.k8s.io/serviceAccount.tokens": {
   * "<audience>": {
   * "token": <token>,
   * "expirationTimestamp": <expiration timestamp in RFC3339>,
   * },
   * ...
   * }
   *
   * Note: Audience in each TokenRequest should be different and at most one token is empty string. To receive a new token after expiry, RequiresRepublish can be used to trigger NodePublishVolume periodically.
   *
   * This is a beta feature and only available when the CSIServiceAccountToken feature is enabled.
   */
  tokenRequests?: ITokenRequest[];
  /**
   * VolumeLifecycleModes defines what kind of volumes this CSI volume driver supports. The default if the list is empty is "Persistent", which is the usage defined by the CSI specification and implemented in Kubernetes via the usual PV/PVC mechanism. The other mode is "Ephemeral". In this mode, volumes are defined inline inside the pod spec with CSIVolumeSource and their lifecycle is tied to the lifecycle of that pod. A driver has to be aware of this because it is only going to get a NodePublishVolume call for such a volume. For more information about implementing this mode, see https://kubernetes-csi.github.io/docs/ephemeral-local-volumes.html A driver can support one or more of these modes and more modes may be added in the future.
   *
   * This field is immutable.
   */
  volumeLifecycleModes?: string[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.storage.v1beta1.CSIDriver"
      kind="CSIDriver"
      apiVersion="storage.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * DEPRECATED - This group version of CSINode is deprecated by storage/v1/CSINode. See the release notes for more information. CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object.
 *
 * Child components:
 * - spec.drivers: {@link CSINodeDriver} */
export const CSINode = ({
  children,
  ...props
}: {
  /**
   * drivers is a list of information of all CSI Drivers existing on a node. If all drivers in the list are uninstalled, this can become empty.
   */
  drivers?: ICSINodeDriver[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.storage.v1beta1.CSINode"
      kind="CSINode"
      apiVersion="storage.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.
 *
 * StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.
 *
 * Child components:
 * - allowedTopologies: {@link TopologySelectorTerm} */
export const StorageClass = ({
  children,
  ...props
}: {
  /**
   * AllowVolumeExpansion shows whether the storage class allow volume expand
   */
  allowVolumeExpansion?: boolean;
  /**
   * Restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature.
   */
  allowedTopologies?: ITopologySelectorTerm[];
  /**
   * Dynamically provisioned PersistentVolumes of this storage class are created with these mountOptions, e.g. ["ro", "soft"]. Not validated - mount of the PVs will simply fail if one is invalid.
   */
  mountOptions?: string[];
  /**
   * Parameters holds the parameters for the provisioner that should create volumes of this storage class.
   */
  parameters?: Record<string, string>;
  /**
   * Provisioner indicates the type of the provisioner.
   */
  provisioner: string;
  /**
   * Dynamically provisioned PersistentVolumes of this storage class are created with this reclaimPolicy. Defaults to Delete.
   */
  reclaimPolicy?: string;
  /**
   * VolumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature.
   */
  volumeBindingMode?: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.storage.v1beta1.StorageClass"
      kind="StorageClass"
      apiVersion="storage.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.
 *
 * VolumeAttachment objects are non-namespaced.
 *
 * Child components:
 * - spec.source: {@link VolumeAttachmentSource} (single element) */
export const VolumeAttachment = ({
  children,
  ...props
}: {
  /**
   * Attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName().
   */
  attacher: string;
  /**
   * The node that the volume should be attached to.
   */
  nodeName: string;
  /**
   * Source represents the volume that should be attached.
   */
  source?: IVolumeAttachmentSource;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.storage.v1beta1.VolumeAttachment"
      kind="VolumeAttachment"
      apiVersion="storage.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.
 *
 * For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"
 *
 * The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero
 *
 * The producer of these objects can decide which approach is more suitable.
 *
 * They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node.
 *
 * Child components:
 * - nodeTopology: {@link LabelSelector} (single element) */
export const CSIStorageCapacity = ({
  children,
  ...props
}: {
  /**
   * Capacity is the value reported by the CSI driver in its GetCapacityResponse for a GetCapacityRequest with topology and parameters that match the previous fields.
   *
   * The semantic is currently (CSI spec 1.2) defined as: The available capacity, in bytes, of the storage that can be used to provision volumes. If not set, that information is currently unavailable.
   */
  capacity?: Quantity;
  /**
   * MaximumVolumeSize is the value reported by the CSI driver in its GetCapacityResponse for a GetCapacityRequest with topology and parameters that match the previous fields.
   *
   * This is defined since CSI spec 1.4.0 as the largest size that may be used in a CreateVolumeRequest.capacity_range.required_bytes field to create a volume with the same parameters as those in GetCapacityRequest. The corresponding value in the Kubernetes API is ResourceRequirements.Requests in a volume claim.
   */
  maximumVolumeSize?: Quantity;
  /**
   * NodeTopology defines which nodes have access to the storage for which capacity was reported. If not set, the storage is not accessible from any node in the cluster. If empty, the storage is accessible from all nodes. This field is immutable.
   */
  nodeTopology?: ILabelSelector;
  /**
   * The name of the StorageClass that the reported capacity applies to. It must meet the same requirements as the name of a StorageClass object (non-empty, DNS subdomain). If that object no longer exists, the CSIStorageCapacity object is obsolete and should be removed by its creator. This field is immutable.
   */
  storageClassName: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.storage.v1beta1.CSIStorageCapacity"
      kind="CSIStorageCapacity"
      apiVersion="storage.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * VolumeAttachmentSource represents a volume that should be attached. Right now only PersistenVolumes can be attached via external attacher, in future we may allow also inline volumes in pods. Exactly one member can be set.
 *
 * Child components:
 * - inlineVolumeSpec: {@link PersistentVolumeSpec} (single element) */
export const VolumeAttachmentSource = ({
  children,
  ...props
}: {
  /**
   * inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is beta-level and is only honored by servers that enabled the CSIMigration feature.
   */
  inlineVolumeSpec?: IPersistentVolumeSpec;
  /**
   * Name of the persistent volume to attach.
   */
  persistentVolumeName?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.storage.v1beta1.VolumeAttachmentSource"
      contexts={[
        {
          id: "io.k8s.api.storage.v1beta1.VolumeAttachment",
          path: "spec.source",
          isItem: false,
        },
        {
          id: "io.k8s.api.storage.v1beta1.VolumeAttachmentSpec",
          path: "source",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * CSINodeDriver holds information about the specification of one CSI driver installed on a node */
CSINode.CSINodeDriver = (props: {
  /**
   * allocatable represents the volume resources of a node that are available for scheduling.
   */
  allocatable?: IVolumeNodeResources;
  /**
   * This is the name of the CSI driver that this object refers to. This MUST be the same name returned by the CSI GetPluginName() call for that driver.
   */
  name: string;
  /**
   * nodeID of the node from the driver point of view. This field enables Kubernetes to communicate with storage systems that do not share the same nomenclature for nodes. For example, Kubernetes may refer to a given node as "node1", but the storage system may refer to the same node as "nodeA". When Kubernetes issues a command to the storage system to attach a volume to a specific node, it can use this field to refer to the node name using the ID that the storage system will understand, e.g. "nodeA" instead of "node1". This field is required.
   */
  nodeID: string;
  /**
   * topologyKeys is the list of keys supported by the driver. When a driver is initialized on a cluster, it provides a set of topology keys that it understands (e.g. "company.com/zone", "company.com/region"). When a driver is initialized on a node, it provides the same topology keys along with values. Kubelet will expose these topology keys as labels on its own node object. When Kubernetes does topology aware provisioning, it can use this list to determine which labels it should retrieve from the node object and pass back to the driver. It is possible for different nodes to use different topology keys. This can be empty if driver does not support topology.
   */
  topologyKeys?: string[];
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.storage.v1beta1.CSINodeDriver"
      contexts={[
        {
          id: "io.k8s.api.storage.v1beta1.CSINode",
          path: "spec.drivers",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * TokenRequest contains parameters of a service account token. */
export const TokenRequest = (props: {
  /**
   * Audience is the intended audience of the token in "TokenRequestSpec". It will default to the audiences of kube apiserver.
   */
  audience: string;
  /**
   * ExpirationSeconds is the duration of validity of the token in "TokenRequestSpec". It has the same default value of "ExpirationSeconds" in "TokenRequestSpec"
   */
  expirationSeconds?: number | bigint;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.storage.v1beta1.TokenRequest"
      contexts={[
        {
          id: "io.k8s.api.storage.v1beta1.CSIDriver",
          path: "spec.tokenRequests",
          isItem: true,
        },
        {
          id: "io.k8s.api.storage.v1beta1.CSIDriverSpec",
          path: "tokenRequests",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
