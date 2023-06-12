import { IObjectReference } from "core/v1";
import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";

/**
 * EndpointConditions represents the current condition of an endpoint.
 */
export interface IEndpointConditions {
  /**
   * ready indicates that this endpoint is prepared to receive traffic, according to whatever system is managing the endpoint. A nil value indicates an unknown state. In most cases consumers should interpret this unknown state as ready. For compatibility reasons, ready should never be "true" for terminating endpoints, except when the normal readiness behavior is being explicitly overridden, for example when the associated Service has set the publishNotReadyAddresses flag.
   */
  ready?: boolean;
  /**
   * serving is identical to ready except that it is set regardless of the terminating state of endpoints. This condition should be set to true for a ready endpoint that is terminating. If nil, consumers should defer to the ready condition.
   */
  serving?: boolean;
  /**
   * terminating indicates that this endpoint is terminating. A nil value indicates an unknown state. Consumers should interpret this unknown state to mean that the endpoint is not terminating.
   */
  terminating?: boolean;
}

/**
 * EndpointHints provides hints describing how an endpoint should be consumed.
 */
export interface IEndpointHints {
  /**
   * name represents the name of the zone.
   */
  name: string;
}

/**
 * Endpoint represents a single logical "backend" implementing a service.
 */
export interface IEndpoint {
  /**
   * addresses of this endpoint. The contents of this field are interpreted according to the corresponding EndpointSlice addressType field. Consumers must handle different types of addresses in the context of their own capabilities. This must contain at least one address but no more than 100. These are all assumed to be fungible and clients may choose to only use the first element. Refer to: https://issue.k8s.io/106267
   */
  addresses: string[];
  /**
   * conditions contains information about the current status of the endpoint.
   */
  conditions?: IEndpointConditions;
  /**
   * deprecatedTopology contains topology information part of the v1beta1 API. This field is deprecated, and will be removed when the v1beta1 API is removed (no sooner than kubernetes v1.24).  While this field can hold values, it is not writable through the v1 API, and any attempts to write to it will be silently ignored. Topology information can be found in the zone and nodeName fields instead.
   */
  deprecatedTopology?: Record<string, string>;
  /**
   * hints contains information associated with how an endpoint should be consumed.
   */
  hints?: IEndpointHints;
  /**
   * hostname of this endpoint. This field may be used by consumers of endpoints to distinguish endpoints from each other (e.g. in DNS names). Multiple endpoints which use the same hostname should be considered fungible (e.g. multiple A values in DNS). Must be lowercase and pass DNS Label (RFC 1123) validation.
   */
  hostname?: string;
  /**
   * nodeName represents the name of the Node hosting this endpoint. This can be used to determine endpoints local to a Node.
   */
  nodeName?: string;
  /**
   * targetRef is a reference to a Kubernetes object that represents this endpoint.
   */
  targetRef?: IObjectReference;
  /**
   * zone is the name of the Zone this endpoint exists in.
   */
  zone?: string;
}

/**
 * EndpointPort represents a Port used by an EndpointSlice
 */
export interface IEndpointPort {
  /**
   * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:
   *
   * * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).
   *
   * * Kubernetes-defined prefixed names:
   * * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540
   *
   * * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * name represents the name of this port. All ports in an EndpointSlice must have a unique name. If the EndpointSlice is dervied from a Kubernetes service, this corresponds to the Service.ports[].name. Name must either be an empty string or pass DNS_LABEL validation: * must be no more than 63 characters long. * must consist of lower case alphanumeric characters or '-'. * must start and end with an alphanumeric character. Default is empty string.
   */
  name?: string;
  /**
   * port represents the port number of the endpoint. If this is not specified, ports are not restricted and must be interpreted in the context of the specific consumer.
   */
  port?: number | bigint;
  /**
   * protocol represents the IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
   */
  protocol?: string;
}

/** * EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints.
 *
 * Child components:
 * - endpoints: {@link Endpoint}
 * - ports: {@link EndpointPort} */
