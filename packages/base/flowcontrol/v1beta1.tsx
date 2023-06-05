import { IOwnerReference } from "meta/v1";
import { Resource, useResourceProps, Item } from "rekube";

/**
 * FlowDistinguisherMethod specifies the method of a flow distinguisher.
 */
export interface IFlowDistinguisherMethod {
  /**
   * `type` is the type of flow distinguisher method The supported types are "ByUser" and "ByNamespace". Required.
   */
  type: string;
}

/**
 * PriorityLevelConfigurationReference contains information that points to the "request-priority" being used.
 */
export interface IPriorityLevelConfigurationReference {
  /**
   * `name` is the name of the priority level configuration being referenced Required.
   */
  name: string;
}

/**
 * PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request.
 */
export interface IPolicyRulesWithSubjects {
  /**
   * `nonResourceRules` is a list of NonResourcePolicyRules that identify matching requests according to their verb and the target non-resource URL.
   */
  nonResourceRules?: INonResourcePolicyRule[];
  /**
   * `resourceRules` is a slice of ResourcePolicyRules that identify matching requests according to their verb and the target resource. At least one of `resourceRules` and `nonResourceRules` has to be non-empty.
   */
  resourceRules?: IResourcePolicyRule[];
  /**
   * subjects is the list of normal user, serviceaccount, or group that this rule cares about. There must be at least one member in this slice. A slice that includes both the system:authenticated and system:unauthenticated user groups matches every request. Required.
   */
  subjects: ISubject[];
}

/**
 * NonResourcePolicyRule is a predicate that matches non-resource requests according to their verb and the target non-resource URL. A NonResourcePolicyRule matches a request if and only if both (a) at least one member of verbs matches the request and (b) at least one member of nonResourceURLs matches the request.
 */
export interface INonResourcePolicyRule {
  /**
   * `nonResourceURLs` is a set of url prefixes that a user should have access to and may not be empty. For example:
   * - "/healthz" is legal
   * - "/hea*" is illegal
   * - "/hea" is legal but matches nothing
   * - "/hea/*" also matches nothing
   * - "/healthz/*" matches all per-component health checks.
   * "*" matches all non-resource urls. if it is present, it must be the only entry. Required.
   */
  nonResourceURLs: string[];
  /**
   * `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs. If it is present, it must be the only entry. Required.
   */
  verbs: string[];
}

/**
 * ResourcePolicyRule is a predicate that matches some resource requests, testing the request's verb and the target resource. A ResourcePolicyRule matches a resource request if and only if: (a) at least one member of verbs matches the request, (b) at least one member of apiGroups matches the request, (c) at least one member of resources matches the request, and (d) either (d1) the request does not specify a namespace (i.e., `Namespace==""`) and clusterScope is true or (d2) the request specifies a namespace and least one member of namespaces matches the request's namespace.
 */
export interface IResourcePolicyRule {
  /**
   * `apiGroups` is a list of matching API groups and may not be empty. "*" matches all API groups and, if present, must be the only entry. Required.
   */
  apiGroups: string[];
  /**
   * `clusterScope` indicates whether to match requests that do not specify a namespace (which happens either because the resource is not namespaced or the request targets all namespaces). If this field is omitted or false then the `namespaces` field must contain a non-empty list.
   */
  clusterScope?: boolean;
  /**
   * `namespaces` is a list of target namespaces that restricts matches.  A request that specifies a target namespace matches only if either (a) this list contains that target namespace or (b) this list contains "*".  Note that "*" matches any specified namespace but does not match a request that _does not specify_ a namespace (see the `clusterScope` field for that). This list may be empty, but only if `clusterScope` is true.
   */
  namespaces?: string[];
  /**
   * `resources` is a list of matching resources (i.e., lowercase and plural) with, if desired, subresource.  For example, [ "services", "nodes/status" ].  This list may not be empty. "*" matches all resources and, if present, must be the only entry. Required.
   */
  resources: string[];
  /**
   * `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs and, if present, must be the only entry. Required.
   */
  verbs: string[];
}

/**
 * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.
 */
export interface ISubject {
  /**
   * `group` matches based on user group name.
   */
  group?: IGroupSubject;
  /**
   * `serviceAccount` matches ServiceAccounts.
   */
  serviceAccount?: IServiceAccountSubject;
  /**
   * `user` matches based on username.
   */
  user?: IUserSubject;
}

/**
 * GroupSubject holds detailed information for group-kind subject.
 */
export interface IGroupSubject {
  /**
   * name is the user group that matches, or "*" to match all user groups. See https://github.com/kubernetes/apiserver/blob/master/pkg/authentication/user/user.go for some well-known group names. Required.
   */
  name: string;
}

/**
 * ServiceAccountSubject holds detailed information for service-account-kind subject.
 */
export interface IServiceAccountSubject {
  /**
   * `name` is the name of matching ServiceAccount objects, or "*" to match regardless of name. Required.
   */
  name: string;
  /**
   * `namespace` is the namespace of matching ServiceAccount objects. Required.
   */
  namespace: string;
}

