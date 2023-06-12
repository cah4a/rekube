import { IObjectMeta, ILabelSelector } from "meta/v1";
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
 * WebhookClientConfig contains the information to make a TLS connection with the webhook
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
 * MatchCondition represents a condition which must by fulfilled for a request to be sent to a webhook.
 */
export interface IMatchCondition {
  /**
   * Expression represents the expression which will be evaluated by CEL. Must evaluate to bool. CEL expressions have access to the contents of the AdmissionRequest and Authorizer, organized into CEL variables:
   *
   * 'object' - The object from the incoming request. The value is null for DELETE requests. 'oldObject' - The existing object. The value is null for CREATE requests. 'request' - Attributes of the admission request(/pkg/apis/admission/types.go#AdmissionRequest). 'authorizer' - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.
   * See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz
   * 'authorizer.requestResource' - A CEL ResourceCheck constructed from the 'authorizer' and configured with the
   * request resource.
   * Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
   *
   * Required.
   */
  expression: string;
  /**
   * Name is an identifier for this match condition, used for strategic merging of MatchConditions, as well as providing an identifier for logging purposes. A good name should be descriptive of the associated expression. Name must be a qualified name consisting of alphanumeric characters, '-', '_' or '.', and must start and end with an alphanumeric character (e.g. 'MyName',  or 'my.name',  or '123-abc', regex used for validation is '([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9]') with an optional DNS subdomain prefix and '/' (e.g. 'example.com/MyName')
   *
   * Required.
   */
  name: string;
}

/**
 * RuleWithOperations is a tuple of Operations and Resources. It is recommended to make sure that all the tuple expansions are valid.
 */
export interface IRuleWithOperations {
  /**
   * APIGroups is the API groups the resources belong to. '*' is all groups. If '*' is present, the length of the slice must be one. Required.
   */
  apiGroups?: string[];
  /**
   * APIVersions is the API versions the resources belong to. '*' is all versions. If '*' is present, the length of the slice must be one. Required.
   */
  apiVersions?: string[];
  /**
   * Operations is the operations the admission hook cares about - CREATE, UPDATE, DELETE, CONNECT or * for all of those operations and any future admission operations that are added. If '*' is present, the length of the slice must be one. Required.
   */
  operations?: string[];
  /**
   * Resources is a list of resources this rule applies to.
   *
   * For example: 'pods' means pods. 'pods/log' means the log subresource of pods. '*' means all resources, but not subresources. 'pods/*' means all subresources of pods. '*​/scale' means all scale subresources. '*​/*' means all resources and their subresources.
   *
   * If wildcard is present, the validation rule will ensure resources do not overlap with each other.
   *
   * Depending on the enclosing object, subresources might not be allowed. Required.
   */
  resources?: string[];
  /**
   * scope specifies the scope of this rule. Valid values are "Cluster", "Namespaced", and "*" "Cluster" means that only cluster-scoped resources will match this rule. Namespace API objects are cluster-scoped. "Namespaced" means that only namespaced resources will match this rule. "*" means that there are no scope restrictions. Subresources match the scope of their parent resource. Default is "*".
   */
  scope?: string;
}

/** * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object.
 *
 * Child components:
 * - webhooks.namespaceSelector: {@link LabelSelector} with 'namespaceSelector' flag (single element)
 * - webhooks.objectSelector: {@link LabelSelector} with 'objectSelector' flag (single element)
 * - webhooks.clientConfig: {@link WebhookClientConfig} (single element)
 * - webhooks.matchConditions: {@link MatchCondition}
 * - webhooks.rules: {@link RuleWithOperations} */
