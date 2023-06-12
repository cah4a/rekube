import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * ClusterTrustBundle is a cluster-scoped container for X.509 trust anchors (root certificates).
 *
 * ClusterTrustBundle objects are considered to be readable by any authenticated user in the cluster, because they can be mounted by pods using the `clusterTrustBundle` projection.  All service accounts have read access to ClusterTrustBundles by default.  Users who only have namespace-level access to a cluster can read ClusterTrustBundles by impersonating a serviceaccount that they have access to.
 *
 * It can be optionally associated with a particular assigner, in which case it contains one valid set of trust anchors for that signer. Signers may have multiple associated ClusterTrustBundles; each is an independent set of trust anchors for that signer. Admission control is used to enforce that only users with permissions on the signer can create or modify the corresponding bundle. */
export const ClusterTrustBundle = (
  props: {
    /**
     * signerName indicates the associated signer, if any.
     *
     * In order to create or update a ClusterTrustBundle that sets signerName, you must have the following cluster-scoped permission: group=certificates.k8s.io resource=signers resourceName=<the signer name> verb=attest.
     *
     * If signerName is not empty, then the ClusterTrustBundle object must be named with the signer name as a prefix (translating slashes to colons). For example, for the signer name `example.com/foo`, valid ClusterTrustBundle object names include `example.com:foo:abc` and `example.com:foo:v1`.
     *
     * If signerName is empty, then the ClusterTrustBundle object's name must not have such a prefix.
     *
     * List/watch requests for ClusterTrustBundles can filter on this field using a `spec.signerName=NAME` field selector.
     */
    signerName?: string;
    /**
     * trustBundle contains the individual X.509 trust anchors for this bundle, as PEM bundle of PEM-wrapped, DER-formatted X.509 certificates.
     *
     * The data must consist only of PEM certificate blocks that parse as valid X.509 certificates.  Each certificate must include a basic constraints extension with the CA bit set.  The API server will reject objects that contain duplicate certificates, or that use PEM block headers.
     *
     * Users of ClusterTrustBundles, including Kubelet, are free to reorder and deduplicate certificate blocks in this file according to their own logic, as well as to drop PEM block headers and inter-block data.
     */
    trustBundle: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.certificates.v1alpha1.ClusterTrustBundle"
      kind="ClusterTrustBundle"
      apiVersion="certificates.k8s.io/v1alpha1"
      props={childProps}
    />
  );
};
