import { ILabelSelector, IObjectMeta } from "meta/v1";
import { IntOrString, useKubeProps, Resource, Item } from "rekube";
import { ITypedLocalObjectReference } from "core/v1";

/**
 * IPBlock describes a particular CIDR (Ex. "192.168.1.0/24","2001:db8::/64") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
 */
export interface IIPBlock {
  /**
   * cidr is a string representing the IPBlock Valid examples are "192.168.1.0/24" or "2001:db8::/64"
   */
  cidr: string;
  /**
   * except is a slice of CIDRs that should not be included within an IPBlock Valid examples are "192.168.1.0/24" or "2001:db8::/64" Except values will be rejected if they are outside the cidr range
   */
  except?: string[];
}

/**
 * NetworkPolicyPeer describes a peer to allow traffic to/from. Only certain combinations of fields are allowed
 */
export interface INetworkPolicyPeer {
  /**
   * ipBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
   */
  ipBlock?: IIPBlock;
  /**
   * namespaceSelector selects namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
   *
   * If podSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the namespaces selected by namespaceSelector. Otherwise it selects all pods in the namespaces selected by namespaceSelector.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * podSelector is a label selector which selects pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
   *
   * If namespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the pods matching podSelector in the policy's own namespace.
   */
  podSelector?: ILabelSelector;
}

/**
 * NetworkPolicyPort describes a port to allow traffic on
 */
export interface INetworkPolicyPort {
  /**
   * endPort indicates that the range of ports from port to endPort if set, inclusive, should be allowed by the policy. This field cannot be defined if the port field is not defined or if the port field is defined as a named (string) port. The endPort must be equal or greater than port.
   */
  endPort?: number | bigint;
  /**
   * port represents the port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
   */
  port?: IntOrString;
  /**
   * protocol represents the protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
   */
  protocol?: string;
}

/**
 * ServiceBackendPort is the service port being referenced.
 */
export interface IServiceBackendPort {
  /**
   * name is the name of the port on the Service. This is a mutually exclusive setting with "Number".
   */
  name?: string;
  /**
   * number is the numerical port number (e.g. 80) on the Service. This is a mutually exclusive setting with "Name".
   */
  number?: number | bigint;
}

/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface IIngressBackend {
  /**
   * resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, a service.Name and service.Port must not be specified. This is a mutually exclusive setting with "Service".
   */
  resource?: ITypedLocalObjectReference;
  /**
   * service references a service as a backend. This is a mutually exclusive setting with "Resource".
   */
  service?: IIngressServiceBackend;
}

/**
 * IngressServiceBackend references a Kubernetes Service as a Backend.
 */
export interface IIngressServiceBackend {
  /**
   * name is the referenced service. The service must exist in the same namespace as the Ingress object.
   */
  name: string;
  /**
   * port of the referenced service. A port name or port number is required for a IngressServiceBackend.
   */
  port?: IServiceBackendPort;
}

/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export interface IHTTPIngressRuleValue {
  /**
   * backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/' and must be present when using PathType with value "Exact" or "Prefix".
   */
  path?: string;
  /**
   * pathType determines the interpretation of the path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types.
   */
  pathType: string;
}

/**
 * IngressClassParametersReference identifies an API object. This can be used to specify a cluster or namespace-scoped resource.
 */
export interface IIngressClassParametersReference {
  /**
   * apiGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
   */
  apiGroup?: string;
  /**
   * name is the name of resource being referenced.
   */
  name: string;
  /**
   * namespace is the namespace of the resource being referenced. This field is required when scope is set to "Namespace" and must be unset when scope is set to "Cluster".
   */
  namespace?: string;
  /**
   * scope represents if this refers to a cluster or namespace scoped resource. This may be set to "Cluster" (default) or "Namespace".
   */
  scope?: string;
}

/**
 * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 */
