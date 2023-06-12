import { JSONValue, useKubeProps, Resource, Item } from "rekube";
import { IObjectMeta } from "meta/v1";

/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface IServiceReference {
  /**
   * name is the name of the service. Required
   */
  name: string;
  /**
   * namespace is the namespace of the service. Required
   */
  namespace: string;
  /**
   * path is an optional URL path at which the webhook will be contacted.
   */
  path?: string;
  /**
   * port is an optional service port at which the webhook will be contacted. `port` should be a valid port number (1-65535, inclusive). Defaults to 443 for backward compatibility.
   */
  port?: number | bigint;
}

/**
 * CustomResourceColumnDefinition specifies a column for server side printing.
 */
export interface ICustomResourceColumnDefinition {
  /**
   * JSONPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.
   */
  JSONPath: string;
  /**
   * description is a human readable description of this column.
   */
  description?: string;
  /**
   * format is an optional OpenAPI type definition for this column. The 'name' format is applied to the primary identifier column to assist in clients identifying column is the resource name. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   */
  format?: string;
  /**
   * name is a human readable name for the column.
   */
  name: string;
  /**
   * priority is an integer defining the relative importance of this column compared to others. Lower numbers are considered higher priority. Columns that may be omitted in limited space scenarios should be given a priority greater than 0.
   */
  priority?: number | bigint;
  /**
   * type is an OpenAPI type definition for this column. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   */
  type: string;
}

/**
 * CustomResourceValidation is a list of validation methods for CustomResources.
 */
export interface ICustomResourceValidation {
  /**
   * openAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.
   */
  openAPIV3Schema?: JSONValue;
}

/**
 * CustomResourceSubresources defines the status and scale subresources for CustomResources.
 */
export interface ICustomResourceSubresources {
  /**
   * labelSelectorPath defines the JSON path inside of a custom resource that corresponds to Scale `status.selector`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.status` or `.spec`. Must be set to work with HorizontalPodAutoscaler. The field pointed by this JSON path must be a string field (not a complex selector struct) which contains a serialized label selector in string form. More info: https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions#scale-subresource If there is no value under the given path in the custom resource, the `status.selector` value in the `/scale` subresource will default to the empty string.
   */
  labelSelectorPath?: string;
  /**
   * specReplicasPath defines the JSON path inside of a custom resource that corresponds to Scale `spec.replicas`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.spec`. If there is no value under the given path in the custom resource, the `/scale` subresource will return an error on GET.
   */
  specReplicasPath: string;
  /**
   * statusReplicasPath defines the JSON path inside of a custom resource that corresponds to Scale `status.replicas`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.status`. If there is no value under the given path in the custom resource, the `status.replicas` value in the `/scale` subresource will default to 0.
   */
  statusReplicasPath: string;
}

/**
 * WebhookClientConfig contains the information to make a TLS connection with the webhook.
 */
export interface IWebhookClientConfig {
  /**
   * caBundle is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.
   */
  caBundle?: string;
  /**
   * service is a reference to the service for this webhook. Either service or url must be specified.
   *
   * If the webhook is running within the cluster, then you should use `service`.
   */
  service?: IServiceReference;
  /**
   * url gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.
   *
   * The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.
   *
   * Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.
   *
   * The scheme must be "https"; the URL must begin with "https://".
   *
   * A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.
   *
   * Attempting to use a user or basic auth e.g. "user:password@" is not allowed. Fragments ("#...") and query parameters ("?...") are not allowed, either.
   */
  url?: string;
}

/**
 * CustomResourceConversion describes how to convert different versions of a CR.
 */
