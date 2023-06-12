import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";

/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface IServiceReference {
  /**
   * `name` is the name of the service. Required
   */
  name: string;
  /**
   * `namespace` is the namespace of the service. Required
   */
  namespace: string;
  /**
   * `path` is an optional URL path which will be sent in any request to this service.
   */
  path?: string;
  /**
   * If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
   */
  port?: number | bigint;
}

/**
 * WebhookClientConfig contains the information to make a connection with the webhook
 */
export interface IWebhookClientConfig {
  /**
   * `caBundle` is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.
   */
  caBundle?: string;
  /**
   * `service` is a reference to the service for this webhook. Either `service` or `url` must be specified.
   *
   * If the webhook is running within the cluster, then you should use `service`.
   */
  service?: IServiceReference;
  /**
   * `url` gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.
   *
   * The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.
   *
   * Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.
   *
   * The scheme must be "https"; the URL must begin with "https://".
   *
   * A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.
   *
   * Attempting to use a user or basic auth e.g. "user:password@" is not allowed. Fragments ("#...") and query parameters ("?...") are not allowed, either.
   */
  url?: string;
}

/**
 * WebhookThrottleConfig holds the configuration for throttling events
 */
export interface IWebhookThrottleConfig {
  /**
   * ThrottleBurst is the maximum number of events sent at the same moment default 15 QPS
   */
  burst?: number | bigint;
  /**
   * ThrottleQPS maximum number of batches per second default 10 QPS
   */
  qps?: number | bigint;
}

/**
 * Policy defines the configuration of how audit events are logged
 */
export interface IPolicy {
  /**
   * The Level that all requests are recorded at. available options: None, Metadata, Request, RequestResponse required
   */
  level: string;
  /**
   * Stages is a list of stages for which events are created.
   */
  stages?: string[];
}

/**
 * Webhook holds the configuration of the webhook
 */
export interface IWebhook {
  /**
   * ClientConfig holds the connection parameters for the webhook required
   */
  clientConfig?: IWebhookClientConfig;
  /**
   * Throttle holds the options for throttling the webhook
   */
  throttle?: IWebhookThrottleConfig;
}

/** * AuditSink represents a cluster level audit sink
 *
 * Child components:
 * - spec.webhook: {@link Webhook} (single element) */
export const AuditSink = ({
  children,
  ...props
}: {
  /**
   * Policy defines the policy for selecting which events should be sent to the webhook required
   */
  policy: IPolicy;
  /**
   * Webhook to send events required
   */
  webhook?: IWebhook;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.auditregistration.v1alpha1.AuditSink"
      kind="AuditSink"
      apiVersion="auditregistration.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Webhook holds the configuration of the webhook
 *
 * Child components:
 * - clientConfig: {@link WebhookClientConfig} (single element) */
export const Webhook = ({
  children,
  ...props
}: {
  /**
   * ClientConfig holds the connection parameters for the webhook required
   */
  clientConfig?: IWebhookClientConfig;
  /**
   * Throttle holds the options for throttling the webhook
   */
  throttle?: IWebhookThrottleConfig;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.auditregistration.v1alpha1.Webhook"
      contexts={[
        {
          id: "io.k8s.api.auditregistration.v1alpha1.AuditSink",
          path: "spec.webhook",
          isItem: false,
        },
        {
          id: "io.k8s.api.auditregistration.v1alpha1.AuditSinkSpec",
          path: "webhook",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * WebhookClientConfig contains the information to make a connection with the webhook */
export const WebhookClientConfig = (props: {
  /**
   * `caBundle` is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.
   */
  caBundle?: string;
  /**
   * `service` is a reference to the service for this webhook. Either `service` or `url` must be specified.
   *
   * If the webhook is running within the cluster, then you should use `service`.
   */
  service?: IServiceReference;
  /**
   * `url` gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.
   *
   * The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.
   *
   * Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.
   *
   * The scheme must be "https"; the URL must begin with "https://".
   *
   * A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.
   *
   * Attempting to use a user or basic auth e.g. "user:password@" is not allowed. Fragments ("#...") and query parameters ("?...") are not allowed, either.
   */
  url?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.auditregistration.v1alpha1.WebhookClientConfig"
      contexts={[
        {
          id: "io.k8s.api.auditregistration.v1alpha1.Webhook",
          path: "clientConfig",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
