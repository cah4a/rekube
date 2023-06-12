import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/**
 * NonResourceAttributes includes the authorization attributes available for non-resource requests to the Authorizer interface
 */
export interface INonResourceAttributes {
  /**
   * Path is the URL path of the request
   */
  path?: string;
  /**
   * Verb is the standard HTTP verb
   */
  verb?: string;
}

/**
 * ResourceAttributes includes the authorization attributes available for resource requests to the Authorizer interface
 */
export interface IResourceAttributes {
  /**
   * Group is the API Group of the Resource.  "*" means all.
   */
  group?: string;
  /**
   * Name is the name of the resource being requested for a "get" or deleted for a "delete". "" (empty) means all.
   */
  name?: string;
  /**
   * Namespace is the namespace of the action being requested.  Currently, there is no distinction between no namespace and all namespaces "" (empty) is defaulted for LocalSubjectAccessReviews "" (empty) is empty for cluster-scoped resources "" (empty) means "all" for namespace scoped resources from a SubjectAccessReview or SelfSubjectAccessReview
   */
  namespace?: string;
  /**
   * Resource is one of the existing resource types.  "*" means all.
   */
  resource?: string;
  /**
   * Subresource is one of the existing resource types.  "" means none.
   */
  subresource?: string;
  /**
   * Verb is a kubernetes resource API verb, like: get, list, watch, create, update, delete, proxy.  "*" means all.
   */
  verb?: string;
  /**
   * Version is the API Version of the Resource.  "*" means all.
   */
  version?: string;
}

/** * LocalSubjectAccessReview checks whether or not a user or group can perform an action in a given namespace. Having a namespace scoped resource makes it much easier to grant namespace scoped policy that includes permissions checking. */
export const LocalSubjectAccessReview = (
  props: {
    /**
     * Extra corresponds to the user.Info.GetExtra() method from the authenticator.  Since that is input to the authorizer it needs a reflection here.
     */
    extra?: Record<string, string>;
    /**
     * Groups is the groups you're testing for.
     */
    group?: string[];
    /**
     * NonResourceAttributes describes information for a non-resource access request
     */
    nonResourceAttributes?: INonResourceAttributes;
    /**
     * ResourceAuthorizationAttributes describes information for a resource access request
     */
    resourceAttributes?: IResourceAttributes;
    /**
     * UID information about the requesting user.
     */
    uid?: string;
    /**
     * User is the user you're testing for. If you specify "User" but not "Group", then is it interpreted as "What if User were not a member of any groups
     */
    user?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authorization.v1beta1.LocalSubjectAccessReview"
      kind="LocalSubjectAccessReview"
      apiVersion="authorization.k8s.io/v1beta1"
      props={childProps}
    />
  );
};

/** * SelfSubjectAccessReview checks whether or the current user can perform an action.  Not filling in a spec.namespace means "in all namespaces".  Self is a special case, because users should always be able to check whether they can perform an action */
export const SelfSubjectAccessReview = (
  props: {
    /**
     * NonResourceAttributes describes information for a non-resource access request
     */
    nonResourceAttributes?: INonResourceAttributes;
    /**
     * ResourceAuthorizationAttributes describes information for a resource access request
     */
    resourceAttributes?: IResourceAttributes;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authorization.v1beta1.SelfSubjectAccessReview"
      kind="SelfSubjectAccessReview"
      apiVersion="authorization.k8s.io/v1beta1"
      props={childProps}
    />
  );
};

/** * SelfSubjectRulesReview enumerates the set of actions the current user can perform within a namespace. The returned list of actions may be incomplete depending on the server's authorization mode, and any errors experienced during the evaluation. SelfSubjectRulesReview should be used by UIs to show/hide actions, or to quickly let an end user reason about their permissions. It should NOT Be used by external systems to drive authorization decisions as this raises confused deputy, cache lifetime/revocation, and correctness concerns. SubjectAccessReview, and LocalAccessReview are the correct way to defer authorization decisions to the API server. */
export const SelfSubjectRulesReview = (
  props: {
    /**
     * Namespace to evaluate rules for. Required.
     */
    namespace?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authorization.v1beta1.SelfSubjectRulesReview"
      kind="SelfSubjectRulesReview"
      apiVersion="authorization.k8s.io/v1beta1"
      props={childProps}
    />
  );
};

/** * SubjectAccessReview checks whether or not a user or group can perform an action. */
export const SubjectAccessReview = (
  props: {
    /**
     * Extra corresponds to the user.Info.GetExtra() method from the authenticator.  Since that is input to the authorizer it needs a reflection here.
     */
    extra?: Record<string, string>;
    /**
     * Groups is the groups you're testing for.
     */
    group?: string[];
    /**
     * NonResourceAttributes describes information for a non-resource access request
     */
    nonResourceAttributes?: INonResourceAttributes;
    /**
     * ResourceAuthorizationAttributes describes information for a resource access request
     */
    resourceAttributes?: IResourceAttributes;
    /**
     * UID information about the requesting user.
     */
    uid?: string;
    /**
     * User is the user you're testing for. If you specify "User" but not "Group", then is it interpreted as "What if User were not a member of any groups
     */
    user?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authorization.v1beta1.SubjectAccessReview"
      kind="SubjectAccessReview"
      apiVersion="authorization.k8s.io/v1beta1"
      props={childProps}
    />
  );
};