export interface ICustomResourceConversion {
  /**
   * conversionReviewVersions is an ordered list of preferred `ConversionReview` versions the Webhook expects. The API server will use the first version in the list which it supports. If none of the versions specified in this list are supported by API server, conversion will fail for the custom resource. If a persisted Webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail. Defaults to `["v1beta1"]`.
   */
  conversionReviewVersions?: string[];
  /**
   * strategy specifies how custom resources are converted between versions. Allowed values are: - `None`: The converter only change the apiVersion and would not touch any other field in the custom resource. - `Webhook`: API Server will call to an external webhook to do the conversion. Additional information
   * is needed for this option. This requires spec.preserveUnknownFields to be false, and spec.conversion.webhookClientConfig to be set.
   */
  strategy: string;
  /**
   * webhookClientConfig is the instructions for how to call the webhook if strategy is `Webhook`. Required when `strategy` is set to `Webhook`.
   */
  webhookClientConfig?: IWebhookClientConfig;
}

/**
 * CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition
 */
export interface ICustomResourceDefinitionNames {
  /**
   * categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.
   */
  categories?: string[];
  /**
   * listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".
   */
  listKind?: string;
  /**
   * plural is the plural name of the resource to serve. The custom resources are served under `/apis/<group>/<version>/.../<plural>`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`). Must be all lowercase.
   */
  plural: string;
  /**
   * shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`. It must be all lowercase.
   */
  shortNames?: string[];
  /**
   * singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.
   */
  singular?: string;
}

/**
 * CustomResourceDefinitionVersion describes a version for CRD.
 */
export interface ICustomResourceDefinitionVersion {
  /**
   * additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. Top-level and per-version columns are mutually exclusive. Per-version columns must not all be set to identical values (top-level columns should be used instead). If no top-level or per-version columns are specified, a single column displaying the age of the custom resource is used.
   */
  additionalPrinterColumns?: ICustomResourceColumnDefinition[];
  /**
   * deprecated indicates this version of the custom resource API is deprecated. When set to true, API requests to this version receive a warning header in the server response. Defaults to false.
   */
  deprecated?: boolean;
  /**
   * deprecationWarning overrides the default warning returned to API clients. May only be set when `deprecated` is true. The default warning indicates this version is deprecated and recommends use of the newest served version of equal or greater stability, if one exists.
   */
  deprecationWarning?: string;
  /**
   * name is the version name, e.g. “v1”, “v2beta1”, etc. The custom resources are served under this version at `/apis/<group>/<version>/...` if `served` is true.
   */
  name: string;
  /**
   * schema describes the schema used for validation and pruning of this version of the custom resource. Top-level and per-version schemas are mutually exclusive. Per-version schemas must not all be set to identical values (top-level validation schema should be used instead).
   */
  schema?: ICustomResourceValidation;
  /**
   * served is a flag enabling/disabling this version from being served via REST APIs
   */
  served: boolean;
  /**
   * storage indicates this version should be used when persisting custom resources to storage. There must be exactly one version with storage=true.
   */
  storage: boolean;
  /**
   * subresources specify what subresources this version of the defined custom resource have. Top-level and per-version subresources are mutually exclusive. Per-version subresources must not all be set to identical values (top-level subresources should be used instead).
   */
  subresources?: ICustomResourceSubresources;
}

/** * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>. Deprecated in v1.16, planned for removal in v1.22. Use apiextensions.k8s.io/v1 CustomResourceDefinition instead.
 *
 * Child components:
 * - spec.additionalPrinterColumns: {@link CustomResourceColumnDefinition}
 * - spec.conversion: {@link CustomResourceConversion} (single element)
 * - spec.versions: {@link CustomResourceDefinitionVersion} */
