import { IObjectMeta } from "meta/v1";
import { INodeSelector } from "core/v1";
import { useKubeProps, Resource } from "rekube";

/**
 * ParentReference describes a reference to a parent object.
 */
export interface IParentReference {
  /**
   * Group is the group of the object being referenced.
   */
  group?: string;
  /**
   * Name is the name of the object being referenced.
   */
  name?: string;
  /**
   * Namespace is the namespace of the object being referenced.
   */
  namespace?: string;
  /**
   * Resource is the resource of the object being referenced.
   */
  resource?: string;
  /**
   * UID is the uid of the object being referenced.
   */
  uid?: string;
}

/** * ClusterCIDR represents a single configuration for per-Node Pod CIDR allocations when the MultiCIDRRangeAllocator is enabled (see the config for kube-controller-manager).  A cluster may have any number of ClusterCIDR resources, all of which will be considered when allocating a CIDR for a Node.  A ClusterCIDR is eligible to be used for a given Node when the node selector matches the node in question and has free CIDRs to allocate.  In case of multiple matching ClusterCIDR resources, the allocator will attempt to break ties using internal heuristics, but any ClusterCIDR whose node selector matches the Node may be used.
 *
 * Child components:
 * - spec.nodeSelector: {@link NodeSelector} (single element) */
export const ClusterCIDR = ({
  children,
  ...props
}: {
  /**
   * ipv4 defines an IPv4 IP block in CIDR notation(e.g. "10.0.0.0/8"). At least one of ipv4 and ipv6 must be specified. This field is immutable.
   */
  ipv4?: string;
  /**
   * ipv6 defines an IPv6 IP block in CIDR notation(e.g. "2001:db8::/64"). At least one of ipv4 and ipv6 must be specified. This field is immutable.
   */
  ipv6?: string;
  /**
   * nodeSelector defines which nodes the config is applicable to. An empty or nil nodeSelector selects all nodes. This field is immutable.
   */
  nodeSelector?: INodeSelector;
  /**
   * perNodeHostBits defines the number of host bits to be configured per node. A subnet mask determines how much of the address is used for network bits and host bits. For example an IPv4 address of 192.168.0.0/24, splits the address into 24 bits for the network portion and 8 bits for the host portion. To allocate 256 IPs, set this field to 8 (a /24 mask for IPv4 or a /120 for IPv6). Minimum value is 4 (16 IPs). This field is immutable.
   */
  perNodeHostBits: number | bigint;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1alpha1.ClusterCIDR"
      kind="ClusterCIDR"
      apiVersion="networking.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * IPAddress represents a single IP of a single IP Family. The object is designed to be used by APIs that operate on IP addresses. The object is used by the Service core API for allocation of IP addresses. An IP address can be represented in different formats, to guarantee the uniqueness of the IP, the name of the object is the IP address in canonical format, four decimal digits separated by dots suppressing leading zeros for IPv4 and the representation defined by RFC 5952 for IPv6. Valid: 192.168.1.5 or 2001:db8::1 or 2001:db8:aaaa:bbbb:cccc:dddd:eeee:1 Invalid: 10.01.2.3 or 2001:db8:0:0:0::1 */
export const IPAddress = (
  props: {
    /**
     * ParentRef references the resource that an IPAddress is attached to. An IPAddress must reference a parent object.
     */
    parentRef?: IParentReference;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1alpha1.IPAddress"
      kind="IPAddress"
      apiVersion="networking.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};