export const MutatingWebhookConfiguration = ({
  children,
  ...props
}: {
  /**
   * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy.
   */
  admissionReviewVersions: string[];
  /**
   * ClientConfig defines how to communicate with the hook. Required
   */
  clientConfig?: IWebhookClientConfig;
  /**
   * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Fail.
   */
  failurePolicy?: string;
  /**
   * MatchConditions is a list of conditions that must be met for a request to be sent to this webhook. Match conditions filter requests that have already been matched by the rules, namespaceSelector, and objectSelector. An empty list of matchConditions matches all requests. There are a maximum of 64 match conditions allowed.
   *
   * The exact matching logic is (in order):
   * 1. If ANY matchCondition evaluates to FALSE, the webhook is skipped.
   * 2. If ALL matchConditions evaluate to TRUE, the webhook is called.
   * 3. If any matchCondition evaluates to an error (but none are FALSE):
   * - If failurePolicy=Fail, reject the request
   * - If failurePolicy=Ignore, the error is ignored and the webhook is skipped
   *
   * This is an alpha feature and managed by the AdmissionWebhookMatchConditions feature gate.
   */
  matchConditions?: IMatchCondition[];
  /**
   * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
   *
   * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
   *
   * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
   *
   * Defaults to "Equivalent"
   */
  matchPolicy?: string;
  /**
   * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization. Required.
   */
  name: string;
  /**
   * NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the selector. If the object itself is a namespace, the matching is performed on object.metadata.labels. If the object is another cluster scoped resource, it never skips the webhook.
   *
   * For example, to run the webhook on any objects whose namespace is not associated with "runlevel" of "0" or "1";  you will set the selector as follows: "namespaceSelector": {
   * "matchExpressions": [
   * {
   * "key": "runlevel",
   * "operator": "NotIn",
   * "values": [
   * "0",
   * "1"
   * ]
   * }
   * ]
   * }
   *
   * If instead you want to only run the webhook on any objects whose namespace is associated with the "environment" of "prod" or "staging"; you will set the selector as follows: "namespaceSelector": {
   * "matchExpressions": [
   * {
   * "key": "environment",
   * "operator": "In",
   * "values": [
   * "prod",
   * "staging"
   * ]
   * }
   * ]
   * }
   *
   * See https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/ for more examples of label selectors.
   *
   * Default to the empty LabelSelector, which matches everything.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * ObjectSelector decides whether to run the webhook based on if the object has matching labels. objectSelector is evaluated against both the oldObject and newObject that would be sent to the webhook, and is considered to match if either object matches the selector. A null object (oldObject in the case of create, or newObject in the case of delete) or an object that cannot have labels (like a DeploymentRollback or a PodProxyOptions object) is not considered to match. Use the object selector only if the webhook is opt-in, because end users may skip the admission webhook by setting the labels. Default to the empty LabelSelector, which matches everything.
   */
  objectSelector?: ILabelSelector;
  /**
   * reinvocationPolicy indicates whether this webhook should be called multiple times as part of a single admission evaluation. Allowed values are "Never" and "IfNeeded".
   *
   * Never: the webhook will not be called more than once in a single admission evaluation.
   *
   * IfNeeded: the webhook will be called at least one additional time as part of the admission evaluation if the object being admitted is modified by other admission plugins after the initial webhook call. Webhooks that specify this option *must* be idempotent, able to process objects they previously admitted. Note: * the number of additional invocations is not guaranteed to be exactly one. * if additional invocations result in further modifications to the object, webhooks are not guaranteed to be invoked again. * webhooks that use this option may be reordered to minimize the number of additional invocations. * to validate an object after all mutations are guaranteed complete, use a validating admission webhook instead.
   *
   * Defaults to "Never".
   */
  reinvocationPolicy?: string;
  /**
   * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
   */
  rules?: IRuleWithOperations[];
  /**
   * SideEffects states whether this webhook has side effects. Acceptable values are: None, NoneOnDryRun (webhooks created via v1beta1 may also specify Some or Unknown). Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission chain and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some.
   */
  sideEffects: string;
  /**
   * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 10 seconds.
   */
  timeoutSeconds?: number | bigint;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "webhooks",
  });
  return (
    <Resource
      id="io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration"
      kind="MutatingWebhookConfiguration"
      apiVersion="admissionregistration.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it.
 *
 * Child components:
 * - webhooks.namespaceSelector: {@link LabelSelector} with 'namespaceSelector' flag (single element)
 * - webhooks.objectSelector: {@link LabelSelector} with 'objectSelector' flag (single element)
 * - webhooks.clientConfig: {@link WebhookClientConfig} (single element)
 * - webhooks.matchConditions: {@link MatchCondition}
 * - webhooks.rules: {@link RuleWithOperations} */
export const ValidatingWebhookConfiguration = ({
  children,
  ...props
}: {
  /**
   * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy.
   */
  admissionReviewVersions: string[];
  /**
   * ClientConfig defines how to communicate with the hook. Required
   */
  clientConfig?: IWebhookClientConfig;
  /**
   * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Fail.
   */
  failurePolicy?: string;
  /**
   * MatchConditions is a list of conditions that must be met for a request to be sent to this webhook. Match conditions filter requests that have already been matched by the rules, namespaceSelector, and objectSelector. An empty list of matchConditions matches all requests. There are a maximum of 64 match conditions allowed.
   *
   * The exact matching logic is (in order):
   * 1. If ANY matchCondition evaluates to FALSE, the webhook is skipped.
   * 2. If ALL matchConditions evaluate to TRUE, the webhook is called.
   * 3. If any matchCondition evaluates to an error (but none are FALSE):
   * - If failurePolicy=Fail, reject the request
   * - If failurePolicy=Ignore, the error is ignored and the webhook is skipped
   *
   * This is an alpha feature and managed by the AdmissionWebhookMatchConditions feature gate.
   */
  matchConditions?: IMatchCondition[];
  /**
   * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
   *
   * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
   *
   * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
   *
   * Defaults to "Equivalent"
   */
  matchPolicy?: string;
  /**
   * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization. Required.
   */
  name: string;
  /**
   * NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the selector. If the object itself is a namespace, the matching is performed on object.metadata.labels. If the object is another cluster scoped resource, it never skips the webhook.
   *
   * For example, to run the webhook on any objects whose namespace is not associated with "runlevel" of "0" or "1";  you will set the selector as follows: "namespaceSelector": {
   * "matchExpressions": [
   * {
   * "key": "runlevel",
   * "operator": "NotIn",
   * "values": [
   * "0",
   * "1"
   * ]
   * }
   * ]
   * }
   *
   * If instead you want to only run the webhook on any objects whose namespace is associated with the "environment" of "prod" or "staging"; you will set the selector as follows: "namespaceSelector": {
   * "matchExpressions": [
   * {
   * "key": "environment",
   * "operator": "In",
   * "values": [
   * "prod",
   * "staging"
   * ]
   * }
   * ]
   * }
   *
   * See https://kubernetes.io/docs/concepts/overview/working-with-objects/labels for more examples of label selectors.
   *
   * Default to the empty LabelSelector, which matches everything.
   */
  namespaceSelector?: ILabelSelector;
  /**
   * ObjectSelector decides whether to run the webhook based on if the object has matching labels. objectSelector is evaluated against both the oldObject and newObject that would be sent to the webhook, and is considered to match if either object matches the selector. A null object (oldObject in the case of create, or newObject in the case of delete) or an object that cannot have labels (like a DeploymentRollback or a PodProxyOptions object) is not considered to match. Use the object selector only if the webhook is opt-in, because end users may skip the admission webhook by setting the labels. Default to the empty LabelSelector, which matches everything.
   */
  objectSelector?: ILabelSelector;
  /**
   * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
   */
  rules?: IRuleWithOperations[];
  /**
   * SideEffects states whether this webhook has side effects. Acceptable values are: None, NoneOnDryRun (webhooks created via v1beta1 may also specify Some or Unknown). Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission chain and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some.
   */
  sideEffects: string;
  /**
   * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 10 seconds.
   */
  timeoutSeconds?: number | bigint;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "webhooks",
  });
  return (
    <Resource
      id="io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration"
      kind="ValidatingWebhookConfiguration"
      apiVersion="admissionregistration.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * WebhookClientConfig contains the information to make a TLS connection with the webhook */
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
      id="io.k8s.api.admissionregistration.v1.WebhookClientConfig"
      contexts={[
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
          path: "clientConfig",
          isItem: false,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
          path: "webhooks.clientConfig",
          isItem: false,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
          path: "clientConfig",
          isItem: false,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
          path: "webhooks.clientConfig",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * MatchCondition represents a condition which must by fulfilled for a request to be sent to a webhook. */
export const MatchCondition = (props: {
  /**
   * Expression represents the expression which will be evaluated by CEL. Must evaluate to bool. CEL expressions have access to the contents of the AdmissionRequest and Authorizer, organized into CEL variables:
   *
   * 'object' - The object from the incoming request. The value is null for DELETE requests. 'oldObject' - The existing object. The value is null for CREATE requests. 'request' - Attributes of the admission request(/pkg/apis/admission/types.go#AdmissionRequest). 'authorizer' - A CEL Authorizer. May be used to perform authorization checks for the principal (user or service account) of the request.
   * See https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz
   * 'authorizer.requestResource' - A CEL ResourceCheck constructed from the 'authorizer' and configured with the
   * request resource.
   * Documentation on CEL: https://kubernetes.io/docs/reference/using-api/cel/
   *
   * Required.
   */
  expression: string;
  /**
   * Name is an identifier for this match condition, used for strategic merging of MatchConditions, as well as providing an identifier for logging purposes. A good name should be descriptive of the associated expression. Name must be a qualified name consisting of alphanumeric characters, '-', '_' or '.', and must start and end with an alphanumeric character (e.g. 'MyName',  or 'my.name',  or '123-abc', regex used for validation is '([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9]') with an optional DNS subdomain prefix and '/' (e.g. 'example.com/MyName')
   *
   * Required.
   */
  name: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.admissionregistration.v1.MatchCondition"
      contexts={[
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
          path: "matchConditions",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
          path: "webhooks.matchConditions",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
          path: "matchConditions",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
          path: "webhooks.matchConditions",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * RuleWithOperations is a tuple of Operations and Resources. It is recommended to make sure that all the tuple expansions are valid. */
export const RuleWithOperations = (props: {
  /**
   * APIGroups is the API groups the resources belong to. '*' is all groups. If '*' is present, the length of the slice must be one. Required.
   */
  apiGroups?: string[];
  /**
   * APIVersions is the API versions the resources belong to. '*' is all versions. If '*' is present, the length of the slice must be one. Required.
   */
  apiVersions?: string[];
  /**
   * Operations is the operations the admission hook cares about - CREATE, UPDATE, DELETE, CONNECT or * for all of those operations and any future admission operations that are added. If '*' is present, the length of the slice must be one. Required.
   */
  operations?: string[];
  /**
   * Resources is a list of resources this rule applies to.
   *
   * For example: 'pods' means pods. 'pods/log' means the log subresource of pods. '*' means all resources, but not subresources. 'pods/*' means all subresources of pods. '*​/scale' means all scale subresources. '*​/*' means all resources and their subresources.
   *
   * If wildcard is present, the validation rule will ensure resources do not overlap with each other.
   *
   * Depending on the enclosing object, subresources might not be allowed. Required.
   */
  resources?: string[];
  /**
   * scope specifies the scope of this rule. Valid values are "Cluster", "Namespaced", and "*" "Cluster" means that only cluster-scoped resources will match this rule. Namespace API objects are cluster-scoped. "Namespaced" means that only namespaced resources will match this rule. "*" means that there are no scope restrictions. Subresources match the scope of their parent resource. Default is "*".
   */
  scope?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.admissionregistration.v1.RuleWithOperations"
      contexts={[
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
          path: "rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
          path: "webhooks.rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
          path: "rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
          path: "webhooks.rules",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