export const CustomResourceDefinition = ({
  children,
  ...props
}: {
  /**
   * additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. If present, this field configures columns for all versions. Top-level and per-version columns are mutually exclusive. If no top-level or per-version columns are specified, a single column displaying the age of the custom resource is used.
   */
  additionalPrinterColumns?: ICustomResourceColumnDefinition[];
  /**
   * conversion defines conversion settings for the CRD.
   */
  conversion?: ICustomResourceConversion;
  /**
   * group is the API group of the defined custom resource. The custom resources are served under `/apis/<group>/...`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`).
   */
  group: string;
  /**
   * names specify the resource and kind names for the custom resource.
   */
  names: ICustomResourceDefinitionNames;
  /**
   * preserveUnknownFields indicates that object fields which are not specified in the OpenAPI schema should be preserved when persisting to storage. apiVersion, kind, metadata and known fields inside metadata are always preserved. If false, schemas must be defined for all versions. Defaults to true in v1beta for backwards compatibility. Deprecated: will be required to be false in v1. Preservation of unknown fields can be specified in the validation schema using the `x-kubernetes-preserve-unknown-fields: true` extension. See https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#pruning-versus-preserving-unknown-fields for details.
   */
  preserveUnknownFields?: boolean;
  /**
   * scope indicates whether the defined custom resource is cluster- or namespace-scoped. Allowed values are `Cluster` and `Namespaced`. Default is `Namespaced`.
   */
  scope: string;
  /**
   * subresources specify what subresources the defined custom resource has. If present, this field configures subresources for all versions. Top-level and per-version subresources are mutually exclusive.
   */
  subresources?: ICustomResourceSubresources;
  /**
   * validation describes the schema used for validation and pruning of the custom resource. If present, this validation schema is used to validate all versions. Top-level and per-version schemas are mutually exclusive.
   */
  validation?: ICustomResourceValidation;
  /**
   * version is the API version of the defined custom resource. The custom resources are served under `/apis/<group>/<version>/...`. Must match the name of the first item in the `versions` list if `version` and `versions` are both specified. Optional if `versions` is specified. Deprecated: use `versions` instead.
   */
  version?: string;
  /**
   * versions is the list of all API versions of the defined custom resource. Optional if `version` is specified. The name of the first item in the `versions` list must match the `version` field if `version` and `versions` are both specified. Version names are used to compute the order in which served versions are listed in API discovery. If the version string is "kube-like", it will sort above non "kube-like" version strings, which are ordered lexicographically. "Kube-like" versions start with a "v", then are followed by a number (the major version), then optionally the string "alpha" or "beta" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10.
   */
  versions?: ICustomResourceDefinitionVersion[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition"
      kind="CustomResourceDefinition"
      apiVersion="apiextensions.k8s.io/v1beta1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};

/** * CustomResourceColumnDefinition specifies a column for server side printing. */
export const CustomResourceColumnDefinition = (props: {
  /**
   * JSONPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.
   */
  JSONPath: string;
  /**
   * description is a human readable description of this column.
   */
  description?: string;
  /**
   * format is an optional OpenAPI type definition for this column. The 'name' format is applied to the primary identifier column to assist in clients identifying column is the resource name. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   */
  format?: string;
  /**
   * name is a human readable name for the column.
   */
  name: string;
  /**
   * priority is an integer defining the relative importance of this column compared to others. Lower numbers are considered higher priority. Columns that may be omitted in limited space scenarios should be given a priority greater than 0.
   */
  priority?: number | bigint;
  /**
   * type is an OpenAPI type definition for this column. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   */
  type: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition"
      contexts={[
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
          path: "spec.additionalPrinterColumns",
          isItem: true,
        },
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
          path: "additionalPrinterColumns",
          isItem: true,
        },
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion",
          path: "additionalPrinterColumns",
          isItem: true,
        },
      ]}
      value={childProps}
    />
  );
};

/** * CustomResourceConversion describes how to convert different versions of a CR.
 *
 * Child components:
 * - webhookClientConfig: {@link WebhookClientConfig} (single element) */