export const EndpointSlice = ({
  children,
  ...props
}: {
  /**
   * addressType specifies the type of address carried by this EndpointSlice. All addresses in this slice must be the same type. This field is immutable after creation. The following address types are currently supported: * IPv4: Represents an IPv4 Address. * IPv6: Represents an IPv6 Address. * FQDN: Represents a Fully Qualified Domain Name.
   */
  addressType: string;
  /**
   * endpoints is a list of unique endpoints in this slice. Each slice may include a maximum of 1000 endpoints.
   */
  endpoints?: IEndpoint[];
  /**
   * ports specifies the list of network ports exposed by each endpoint in this slice. Each port must have a unique name. When ports is empty, it indicates that there are no defined ports. When a port is defined with a nil port value, it indicates "all ports". Each slice may include a maximum of 100 ports.
   */
  ports?: IEndpointPort[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.discovery.v1.EndpointSlice"
      kind="EndpointSlice"
      apiVersion="discovery.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Endpoint represents a single logical "backend" implementing a service. */
EndpointSlice.Endpoint = (props: {
  /**
   * addresses of this endpoint. The contents of this field are interpreted according to the corresponding EndpointSlice addressType field. Consumers must handle different types of addresses in the context of their own capabilities. This must contain at least one address but no more than 100. These are all assumed to be fungible and clients may choose to only use the first element. Refer to: https://issue.k8s.io/106267
   */
  addresses: string[];
  /**
   * conditions contains information about the current status of the endpoint.
   */
  conditions?: IEndpointConditions;
  /**
   * deprecatedTopology contains topology information part of the v1beta1 API. This field is deprecated, and will be removed when the v1beta1 API is removed (no sooner than kubernetes v1.24).  While this field can hold values, it is not writable through the v1 API, and any attempts to write to it will be silently ignored. Topology information can be found in the zone and nodeName fields instead.
   */
  deprecatedTopology?: Record<string, string>;
  /**
   * hints contains information associated with how an endpoint should be consumed.
   */
  hints?: IEndpointHints;
  /**
   * hostname of this endpoint. This field may be used by consumers of endpoints to distinguish endpoints from each other (e.g. in DNS names). Multiple endpoints which use the same hostname should be considered fungible (e.g. multiple A values in DNS). Must be lowercase and pass DNS Label (RFC 1123) validation.
   */
  hostname?: string;
  /**
   * nodeName represents the name of the Node hosting this endpoint. This can be used to determine endpoints local to a Node.
   */
  nodeName?: string;
  /**
   * targetRef is a reference to a Kubernetes object that represents this endpoint.
   */
  targetRef?: IObjectReference;
  /**
   * zone is the name of the Zone this endpoint exists in.
   */
  zone?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.discovery.v1.Endpoint"
      contexts={[
        {
          id: "io.k8s.api.discovery.v1.EndpointSlice",
          path: "endpoints",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * EndpointPort represents a Port used by an EndpointSlice */
EndpointSlice.EndpointPort = (props: {
  /**
   * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:
   *
   * * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).
   *
   * * Kubernetes-defined prefixed names:
   * * 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540
   *
   * * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
   */
  appProtocol?: string;
  /**
   * name represents the name of this port. All ports in an EndpointSlice must have a unique name. If the EndpointSlice is dervied from a Kubernetes service, this corresponds to the Service.ports[].name. Name must either be an empty string or pass DNS_LABEL validation: * must be no more than 63 characters long. * must consist of lower case alphanumeric characters or '-'. * must start and end with an alphanumeric character. Default is empty string.
   */
  name?: string;
  /**
   * port represents the port number of the endpoint. If this is not specified, ports are not restricted and must be interpreted in the context of the specific consumer.
   */
  port?: number | bigint;
  /**
   * protocol represents the IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
   */
  protocol?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.discovery.v1.EndpointPort"
      contexts={[
        {
          id: "io.k8s.api.discovery.v1.EndpointSlice",
          path: "ports",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
