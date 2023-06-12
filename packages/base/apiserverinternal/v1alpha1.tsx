import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * Storage version of a specific resource. */
export const StorageVersion = (props: {} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.apiserverinternal.v1alpha1.StorageVersion"
      kind="StorageVersion"
      apiVersion="internal.apiserver.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};