export interface IIngressRule {
  /**
   * host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If host is precise, the request matches this rule if the http host header is equal to Host. 2. If host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
}

/**
 * IngressTLS describes the transport layer security associated with an ingress.
 */
export interface IIngressTLS {
  /**
   * hosts is a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * secretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the "Host" header is used for routing.
   */
  secretName?: string;
}

/**
 * NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8
 */
export interface INetworkPolicyEgressRule {
  /**
   * ports is a list of destination ports for outgoing traffic. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  /**
   * to is a list of destinations for outgoing traffic of pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all destinations (traffic not restricted by destination). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the to list.
   */
  to?: INetworkPolicyPeer[];
}

/**
 * NetworkPolicyIngressRule describes a particular set of traffic that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and from.
 */
export interface INetworkPolicyIngressRule {
  /**
   * from is a list of sources which should be able to access the pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all sources (traffic not restricted by source). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the from list.
   */
  from?: INetworkPolicyPeer[];
  /**
   * ports is a list of ports which should be made accessible on the pods selected for this rule. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
}

/** * NetworkPolicy describes what network traffic is allowed for a set of Pods
 *
 * Child components:
 * - spec.podSelector: {@link LabelSelector} (single element)
 * - spec.egress: {@link NetworkPolicyEgressRule}
 * - spec.ingress: {@link NetworkPolicyIngressRule} */
export const NetworkPolicy = ({
  children,
  ...props
}: {
  /**
   * egress is a list of egress rules to be applied to the selected pods. Outgoing traffic is allowed if there are no NetworkPolicies selecting the pod (and cluster policy otherwise allows the traffic), OR if the traffic matches at least one egress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy limits all outgoing traffic (and serves solely to ensure that the pods it selects are isolated by default). This field is beta-level in 1.8
   */
  egress?: INetworkPolicyEgressRule[];
  /**
   * ingress is a list of ingress rules to be applied to the selected pods. Traffic is allowed to a pod if there are no NetworkPolicies selecting the pod (and cluster policy otherwise allows the traffic), OR if the traffic source is the pod's local node, OR if the traffic matches at least one ingress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy does not allow any traffic (and serves solely to ensure that the pods it selects are isolated by default)
   */
  ingress?: INetworkPolicyIngressRule[];
  /**
   * podSelector selects the pods to which this NetworkPolicy object applies. The array of ingress rules is applied to any pods selected by this field. Multiple network policies can select the same set of pods. In this case, the ingress rules for each are combined additively. This field is NOT optional and follows standard label selector semantics. An empty podSelector matches all pods in this namespace.
   */
  podSelector?: ILabelSelector;
  /**
   * policyTypes is a list of rule types that the NetworkPolicy relates to. Valid options are ["Ingress"], ["Egress"], or ["Ingress", "Egress"]. If this field is not specified, it will default based on the existence of ingress or egress rules; policies that contain an egress section are assumed to affect egress, and all policies (whether or not they contain an ingress section) are assumed to affect ingress. If you want to write an egress-only policy, you must explicitly specify policyTypes [ "Egress" ]. Likewise, if you want to write a policy that specifies that no egress is allowed, you must specify a policyTypes value that include "Egress" (since such a policy would not include an egress section and would otherwise default to just [ "Ingress" ]). This field is beta-level in 1.8
   */
  policyTypes?: string[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1.NetworkPolicy"
      kind="NetworkPolicy"
      apiVersion="networking.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 *
 * Child components:
 * - spec.defaultBackend: {@link IngressBackend} (single element)
 * - spec.rules: {@link IngressRule}
 * - spec.tls: {@link IngressTLS} */
export const Ingress = ({
  children,
  ...props
}: {
  /**
   * defaultBackend is the backend that should handle requests that don't match any rule. If Rules are not specified, DefaultBackend must be specified. If DefaultBackend is not set, the handling of requests that do not match any of the rules will be up to the Ingress controller.
   */
  defaultBackend?: IIngressBackend;
  /**
   * ingressClassName is the name of an IngressClass cluster resource. Ingress controller implementations use this field to know whether they should be serving this Ingress resource, by a transitive connection (controller -> IngressClass -> Ingress resource). Although the `kubernetes.io/ingress.class` annotation (simple constant name) was never formally defined, it was widely supported by Ingress controllers to create a direct binding between Ingress controller and Ingress resources. Newly created Ingress resources should prefer using the field. However, even though the annotation is officially deprecated, for backwards compatibility reasons, ingress controllers should still honor that annotation if present.
   */
  ingressClassName?: string;
  /**
   * rules is a list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.
   */
  rules?: IIngressRule[];
  /**
   * tls represents the TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.
   */
  tls?: IIngressTLS[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1.Ingress"
      kind="Ingress"
      apiVersion="networking.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * IngressClass represents the class of the Ingress, referenced by the Ingress Spec. The `ingressclass.kubernetes.io/is-default-class` annotation can be used to indicate that an IngressClass should be considered default. When a single IngressClass resource has this annotation set to true, new Ingress resources without a class specified will be assigned this default class. */
export const IngressClass = (
  props: {
    /**
     * controller refers to the name of the controller that should handle this class. This allows for different "flavors" that are controlled by the same controller. For example, you may have different parameters for the same implementing controller. This should be specified as a domain-prefixed path no more than 250 characters in length, e.g. "acme.io/ingress-controller". This field is immutable.
     */
    controller?: string;
    /**
     * parameters is a link to a custom resource containing additional configuration for the controller. This is optional if the controller does not require extra parameters.
     */
    parameters?: IIngressClassParametersReference;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1.IngressClass"
      kind="IngressClass"
      apiVersion="networking.k8s.io/v1"
      props={childProps}
    />
  );
};

/** * IngressBackend describes all endpoints for a given service and port.
 *
 * Child components:
 * - service: {@link IngressServiceBackend} (single element) */
export const IngressBackend = ({
  children,
  ...props
}: {
  /**
   * resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, a service.Name and service.Port must not be specified. This is a mutually exclusive setting with "Service".
   */
  resource?: ITypedLocalObjectReference;
  /**
   * service references a service as a backend. This is a mutually exclusive setting with "Resource".
   */
  service?: IIngressServiceBackend;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.IngressBackend"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.HTTPIngressPath",
          path: "backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1.HTTPIngressRuleValue",
          path: "paths.backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1.Ingress",
          path: "spec.defaultBackend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1.IngressSpec",
          path: "defaultBackend",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 *
 * Child components:
 * - http: {@link HTTPIngressRuleValue} (single element) */
export const IngressRule = ({
  children,
  ...props
}: {
  /**
   * host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If host is precise, the request matches this rule if the http host header is equal to Host. 2. If host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.IngressRule"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.Ingress",
          path: "spec.rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.IngressSpec",
          path: "rules",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * IngressTLS describes the transport layer security associated with an ingress. */
export const IngressTLS = (props: {
  /**
   * hosts is a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * secretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the "Host" header is used for routing.
   */
  secretName?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.IngressTLS"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.Ingress",
          path: "spec.tls",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.IngressSpec",
          path: "tls",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 *
 * Child components:
 * - paths.backend: {@link IngressBackend} (single element) */
export const HTTPIngressRuleValue = ({
  children,
  ...props
}: {
  /**
   * backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/' and must be present when using PathType with value "Exact" or "Prefix".
   */
  path?: string;
  /**
   * pathType determines the interpretation of the path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types.
   */
  pathType: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "paths",
  });
  return (
    <Item
      id="io.k8s.api.networking.v1.HTTPIngressRuleValue"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.IngressRule",
          path: "http",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * IngressServiceBackend references a Kubernetes Service as a Backend. */
export const IngressServiceBackend = (props: {
  /**
   * name is the referenced service. The service must exist in the same namespace as the Ingress object.
   */
  name: string;
  /**
   * port of the referenced service. A port name or port number is required for a IngressServiceBackend.
   */
  port?: IServiceBackendPort;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.IngressServiceBackend"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.IngressBackend",
          path: "service",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8
 *
 * Child components:
 * - to: {@link NetworkPolicyPeer}
 * - ports: {@link NetworkPolicyPort} */
export const NetworkPolicyEgressRule = ({
  children,
  ...props
}: {
  /**
   * ports is a list of destination ports for outgoing traffic. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  /**
   * to is a list of destinations for outgoing traffic of pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all destinations (traffic not restricted by destination). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the to list.
   */
  to?: INetworkPolicyPeer[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.NetworkPolicyEgressRule"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.NetworkPolicy",
          path: "spec.egress",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.NetworkPolicySpec",
          path: "egress",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * NetworkPolicyIngressRule describes a particular set of traffic that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and from.
 *
 * Child components:
 * - from: {@link NetworkPolicyPeer}
 * - ports: {@link NetworkPolicyPort} */
export const NetworkPolicyIngressRule = ({
  children,
  ...props
}: {
  /**
   * from is a list of sources which should be able to access the pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all sources (traffic not restricted by source). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the from list.
   */
  from?: INetworkPolicyPeer[];
  /**
   * ports is a list of ports which should be made accessible on the pods selected for this rule. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: INetworkPolicyPort[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.NetworkPolicyIngressRule"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.NetworkPolicy",
          path: "spec.ingress",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.NetworkPolicySpec",
          path: "ingress",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * NetworkPolicyPeer describes a peer to allow traffic to/from. Only certain combinations of fields are allowed
 *
 * Child components:
 * - namespaceSelector: {@link LabelSelector} with 'namespaceSelector' flag (single element)
 * - podSelector: {@link LabelSelector} with 'podSelector' flag (single element) */
export const NetworkPolicyPeer = ({
  children,
  ...props
}: {
  /**
   * ipBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
   */
  ipBlock?: IIPBlock;
  /**
   * namespaceSelector selects namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
   *
   * If podSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the namespaces selected by namespaceSelector. Otherwise it selects all pods in the namespaces selected by namespaceSelector.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * podSelector is a label selector which selects pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
   *
   * If namespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the pods matching podSelector in the policy's own namespace.
   */
  podSelector?: ILabelSelector;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.NetworkPolicyPeer"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
          path: "to",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
          path: "from",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * NetworkPolicyPort describes a port to allow traffic on */
export const NetworkPolicyPort = (props: {
  /**
   * endPort indicates that the range of ports from port to endPort if set, inclusive, should be allowed by the policy. This field cannot be defined if the port field is not defined or if the port field is defined as a named (string) port. The endPort must be equal or greater than port.
   */
  endPort?: number | bigint;
  /**
   * port represents the port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
   */
  port?: IntOrString;
  /**
   * protocol represents the protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
   */
  protocol?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1.NetworkPolicyPort"
      contexts={[
        {
          id: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
          path: "ports",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
          path: "ports",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
