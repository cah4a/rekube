import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * SelfSubjectReview contains the user information that the kube-apiserver has about the user making this request. When using impersonation, users will receive the user info of the user being impersonated.  If impersonation or request header authentication is used, any extra keys will have their case ignored and returned as lowercase. */
export const SelfSubjectReview = (props: {} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Resource
      id="io.k8s.api.authentication.v1alpha1.SelfSubjectReview"
      kind="SelfSubjectReview"
      apiVersion="authentication.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};
