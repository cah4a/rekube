import { IObjectMeta } from "meta/v1";
import { useKubeProps, Resource } from "rekube";

/** * Describes a certificate signing request */
export const CertificateSigningRequest = (
  props: {
    /**
     * Extra information about the requesting user. See user.Info interface for details.
     */
    extra?: Record<string, string>;
    /**
     * Group information about the requesting user. See user.Info interface for details.
     */
    groups?: string[];
    /**
     * Base64-encoded PKCS#10 CSR data
     */
    request: string;
    /**
     * Requested signer for the request. It is a qualified name in the form: `scope-hostname.io/name`. If empty, it will be defaulted:
     * 1. If it's a kubelet client certificate, it is assigned
     * "kubernetes.io/kube-apiserver-client-kubelet".
     * 2. If it's a kubelet serving certificate, it is assigned
     * "kubernetes.io/kubelet-serving".
     * 3. Otherwise, it is assigned "kubernetes.io/legacy-unknown".
     * Distribution of trust for signers happens out of band. You can select on this field using `spec.signerName`.
     */
    signerName?: string;
    /**
     * UID information about the requesting user. See user.Info interface for details.
     */
    uid?: string;
    /**
     * allowedUsages specifies a set of usage contexts the key will be valid for. See: https://tools.ietf.org/html/rfc5280#section-4.2.1.3
     * https://tools.ietf.org/html/rfc5280#section-4.2.1.12
     * Valid values are:
     * "signing",
     * "digital signature",
     * "content commitment",
     * "key encipherment",
     * "key agreement",
     * "data encipherment",
     * "cert sign",
     * "crl sign",
     * "encipher only",
     * "decipher only",
     * "any",
     * "server auth",
     * "client auth",
     * "code signing",
     * "email protection",
     * "s/mime",
     * "ipsec end system",
     * "ipsec tunnel",
     * "ipsec user",
     * "timestamping",
     * "ocsp signing",
     * "microsoft sgc",
     * "netscape sgc"
     */
    usages?: string[];
    /**
     * Information about the requesting user. See user.Info interface for details.
     */
    username?: string;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.certificates.v1beta1.CertificateSigningRequest"
      kind="CertificateSigningRequest"
      apiVersion="certificates.k8s.io/v1beta1"
      props={childProps}
    />
  );
};
