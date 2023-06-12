import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver. */
export const TokenReview = (
  props: {
    /**
     * Audiences is a list of the identifiers that the resource server presented with the token identifies as. Audience-aware token authenticators will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver.
     */
    audiences?: string[];
    /**
     * Token is the opaque bearer token.
     */
    token?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authentication.v1beta1.TokenReview"
      kind="TokenReview"
      apiVersion="authentication.k8s.io/v1beta1"
      props={childProps}
    />
  );
};

/** * SelfSubjectReview contains the user information that the kube-apiserver has about the user making this request. When using impersonation, users will receive the user info of the user being impersonated.  If impersonation or request header authentication is used, any extra keys will have their case ignored and returned as lowercase. */
export const SelfSubjectReview = (props: {} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.authentication.v1beta1.SelfSubjectReview"
      kind="SelfSubjectReview"
      apiVersion="authentication.k8s.io/v1beta1"
      props={childProps}
    />
  );
};