/**
 * UserSubject holds detailed information for user-kind subject.
 */
export interface IUserSubject {
  /**
   * `name` is the username that matches, or "*" to match all usernames. Required.
   */
  name: string;
}

/**
 * LimitedPriorityLevelConfiguration specifies how to handle requests that are subject to limits. It addresses two issues:
 * - How are requests for this priority level limited?
 * - What should be done with requests that exceed the limit?
 */
export interface ILimitedPriorityLevelConfiguration {
  /**
   * `assuredConcurrencyShares` (ACS) configures the execution limit, which is a limit on the number of requests of this priority level that may be exeucting at a given time.  ACS must be a positive number. The server's concurrency limit (SCL) is divided among the concurrency-controlled priority levels in proportion to their assured concurrency shares. This produces the assured concurrency value (ACV) --- the number of requests that may be executing at a time --- for each such priority level:
   *
   * ACV(l) = ceil( SCL * ACS(l) / ( sum[priority levels k] ACS(k) ) )
   *
   * bigger numbers of ACS mean more reserved concurrent requests (at the expense of every other PL). This field has a default value of 30.
   */
  assuredConcurrencyShares?: number;
  /**
   * `limitResponse` indicates what to do with requests that can not be executed right now
   */
  limitResponse?: ILimitResponse;
}

/**
 * LimitResponse defines how to handle requests that can not be executed right now.
 */
export interface ILimitResponse {
  /**
   * `queuing` holds the configuration parameters for queuing. This field may be non-empty only if `type` is `"Queue"`.
   */
  queuing?: IQueuingConfiguration;
  /**
   * `type` is "Queue" or "Reject". "Queue" means that requests that can not be executed upon arrival are held in a queue until they can be executed or a queuing limit is reached. "Reject" means that requests that can not be executed upon arrival are rejected. Required.
   */
  type: string;
}

/**
 * QueuingConfiguration holds the configuration parameters for queuing
 */
export interface IQueuingConfiguration {
  /**
   * `handSize` is a small positive number that configures the shuffle sharding of requests into queues.  When enqueuing a request at this priority level the request's flow identifier (a string pair) is hashed and the hash value is used to shuffle the list of queues and deal a hand of the size specified here.  The request is put into one of the shortest queues in that hand. `handSize` must be no larger than `queues`, and should be significantly smaller (so that a few heavy flows do not saturate most of the queues).  See the user-facing documentation for more extensive guidance on setting this field.  This field has a default value of 8.
   */
  handSize?: number;
  /**
   * `queueLengthLimit` is the maximum number of requests allowed to be waiting in a given queue of this priority level at a time; excess requests are rejected.  This value must be positive.  If not specified, it will be defaulted to 50.
   */
  queueLengthLimit?: number;
  /**
   * `queues` is the number of queues for this priority level. The queues exist independently at each apiserver. The value must be positive.  Setting it to 1 effectively precludes shufflesharding and thus makes the distinguisher method of associated flow schemas irrelevant.  This field has a default value of 64.
   */
  queues?: number;
}

/**
 * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 *
 * Child components:
 * - spec.rules: {@link PolicyRulesWithSubjects}
 */
export function FlowSchema({
  children,
  ...props
}: {
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
   * `distinguisherMethod` defines how to compute the flow distinguisher for requests that match this schema. `nil` specifies that the distinguisher is disabled and thus will always be the empty string.
   */
  distinguisherMethod?: IFlowDistinguisherMethod;
  /**
   * `matchingPrecedence` is used to choose among the FlowSchemas that match a given request. The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence.  Each MatchingPrecedence value must be ranged in [1,10000]. Note that if the precedence is not specified, it will be set to 1000 as default.
   */
  matchingPrecedence?: number;
  /**
   * `priorityLevelConfiguration` should reference a PriorityLevelConfiguration in the cluster. If the reference cannot be resolved, the FlowSchema will be ignored and marked as invalid in its status. Required.
   */
  priorityLevelConfiguration: IPriorityLevelConfigurationReference;
  /**
   * `rules` describes which requests will match this flow schema. This FlowSchema matches a request if and only if at least one member of rules matches the request. if it is an empty slice, there will be no requests matching the FlowSchema.
   */
  rules?: IPolicyRulesWithSubjects[];
  children?: React.ReactNode;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="FlowSchema"
      apiVersion="flowcontrol.apiserver.k8s.io/v1beta1"
      id="io.k8s.api.flowcontrol.v1beta1.FlowSchema"
      props={childProps}
    >
      {children}
    </Resource>
  );
}

