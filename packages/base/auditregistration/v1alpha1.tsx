import { IOwnerReference } from "meta/v1";
import { Resource, useResourceProps } from "rekube";

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
  clientConfig: IWebhookClientConfig;
  /**
   * Throttle holds the options for throttling the webhook
   */
  throttle?: IWebhookThrottleConfig;
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
  port?: number;
}

/**
 * WebhookThrottleConfig holds the configuration for throttling events
 */
export interface IWebhookThrottleConfig {
  /**
   * ThrottleBurst is the maximum number of events sent at the same moment default 15 QPS
   */
  burst?: number;
  /**
   * ThrottleQPS maximum number of batches per second default 10 QPS
   */
  qps?: number;
}

/**
 * AuditSink represents a cluster level audit sink
 */
export function AuditSink(props: {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations
   */
  "meta:annotations"?: object;
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.
   */
  "meta:finalizers"?: string[];
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
   *
   * If this field is specified and the generated name exists, the server will return a 409.
   *
   * Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  "meta:generateName"?: string;
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels
   */
  "meta:labels"?: object;
  /**
   * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
   */
  "meta:name"?: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces
   */
  "meta:namespace"?: string;
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
   */
  "meta:ownerReferences"?: IOwnerReference[];
  /**
   * Policy defines the policy for selecting which events should be sent to the webhook required
   */
  policy: IPolicy;
  /**
   * Webhook to send events required
   */
  webhook: IWebhook;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="AuditSink"
      apiVersion="auditregistration.k8s.io/v1alpha1"
      id="io.k8s.api.auditregistration.v1alpha1.AuditSink"
      props={childProps}
    />
  );
}
