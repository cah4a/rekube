import { ILabelSelectorRequirement, IObjectMeta } from "meta/v1";
import { useKubeProps, Resource, Item } from "rekube";

/**
 * RoleRef contains information that points to the role being used
 */
export interface IRoleRef {
  /**
   * APIGroup is the group for the resource being referenced
   */
  apiGroup: string;
  /**
   * Name is the name of resource being referenced
   */
  name: string;
}

/**
 * Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names.
 */
export interface ISubject {
  /**
   * APIGroup holds the API group of the referenced subject. Defaults to "" for ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User and Group subjects.
   */
  apiGroup?: string;
  /**
   * Name of the object being referenced.
   */
  name: string;
  /**
   * Namespace of the referenced object.  If the object kind is non-namespace, such as "User" or "Group", and this value is not empty the Authorizer should report an error.
   */
  namespace?: string;
}

/**
 * AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole
 */
export interface IAggregationRule {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: ILabelSelectorRequirement[];
  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   */
  matchLabels?: Record<string, string>;
}

/**
 * PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.
 */
export interface IPolicyRule {
  /**
   * APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.
   */
  apiGroups?: string[];
  /**
   * NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.
   */
  nonResourceURLs?: string[];
  /**
   * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
   */
  resourceNames?: string[];
  /**
   * Resources is a list of resources this rule applies to. '*' represents all resources.
   */
  resources?: string[];
  /**
   * Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.
   */
  verbs: string[];
}

/** * ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding.
 *
 * Child components:
 * - aggregationRule: {@link AggregationRule} (single element)
 * - rules: {@link PolicyRule} */
export const ClusterRole = ({
  children,
  ...props
}: {
  /**
   * AggregationRule is an optional field that describes how to build the Rules for this ClusterRole. If AggregationRule is set, then the Rules are controller managed and direct changes to Rules will be stomped by the controller.
   */
  aggregationRule?: IAggregationRule;
  /**
   * Rules holds all the PolicyRules for this ClusterRole
   */
  rules?: IPolicyRule[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.rbac.v1.ClusterRole"
      kind="ClusterRole"
      apiVersion="rbac.authorization.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject.
 *
 * Child components:
 * - subjects: {@link Subject} */
export const ClusterRoleBinding = ({
  children,
  ...props
}: {
  /**
   * RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.
   */
  roleRef: IRoleRef;
  /**
   * Subjects holds references to the objects the role applies to.
   */
  subjects?: ISubject[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.rbac.v1.ClusterRoleBinding"
      kind="ClusterRoleBinding"
      apiVersion="rbac.authorization.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding. */
export const Role = (
  props: {
    /**
     * APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.
     */
    apiGroups?: string[];
    /**
     * NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.
     */
    nonResourceURLs?: string[];
    /**
     * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
     */
    resourceNames?: string[];
    /**
     * Resources is a list of resources this rule applies to. '*' represents all resources.
     */
    resources?: string[];
    /**
     * Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.
     */
    verbs: string[];
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "rules",
  });
  return (
    <Resource
      id="io.k8s.api.rbac.v1.Role"
      kind="Role"
      apiVersion="rbac.authorization.k8s.io/v1"
      props={childProps}
    />
  );
};

/** * RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace.
 *
 * Child components:
 * - subjects: {@link Subject} */
export const RoleBinding = ({
  children,
  ...props
}: {
  /**
   * RoleRef can reference a Role in the current namespace or a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.
   */
  roleRef: IRoleRef;
  /**
   * Subjects holds references to the objects the role applies to.
   */
  subjects?: ISubject[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.rbac.v1.RoleBinding"
      kind="RoleBinding"
      apiVersion="rbac.authorization.k8s.io/v1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names. */
export const Subject = (props: {
  /**
   * APIGroup holds the API group of the referenced subject. Defaults to "" for ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User and Group subjects.
   */
  apiGroup?: string;
  /**
   * Name of the object being referenced.
   */
  name: string;
  /**
   * Namespace of the referenced object.  If the object kind is non-namespace, such as "User" or "Group", and this value is not empty the Authorizer should report an error.
   */
  namespace?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.rbac.v1.Subject"
      contexts={[
        {
          id: "io.k8s.api.rbac.v1.ClusterRoleBinding",
          path: "subjects",
          isItem: true,
        },
        {
          id: "io.k8s.api.rbac.v1.RoleBinding",
          path: "subjects",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole
 *
 * Child components:
 * - clusterRoleSelectors.matchExpressions: {@link LabelSelectorRequirement} */
export const AggregationRule = ({
  children,
  ...props
}: {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: ILabelSelectorRequirement[];
  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   */
  matchLabels?: Record<string, string>;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {
    key: "clusterRoleSelectors",
  });
  return (
    <Item
      id="io.k8s.api.rbac.v1.AggregationRule"
      contexts={[
        {
          id: "io.k8s.api.rbac.v1.ClusterRole",
          path: "aggregationRule",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to. */
ClusterRole.PolicyRule = (props: {
  /**
   * APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.
   */
  apiGroups?: string[];
  /**
   * NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.
   */
  nonResourceURLs?: string[];
  /**
   * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
   */
  resourceNames?: string[];
  /**
   * Resources is a list of resources this rule applies to. '*' represents all resources.
   */
  resources?: string[];
  /**
   * Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.
   */
  verbs: string[];
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.api.rbac.v1.PolicyRule"
      contexts={[
        { id: "io.k8s.api.rbac.v1.ClusterRole", path: "rules", isItem: true },
      ]}
      value={childProps}
    />
  );
};