export const CustomResourceConversion = ({
  children,
  ...props
}: {
  /**
   * conversionReviewVersions is an ordered list of preferred `ConversionReview` versions the Webhook expects. The API server will use the first version in the list which it supports. If none of the versions specified in this list are supported by API server, conversion will fail for the custom resource. If a persisted Webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail. Defaults to `["v1beta1"]`.
   */
  conversionReviewVersions?: string[];
  /**
   * strategy specifies how custom resources are converted between versions. Allowed values are: - `None`: The converter only change the apiVersion and would not touch any other field in the custom resource. - `Webhook`: API Server will call to an external webhook to do the conversion. Additional information
   * is needed for this option. This requires spec.preserveUnknownFields to be false, and spec.conversion.webhookClientConfig to be set.
   */
  strategy: string;
  /**
   * webhookClientConfig is the instructions for how to call the webhook if strategy is `Webhook`. Required when `strategy` is set to `Webhook`.
   */
  webhookClientConfig?: IWebhookClientConfig;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion"
      contexts={[
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
          path: "spec.conversion",
          isItem: false,
        },
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
          path: "conversion",
          isItem: false,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * CustomResourceDefinitionVersion describes a version for CRD.
 *
 * Child components:
 * - additionalPrinterColumns: {@link CustomResourceColumnDefinition} */
export const CustomResourceDefinitionVersion = ({
  children,
  ...props
}: {
  /**
   * additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. Top-level and per-version columns are mutually exclusive. Per-version columns must not all be set to identical values (top-level columns should be used instead). If no top-level or per-version columns are specified, a single column displaying the age of the custom resource is used.
   */
  additionalPrinterColumns?: ICustomResourceColumnDefinition[];
  /**
   * deprecated indicates this version of the custom resource API is deprecated. When set to true, API requests to this version receive a warning header in the server response. Defaults to false.
   */
  deprecated?: boolean;
  /**
   * deprecationWarning overrides the default warning returned to API clients. May only be set when `deprecated` is true. The default warning indicates this version is deprecated and recommends use of the newest served version of equal or greater stability, if one exists.
   */
  deprecationWarning?: string;
  /**
   * name is the version name, e.g. “v1”, “v2beta1”, etc. The custom resources are served under this version at `/apis/<group>/<version>/...` if `served` is true.
   */
  name: string;
  /**
   * schema describes the schema used for validation and pruning of this version of the custom resource. Top-level and per-version schemas are mutually exclusive. Per-version schemas must not all be set to identical values (top-level validation schema should be used instead).
   */
  schema?: ICustomResourceValidation;
  /**
   * served is a flag enabling/disabling this version from being served via REST APIs
   */
  served: boolean;
  /**
   * storage indicates this version should be used when persisting custom resources to storage. There must be exactly one version with storage=true.
   */
  storage: boolean;
  /**
   * subresources specify what subresources this version of the defined custom resource have. Top-level and per-version subresources are mutually exclusive. Per-version subresources must not all be set to identical values (top-level subresources should be used instead).
   */
  subresources?: ICustomResourceSubresources;
  children?: React.ReactNode;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion"
      contexts={[
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
          path: "spec.versions",
          isItem: true,
        },
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
          path: "versions",
          isItem: true,
        },
      ]}
      value={childProps}
    >
      {children}
    </Item>
  );
};

/** * WebhookClientConfig contains the information to make a TLS connection with the webhook. */
export const WebhookClientConfig = (props: {
  /**
   * caBundle is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.
   */
  caBundle?: string;
  /**
   * service is a reference to the service for this webhook. Either service or url must be specified.
   *
   * If the webhook is running within the cluster, then you should use `service`.
   */
  service?: IServiceReference;
  /**
   * url gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.
   *
   * The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.
   *
   * Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.
   *
   * The scheme must be "https"; the URL must begin with "https://".
   *
   * A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.
   *
   * Attempting to use a user or basic auth e.g. "user:password@" is not allowed. Fragments ("#...") and query parameters ("?...") are not allowed, either.
   */
  url?: string;
}) => {
  const { childProps } = useKubeProps(props, {});
  return (
    <Item
      id="io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.WebhookClientConfig"
      contexts={[
        {
          id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
          path: "webhookClientConfig",
          isItem: false,
        },
      ]}
      value={childProps}
    />
  );
};
