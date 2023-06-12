import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";
import { INodeSelector } from "core/v1";

/**
 * ResourceClaimParametersReference contains enough information to let you locate the parameters for a ResourceClaim. The object must be in the same namespace as the ResourceClaim.
 */
export interface IResourceClaimParametersReference {
  /**
   * APIGroup is the group for the resource being referenced. It is empty for the core API. This matches the group in the APIVersion that is used when creating the resources.
   */
  apiGroup?: string;
  /**
   * Name is the name of resource being referenced.
   */
  name: string;
}

/**
 * ResourceClassParametersReference contains enough information to let you locate the parameters for a ResourceClass.
 */
export interface IResourceClassParametersReference {
  /**
   * APIGroup is the group for the resource being referenced. It is empty for the core API. This matches the group in the APIVersion that is used when creating the resources.
   */
  apiGroup?: string;
  /**
   * Name is the name of resource being referenced.
   */
  name: string;
  /**
   * Namespace that contains the referenced resource. Must be empty for cluster-scoped resources and non-empty for namespaced resources.
   */
  namespace?: string;
}

/**
 * ResourceClaimSpec defines how a resource is to be allocated.
 */
export interface IResourceClaimSpec {
  /**
   * Allocation can start immediately or when a Pod wants to use the resource. "WaitForFirstConsumer" is the default.
   */
  allocationMode?: string;
  /**
   * ParametersRef references a separate object with arbitrary parameters that will be used by the driver when allocating a resource for the claim.
   *
   * The object must be in the same namespace as the ResourceClaim.
   */
  parametersRef?: IResourceClaimParametersReference;
  /**
   * ResourceClassName references the driver and additional parameters via the name of a ResourceClass that was created as part of the driver deployment.
   */
  resourceClassName: string;
}

/** * PodScheduling objects hold information that is needed to schedule a Pod with ResourceClaims that use "WaitForFirstConsumer" allocation mode.
 *
 * This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export const PodScheduling = (
  props: {
    /**
     * PotentialNodes lists nodes where the Pod might be able to run.
     *
     * The size of this field is limited to 128. This is large enough for many clusters. Larger clusters may need more attempts to find a node that suits all pending resources. This may get increased in the future, but not reduced.
     */
    potentialNodes?: string[];
    /**
     * SelectedNode is the node for which allocation of ResourceClaims that are referenced by the Pod and that use "WaitForFirstConsumer" allocation is to be attempted.
     */
    selectedNode?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.resource.v1alpha1.PodScheduling"
      kind="PodScheduling"
      apiVersion="resource.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};

/** * ResourceClaim describes which resources are needed by a resource consumer. Its status tracks whether the resource has been allocated and what the resulting attributes are.
 *
 * This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export const ResourceClaim = (
  props: {
    /**
     * Allocation can start immediately or when a Pod wants to use the resource. "WaitForFirstConsumer" is the default.
     */
    allocationMode?: string;
    /**
     * ParametersRef references a separate object with arbitrary parameters that will be used by the driver when allocating a resource for the claim.
     *
     * The object must be in the same namespace as the ResourceClaim.
     */
    parametersRef?: IResourceClaimParametersReference;
    /**
     * ResourceClassName references the driver and additional parameters via the name of a ResourceClass that was created as part of the driver deployment.
     */
    resourceClassName: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.resource.v1alpha1.ResourceClaim"
      kind="ResourceClaim"
      apiVersion="resource.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};

/** * ResourceClaimTemplate is used to produce ResourceClaim objects.
 *
 * Child components:
 * - spec.spec: {@link ResourceClaimSpec} (single element) */
export const ResourceClaimTemplate = ({
  children,
  ...props
}: {
  /**
   * Spec for the ResourceClaim. The entire content is copied unchanged into the ResourceClaim that gets created from this template. The same fields as in a ResourceClaim are also valid here.
   */
  spec?: IResourceClaimSpec;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.resource.v1alpha1.ResourceClaimTemplate"
      kind="ResourceClaimTemplate"
      apiVersion="resource.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ResourceClass is used by administrators to influence how resources are allocated.
 *
 * This is an alpha type and requires enabling the DynamicResourceAllocation feature gate.
 *
 * Child components:
 * - suitableNodes: {@link NodeSelector} (single element) */
export const ResourceClass = ({
  children,
  ...props
}: {
  /**
   * DriverName defines the name of the dynamic resource driver that is used for allocation of a ResourceClaim that uses this class.
   *
   * Resource drivers have a unique name in forward domain order (acme.example.com).
   */
  driverName: string;
  /**
   * ParametersRef references an arbitrary separate object that may hold parameters that will be used by the driver when allocating a resource that uses this class. A dynamic resource driver can distinguish between parameters stored here and and those stored in ResourceClaimSpec.
   */
  parametersRef?: IResourceClassParametersReference;
  /**
   * Only nodes matching the selector will be considered by the scheduler when trying to find a Node that fits a Pod when that Pod uses a ResourceClaim that has not been allocated yet.
   *
   * Setting this field is optional. If null, all nodes are candidates.
   */
  suitableNodes?: INodeSelector;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.resource.v1alpha1.ResourceClass"
      kind="ResourceClass"
      apiVersion="resource.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ResourceClaimSpec defines how a resource is to be allocated. */
export const ResourceClaimSpec = (props: {
  /**
   * Allocation can start immediately or when a Pod wants to use the resource. "WaitForFirstConsumer" is the default.
   */
  allocationMode?: string;
  /**
   * ParametersRef references a separate object with arbitrary parameters that will be used by the driver when allocating a resource for the claim.
   *
   * The object must be in the same namespace as the ResourceClaim.
   */
  parametersRef?: IResourceClaimParametersReference;
  /**
   * ResourceClassName references the driver and additional parameters via the name of a ResourceClass that was created as part of the driver deployment.
   */
  resourceClassName: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.resource.v1alpha1.ResourceClaimSpec"
      contexts={[
        {
          id: "io.k8s.api.resource.v1alpha1.ResourceClaimTemplate",
          path: "spec.spec",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
