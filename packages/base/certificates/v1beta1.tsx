import { IOwnerReference } from "meta/v1";
import { Resource, useResourceProps } from "rekube";

/**
 * Describes a certificate signing request
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
   * Extra information about the requesting user. See user.Info interface for details.
   */
  extra?: object;
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
}) {
  const childProps = useResourceProps(props, true);
  return (
    <Resource
      kind="CertificateSigningRequest"
      apiVersion="certificates.k8s.io/v1beta1"
      id="io.k8s.api.certificates.v1beta1.CertificateSigningRequest"
      props={childProps}
    />
  );
}
