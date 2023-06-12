import { ITypedLocalObjectReference } from "core/v1";
import { IntOrString, useKubeProps, Resource, Item } from "rekube";
import { IObjectMeta } from "meta/v1";

/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface IIngressBackend {
  /**
   * Resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, serviceName and servicePort must not be specified.
   */
  resource?: ITypedLocalObjectReference;
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: string;
  /**
   * Specifies the port of the referenced service.
   */
  servicePort?: IntOrString;
}

/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export interface IHTTPIngressRuleValue {
  /**
   * Backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * Path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/'. When unspecified, all paths from incoming requests are matched.
   */
  path?: string;
  /**
   * PathType determines the interpretation of the Path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types. Defaults to ImplementationSpecific.
   */
  pathType?: string;
}

/**
 * IngressClassParametersReference identifies an API object. This can be used to specify a cluster or namespace-scoped resource.
 */
export interface IIngressClassParametersReference {
  /**
   * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
   */
  apiGroup?: string;
  /**
   * Name is the name of resource being referenced.
   */
  name: string;
  /**
   * Namespace is the namespace of the resource being referenced. This field is required when scope is set to "Namespace" and must be unset when scope is set to "Cluster".
   */
  namespace?: string;
  /**
   * Scope represents if this refers to a cluster or namespace scoped resource. This may be set to "Cluster" (default) or "Namespace". Field can be enabled with IngressClassNamespacedParams feature gate.
   */
  scope?: string;
}

/**
 * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 */
export interface IIngressRule {
  /**
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * Host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If Host is precise, the request matches this rule if the http host header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
}

/**
 * IngressTLS describes the transport layer security associated with an Ingress.
 */
export interface IIngressTLS {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * SecretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.
   */
  secretName?: string;
}

/** * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 *
 * Child components:
 * - spec.backend: {@link IngressBackend} (single element)
 * - spec.rules: {@link IngressRule}
 * - spec.tls: {@link IngressTLS} */
export const Ingress = ({
  children,
  ...props
}: {
  /**
   * A default backend capable of servicing requests that don't match any rule. At least one of 'backend' or 'rules' must be specified. This field is optional to allow the loadbalancer controller or defaulting logic to specify a global default.
   */
  backend?: IIngressBackend;
  /**
   * IngressClassName is the name of the IngressClass cluster resource. The associated IngressClass defines which controller will implement the resource. This replaces the deprecated `kubernetes.io/ingress.class` annotation. For backwards compatibility, when that annotation is set, it must be given precedence over this field. The controller may emit a warning if the field and annotation have different values. Implementations of this API should ignore Ingresses without a class specified. An IngressClass resource may be marked as default, which can be used to set a default value for this field. For more information, refer to the IngressClass documentation.
   */
  ingressClassName?: string;
  /**
   * A list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.
   */
  rules?: IIngressRule[];
  /**
   * TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.
   */
  tls?: IIngressTLS[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1beta1.Ingress"
      kind="Ingress"
      apiVersion="networking.k8s.io/v1beta1"
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
     * Controller refers to the name of the controller that should handle this class. This allows for different "flavors" that are controlled by the same controller. For example, you may have different Parameters for the same implementing controller. This should be specified as a domain-prefixed path no more than 250 characters in length, e.g. "acme.io/ingress-controller". This field is immutable.
     */
    controller?: string;
    /**
     * Parameters is a link to a custom resource containing additional configuration for the controller. This is optional if the controller does not require extra parameters.
     */
    parameters?: IIngressClassParametersReference;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.networking.v1beta1.IngressClass"
      kind="IngressClass"
      apiVersion="networking.k8s.io/v1beta1"
      props={childProps}
    />
  );
};

/** * IngressBackend describes all endpoints for a given service and port. */
export const IngressBackend = (props: {
  /**
   * Resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, serviceName and servicePort must not be specified.
   */
  resource?: ITypedLocalObjectReference;
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: string;
  /**
   * Specifies the port of the referenced service.
   */
  servicePort?: IntOrString;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1beta1.IngressBackend"
      contexts={[
        {
          id: "io.k8s.api.networking.v1beta1.HTTPIngressPath",
          path: "backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1beta1.HTTPIngressRuleValue",
          path: "paths.backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1beta1.Ingress",
          path: "spec.backend",
          isItem: false,
        },
        {
          id: "io.k8s.api.networking.v1beta1.IngressSpec",
          path: "backend",
          isItem: false,
        },
      ]}
      value={childProps}
    />
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
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   *
   * Host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If Host is precise, the request matches this rule if the http host header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule.
   */
  host?: string;
  http?: IHTTPIngressRuleValue;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1beta1.IngressRule"
      contexts={[
        {
          id: "io.k8s.api.networking.v1beta1.Ingress",
          path: "spec.rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1beta1.IngressSpec",
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

/** * IngressTLS describes the transport layer security associated with an Ingress. */
export const IngressTLS = (props: {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: string[];
  /**
   * SecretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.
   */
  secretName?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.networking.v1beta1.IngressTLS"
      contexts={[
        {
          id: "io.k8s.api.networking.v1beta1.Ingress",
          path: "spec.tls",
          isItem: true,
        },
        {
          id: "io.k8s.api.networking.v1beta1.IngressSpec",
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
   * Backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend?: IIngressBackend;
  /**
   * Path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/'. When unspecified, all paths from incoming requests are matched.
   */
  path?: string;
  /**
   * PathType determines the interpretation of the Path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types. Defaults to ImplementationSpecific.
   */
  pathType?: string;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "paths",
  });
  return (
    <Item
      id="io.k8s.api.networking.v1beta1.HTTPIngressRuleValue"
      contexts={[
        {
          id: "io.k8s.api.networking.v1beta1.IngressRule",
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
