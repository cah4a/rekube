import { IPersistentVolumeSpec } from "core/v1";
import { IObjectMeta, ILabelSelector } from "meta/v1";
import { useKubeProps, Resource, Quantity, Item } from "rekube";

/**
 * VolumeAttachmentSource represents a volume that should be attached. Right now only PersistenVolumes can be attached via external attacher, in future we may allow also inline volumes in pods. Exactly one member can be set.
 */
export interface IVolumeAttachmentSource {
  /**
   * inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is alpha-level and is only honored by servers that enabled the CSIMigration feature.
   */
  inlineVolumeSpec?: IPersistentVolumeSpec;
  /**
   * Name of the persistent volume to attach.
   */
  persistentVolumeName?: string;
}

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
      id="io.k8s.api.storage.v1alpha1.VolumeAttachment"
      kind="VolumeAttachment"
      apiVersion="storage.k8s.io/v1alpha1"
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
 * They are consumed by the kube-scheduler if the CSIStorageCapacity beta feature gate is enabled there and a CSI driver opts into capacity-aware scheduling with CSIDriver.StorageCapacity.
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
   * The semantic is currently (CSI spec 1.2) defined as: The available capacity, in bytes, of the storage that can be used to provision volumes. If not set, that information is currently unavailable and treated like zero capacity.
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
      id="io.k8s.api.storage.v1alpha1.CSIStorageCapacity"
      kind="CSIStorageCapacity"
      apiVersion="storage.k8s.io/v1alpha1"
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
   * inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is alpha-level and is only honored by servers that enabled the CSIMigration feature.
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
      id="io.k8s.api.storage.v1alpha1.VolumeAttachmentSource"
      contexts={[
        {
          id: "io.k8s.api.storage.v1alpha1.VolumeAttachment",
          path: "spec.source",
          isItem: false,
        },
        {
          id: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSpec",
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
