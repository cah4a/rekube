import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";

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
 * QueuingConfiguration holds the configuration parameters for queuing
 */
export interface IQueuingConfiguration {
  /**
   * `handSize` is a small positive number that configures the shuffle sharding of requests into queues.  When enqueuing a request at this priority level the request's flow identifier (a string pair) is hashed and the hash value is used to shuffle the list of queues and deal a hand of the size specified here.  The request is put into one of the shortest queues in that hand. `handSize` must be no larger than `queues`, and should be significantly smaller (so that a few heavy flows do not saturate most of the queues).  See the user-facing documentation for more extensive guidance on setting this field.  This field has a default value of 8.
   */
  handSize?: number | bigint;
  /**
   * `queueLengthLimit` is the maximum number of requests allowed to be waiting in a given queue of this priority level at a time; excess requests are rejected.  This value must be positive.  If not specified, it will be defaulted to 50.
   */
  queueLengthLimit?: number | bigint;
  /**
   * `queues` is the number of queues for this priority level. The queues exist independently at each apiserver. The value must be positive.  Setting it to 1 effectively precludes shufflesharding and thus makes the distinguisher method of associated flow schemas irrelevant.  This field has a default value of 64.
   */
  queues?: number | bigint;
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
  assuredConcurrencyShares?: number | bigint;
  /**
   * `limitResponse` indicates what to do with requests that can not be executed right now
   */
  limitResponse?: ILimitResponse;
}

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
  subjects?: ISubject[];
}

/** * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 *
 * Child components:
 * - spec.rules: {@link PolicyRulesWithSubjects} */
export const FlowSchema = ({
  children,
  ...props
}: {
  /**
   * `distinguisherMethod` defines how to compute the flow distinguisher for requests that match this schema. `nil` specifies that the distinguisher is disabled and thus will always be the empty string.
   */
  distinguisherMethod?: IFlowDistinguisherMethod;
  /**
   * `matchingPrecedence` is used to choose among the FlowSchemas that match a given request. The chosen FlowSchema is among those with the numerically lowest (which we take to be logically highest) MatchingPrecedence.  Each MatchingPrecedence value must be ranged in [1,10000]. Note that if the precedence is not specified, it will be set to 1000 as default.
   */
  matchingPrecedence?: number | bigint;
  /**
   * `priorityLevelConfiguration` should reference a PriorityLevelConfiguration in the cluster. If the reference cannot be resolved, the FlowSchema will be ignored and marked as invalid in its status. Required.
   */
  priorityLevelConfiguration: IPriorityLevelConfigurationReference;
  /**
   * `rules` describes which requests will match this flow schema. This FlowSchema matches a request if and only if at least one member of rules matches the request. if it is an empty slice, there will be no requests matching the FlowSchema.
   */
  rules?: IPolicyRulesWithSubjects[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.flowcontrol.v1beta1.FlowSchema"
      kind="FlowSchema"
      apiVersion="flowcontrol.apiserver.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * PriorityLevelConfiguration represents the configuration of a priority level.
 *
 * Child components:
 * - spec.limited: {@link LimitedPriorityLevelConfiguration} (single element) */
export const PriorityLevelConfiguration = ({
  children,
  ...props
}: {
  /**
   * `limited` specifies how requests are handled for a Limited priority level. This field must be non-empty if and only if `type` is `"Limited"`.
   */
  limited?: ILimitedPriorityLevelConfiguration;
  /**
   * `type` indicates whether this priority level is subject to limitation on request execution.  A value of `"Exempt"` means that requests of this priority level are not subject to a limit (and thus are never queued) and do not detract from the capacity made available to other priority levels.  A value of `"Limited"` means that (a) requests of this priority level _are_ subject to limits and (b) some of the server's limited capacity is made available exclusively to this priority level. Required.
   */
  type: string;
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration"
      kind="PriorityLevelConfiguration"
      apiVersion="flowcontrol.apiserver.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * LimitedPriorityLevelConfiguration specifies how to handle requests that are subject to limits. It addresses two issues:
 * - How are requests for this priority level limited?
 * - What should be done with requests that exceed the limit?
 *
 * Child components:
 * - limitResponse: {@link LimitResponse} (single element) */
export const LimitedPriorityLevelConfiguration = ({
  children,
  ...props
}: {
  /**
   * `assuredConcurrencyShares` (ACS) configures the execution limit, which is a limit on the number of requests of this priority level that may be exeucting at a given time.  ACS must be a positive number. The server's concurrency limit (SCL) is divided among the concurrency-controlled priority levels in proportion to their assured concurrency shares. This produces the assured concurrency value (ACV) --- the number of requests that may be executing at a time --- for each such priority level:
   *
   * ACV(l) = ceil( SCL * ACS(l) / ( sum[priority levels k] ACS(k) ) )
   *
   * bigger numbers of ACS mean more reserved concurrent requests (at the expense of every other PL). This field has a default value of 30.
   */
  assuredConcurrencyShares?: number | bigint;
  /**
   * `limitResponse` indicates what to do with requests that can not be executed right now
   */
  limitResponse?: ILimitResponse;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration",
          path: "spec.limited",
          isItem: false,
        },
        {
          id: "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationSpec",
          path: "limited",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * LimitResponse defines how to handle requests that can not be executed right now. */
export const LimitResponse = (props: {
  /**
   * `queuing` holds the configuration parameters for queuing. This field may be non-empty only if `type` is `"Queue"`.
   */
  queuing?: IQueuingConfiguration;
  /**
   * `type` is "Queue" or "Reject". "Queue" means that requests that can not be executed upon arrival are held in a queue until they can be executed or a queuing limit is reached. "Reject" means that requests that can not be executed upon arrival are rejected. Required.
   */
  type: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.LimitResponse"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration",
          path: "limitResponse",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};

/** * PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request.
 *
 * Child components:
 * - nonResourceRules: {@link NonResourcePolicyRule}
 * - resourceRules: {@link ResourcePolicyRule}
 * - subjects: {@link Subject} */
export const PolicyRulesWithSubjects = ({
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
  subjects?: ISubject[];
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.FlowSchema",
          path: "spec.rules",
          isItem: true,
        },
        {
          id: "io.k8s.api.flowcontrol.v1beta1.FlowSchemaSpec",
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

/** * NonResourcePolicyRule is a predicate that matches non-resource requests according to their verb and the target non-resource URL. A NonResourcePolicyRule matches a request if and only if both (a) at least one member of verbs matches the request and (b) at least one member of nonResourceURLs matches the request. */
PolicyRulesWithSubjects.NonResourcePolicyRule = (props: {
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
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.NonResourcePolicyRule"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
          path: "nonResourceRules",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * ResourcePolicyRule is a predicate that matches some resource requests, testing the request's verb and the target resource. A ResourcePolicyRule matches a resource request if and only if: (a) at least one member of verbs matches the request, (b) at least one member of apiGroups matches the request, (c) at least one member of resources matches the request, and (d) either (d1) the request does not specify a namespace (i.e., `Namespace==""`) and clusterScope is true or (d2) the request specifies a namespace and least one member of namespaces matches the request's namespace. */
PolicyRulesWithSubjects.ResourcePolicyRule = (props: {
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
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.ResourcePolicyRule"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
          path: "resourceRules",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account. */
PolicyRulesWithSubjects.Subject = (props: {
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
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.flowcontrol.v1beta1.Subject"
      contexts={[
        {
          id: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
          path: "subjects",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};
