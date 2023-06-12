import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/**
 * BoundObjectReference is a reference to an object that a token is bound to.
 */
export interface IBoundObjectReference {
  /**
   * Name of the referent.
   */
  name?: string;
  /**
   * UID of the referent.
   */
  uid?: string;
}

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
      id="io.k8s.api.authentication.v1.TokenReview"
      kind="TokenReview"
      apiVersion="authentication.k8s.io/v1"
      props={childProps}
    />
  );
};

/** * TokenRequest requests a token for a given service account. */
export const TokenRequest = (
  props: {
    /**
     * Audiences are the intendend audiences of the token. A recipient of a token must identify themself with an identifier in the list of audiences of the token, and otherwise should reject the token. A token issued for multiple audiences may be used to authenticate against any of the audiences listed but implies a high degree of trust between the target audiences.
     */
    audiences: string[];
    /**
     * BoundObjectRef is a reference to an object that the token will be bound to. The token will only be valid for as long as the bound object exists. NOTE: The API server's TokenReview endpoint will validate the BoundObjectRef, but other audiences may not. Keep ExpirationSeconds small if you want prompt revocation.
     */
    boundObjectRef?: IBoundObjectReference;
    /**
     * ExpirationSeconds is the requested duration of validity of the request. The token issuer may return a token with a different validity duration so a client needs to check the 'expiration' field in a response.
     */
    expirationSeconds?: number | bigint;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.authentication.v1.TokenRequest"
      kind="TokenRequest"
      apiVersion="authentication.k8s.io/v1"
      props={childProps}
    />
  );
};
