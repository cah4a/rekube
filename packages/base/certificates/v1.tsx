import { IOwnerReference } from "meta/v1";
import { Resource, useResourceProps } from "rekube";

/**
 * CertificateSigningRequest objects provide a mechanism to obtain x509 certificates by submitting a certificate signing request, and having it asynchronously approved and issued.
 *
 * Kubelets use this API to obtain:
 * 1. client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client-kubelet" signerName).
 * 2. serving certificates for TLS endpoints kube-apiserver can connect to securely (with the "kubernetes.io/kubelet-serving" signerName).
 *
 * This API can be used to request client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client" signerName), or to obtain certificates from custom non-Kubernetes signers.
 */
export function CertificateSigningRequest(props: {
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
   * expirationSeconds is the requested duration of validity of the issued certificate. The certificate signer may issue a certificate with a different validity duration so a client must check the delta between the notBefore and and notAfter fields in the issued certificate to determine the actual duration.
   *
   * The v1.22+ in-tree implementations of the well-known Kubernetes signers will honor this field as long as the requested duration is not greater than the maximum duration they will honor per the --cluster-signing-duration CLI flag to the Kubernetes controller manager.
   *
   * Certificate signers may not honor this field for various reasons:
   *
   * 1. Old signer that is unaware of the field (such as the in-tree
   * implementations prior to v1.22)
   * 2. Signer whose configured maximum is shorter than the requested duration
   * 3. Signer whose configured minimum is longer than the requested duration
   *
   * The minimum valid value for expirationSeconds is 600, i.e. 10 minutes.
   */
  expirationSeconds?: number;
  /**
   * extra contains extra attributes of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.
   */
  extra?: object;
  /**
   * groups contains group membership of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.
   */
  groups?: string[];
  /**
   * request contains an x509 certificate signing request encoded in a "CERTIFICATE REQUEST" PEM block. When serialized as JSON or YAML, the data is additionally base64-encoded.
   */
  request: string;
  /**
   * signerName indicates the requested signer, and is a qualified name.
   *
   * List/watch requests for CertificateSigningRequests can filter on this field using a "spec.signerName=NAME" fieldSelector.
   *
   * Well-known Kubernetes signers are:
   * 1. "kubernetes.io/kube-apiserver-client": issues client certificates that can be used to authenticate to kube-apiserver.
   * Requests for this signer are never auto-approved by kube-controller-manager, can be issued by the "csrsigning" controller in kube-controller-manager.
   * 2. "kubernetes.io/kube-apiserver-client-kubelet": issues client certificates that kubelets use to authenticate to kube-apiserver.
   * Requests for this signer can be auto-approved by the "csrapproving" controller in kube-controller-manager, and can be issued by the "csrsigning" controller in kube-controller-manager.
   * 3. "kubernetes.io/kubelet-serving" issues serving certificates that kubelets use to serve TLS endpoints, which kube-apiserver can connect to securely.
   * Requests for this signer are never auto-approved by kube-controller-manager, and can be issued by the "csrsigning" controller in kube-controller-manager.
   *
   * More details are available at https://k8s.io/docs/reference/access-authn-authz/certificate-signing-requests/#kubernetes-signers
   *
   * Custom signerNames can also be specified. The signer defines:
   * 1. Trust distribution: how trust (CA bundles) are distributed.
   * 2. Permitted subjects: and behavior when a disallowed subject is requested.
   * 3. Required, permitted, or forbidden x509 extensions in the request (including whether subjectAltNames are allowed, which types, restrictions on allowed values) and behavior when a disallowed extension is requested.
   * 4. Required, permitted, or forbidden key usages / extended key usages.
   * 5. Expiration/certificate lifetime: whether it is fixed by the signer, configurable by the admin.
   * 6. Whether or not requests for CA certificates are allowed.
   */
  signerName: string;
  /**
   * uid contains the uid of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.
   */
  uid?: string;
  /**
   * usages specifies a set of key usages requested in the issued certificate.
   *
   * Requests for TLS client certificates typically request: "digital signature", "key encipherment", "client auth".
   *
   * Requests for TLS serving certificates typically request: "key encipherment", "digital signature", "server auth".
   *
   * Valid values are:
   * "signing", "digital signature", "content commitment",
   * "key encipherment", "key agreement", "data encipherment",
   * "cert sign", "crl sign", "encipher only", "decipher only", "any",
   * "server auth", "client auth",
   * "code signing", "email protection", "s/mime",
   * "ipsec end system", "ipsec tunnel", "ipsec user",
   * "timestamping", "ocsp signing", "microsoft sgc", "netscape sgc"
   */
  usages?: string[];
  /**
   * username contains the name of the user that created the CertificateSigningRequest. Populated by the API server on creation and immutable.
   */
  username?: string;
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="CertificateSigningRequest"
      apiVersion="certificates.k8s.io/v1"
      id="io.k8s.api.certificates.v1.CertificateSigningRequest"
      props={childProps}
    />
  );
}
