export type GVK = {
  group: string;
  version: string;
  kind: string;
};

export type SpecProp = {
  name: string;
  type: { name: string; module?: string } | { id: string };
  isRequired: boolean;
  isArray: boolean;
  description?: string;
};

export type Spec = {
  id: string;
  hasMeta: boolean;
  hasKind: boolean;
  name: string;
  module: string;
  description?: string;
  properties: SpecProp[];
  gvk?: GVK;
  specKey?: string;
};

export type ContextRelation = {
  id: string;
  parentId: string;
  path: string;
  isArray: boolean;
  alias?: { name: string; default?: boolean };
};