/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 */
export function PriorityLevelConfiguration(props: {
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
   * `limited` specifies how requests are handled for a Limited priority level. This field must be non-empty if and only if `type` is `"Limited"`.
   */
  limited?: ILimitedPriorityLevelConfiguration;
  /**
   * `type` indicates whether this priority level is subject to limitation on request execution.  A value of `"Exempt"` means that requests of this priority level are not subject to a limit (and thus are never queued) and do not detract from the capacity made available to other priority levels.  A value of `"Limited"` means that (a) requests of this priority level _are_ subject to limits and (b) some of the server's limited capacity is made available exclusively to this priority level. Required.
   */
  type: string;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="PriorityLevelConfiguration"
      apiVersion="flowcontrol.apiserver.k8s.io/v1beta1"
      id="io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration"
      props={childProps}
    />
  );
}

/**
 * PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request.
 *
 * Child components:
 * - nonResourceRules: {@link NonResourcePolicyRule}
 * - resourceRules: {@link ResourcePolicyRule}
 * - subjects: {@link Subject}
 */
export function PolicyRulesWithSubjects({
  children,
  ...props
}: {
  /**
   * `nonResourceRules` is a list of NonResourcePolicyRules that identify matching requests according to their verb and the target non-resource URL.
   */
  nonResourceRules?: INonResourcePolicyRule[];
  /**
   * `resourceRules` is a slice of ResourcePolicyRules that identify matching requests according to their verb and the target resource. At least one of `resourceRules` and `nonResourceRules` has to be non-empty.
   */
  resourceRules?: IResourcePolicyRule[];
  /**
   * subjects is the list of normal user, serviceaccount, or group that this rule cares about. There must be at least one member in this slice. A slice that includes both the system:authenticated and system:unauthenticated user groups matches every request. Required.
   */
  subjects: ISubject[];
  children?: React.ReactNode;
}) {
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects"
      paths={{ "io.k8s.api.flowcontrol.v1beta1.FlowSchema": "spec.rules" }}
      value={props}
    >
      {children}
    </Item>
  );
}

/**
 * NonResourcePolicyRule is a predicate that matches non-resource requests according to their verb and the target non-resource URL. A NonResourcePolicyRule matches a request if and only if both (a) at least one member of verbs matches the request and (b) at least one member of nonResourceURLs matches the request.
 */
export function NonResourcePolicyRule(props: {
  /**
   * `nonResourceURLs` is a set of url prefixes that a user should have access to and may not be empty. For example:
   * - "/healthz" is legal
   * - "/hea*" is illegal
   * - "/hea" is legal but matches nothing
   * - "/hea/*" also matches nothing
   * - "/healthz/*" matches all per-component health checks.
   * "*" matches all non-resource urls. if it is present, it must be the only entry. Required.
   */
  nonResourceURLs: string[];
  /**
   * `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs. If it is present, it must be the only entry. Required.
   */
  verbs: string[];
}) {
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.NonResourcePolicyRule"
      paths={{
        "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects":
          "nonResourceRules",
      }}
      value={props}
    />
  );
}

/**
 * ResourcePolicyRule is a predicate that matches some resource requests, testing the request's verb and the target resource. A ResourcePolicyRule matches a resource request if and only if: (a) at least one member of verbs matches the request, (b) at least one member of apiGroups matches the request, (c) at least one member of resources matches the request, and (d) either (d1) the request does not specify a namespace (i.e., `Namespace==""`) and clusterScope is true or (d2) the request specifies a namespace and least one member of namespaces matches the request's namespace.
 */
export function ResourcePolicyRule(props: {
  /**
   * `apiGroups` is a list of matching API groups and may not be empty. "*" matches all API groups and, if present, must be the only entry. Required.
   */
  apiGroups: string[];
  /**
   * `clusterScope` indicates whether to match requests that do not specify a namespace (which happens either because the resource is not namespaced or the request targets all namespaces). If this field is omitted or false then the `namespaces` field must contain a non-empty list.
   */
  clusterScope?: boolean;
  /**
   * `namespaces` is a list of target namespaces that restricts matches.  A request that specifies a target namespace matches only if either (a) this list contains that target namespace or (b) this list contains "*".  Note that "*" matches any specified namespace but does not match a request that _does not specify_ a namespace (see the `clusterScope` field for that). This list may be empty, but only if `clusterScope` is true.
   */
  namespaces?: string[];
  /**
   * `resources` is a list of matching resources (i.e., lowercase and plural) with, if desired, subresource.  For example, [ "services", "nodes/status" ].  This list may not be empty. "*" matches all resources and, if present, must be the only entry. Required.
   */
  resources: string[];
  /**
   * `verbs` is a list of matching verbs and may not be empty. "*" matches all verbs and, if present, must be the only entry. Required.
   */
  verbs: string[];
}) {
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.ResourcePolicyRule"
      paths={{
        "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects":
          "resourceRules",
      }}
      value={props}
    />
  );
}

/**
 * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.
 */
export function Subject(props: {
  /**
   * `group` matches based on user group name.
   */
  group?: IGroupSubject;
  /**
   * `serviceAccount` matches ServiceAccounts.
   */
  serviceAccount?: IServiceAccountSubject;
  /**
   * `user` matches based on username.
   */
  user?: IUserSubject;
}) {
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.Subject"
      paths={{
        "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects": "subjects",
      }}
      value={props}
    />
  );
}
