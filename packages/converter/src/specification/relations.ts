import { ContextRelation } from "specification/types";

export const relations = new Map<string, ContextRelation[]>([
  [
    "io.k8s.api.admissionregistration.v1beta1.MutatingWebhook",
    [
      {
        id: "io.k8s.api.admissionregistration.v1beta1.WebhookClientConfig",
        parentId: "io.k8s.api.admissionregistration.v1beta1.MutatingWebhook",
        path: "clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1beta1.RuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1beta1.MutatingWebhook",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1beta1.MutatingWebhook",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1beta1.MutatingWebhook",
        path: "objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1beta1.MutatingWebhookConfiguration",
    [
      {
        id: "io.k8s.api.admissionregistration.v1beta1.WebhookClientConfig",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.MutatingWebhookConfiguration",
        path: "webhooks.clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1beta1.RuleWithOperations",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.MutatingWebhookConfiguration",
        path: "webhooks.rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.MutatingWebhookConfiguration",
        path: "webhooks.namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.MutatingWebhookConfiguration",
        path: "webhooks.objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhook",
    [
      {
        id: "io.k8s.api.admissionregistration.v1beta1.WebhookClientConfig",
        parentId: "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhook",
        path: "clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1beta1.RuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhook",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhook",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhook",
        path: "objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhookConfiguration",
    [
      {
        id: "io.k8s.api.admissionregistration.v1beta1.WebhookClientConfig",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhookConfiguration",
        path: "webhooks.clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1beta1.RuleWithOperations",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhookConfiguration",
        path: "webhooks.rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhookConfiguration",
        path: "webhooks.namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1beta1.ValidatingWebhookConfiguration",
        path: "webhooks.objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.DaemonSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.DaemonSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.DaemonSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1.DaemonSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.DaemonSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.DaemonSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.DaemonSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1.DaemonSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.DaemonSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1.DaemonSetCondition",
        parentId: "io.k8s.api.apps.v1.DaemonSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.Deployment",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.Deployment",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1.Deployment",
        path: "spec.strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.Deployment",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.DeploymentSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.DeploymentSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1.DeploymentSpec",
        path: "strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.DeploymentSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.DeploymentStatus",
    [
      {
        id: "io.k8s.api.apps.v1.DeploymentCondition",
        parentId: "io.k8s.api.apps.v1.DeploymentStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.ReplicaSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.ReplicaSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.ReplicaSet",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.ReplicaSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.ReplicaSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.ReplicaSetSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.ReplicaSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1.ReplicaSetCondition",
        parentId: "io.k8s.api.apps.v1.ReplicaSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.StatefulSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.StatefulSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.StatefulSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1.StatefulSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1.StatefulSet",
        path: "spec.volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.StatefulSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1.StatefulSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1.StatefulSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1.StatefulSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1.StatefulSetSpec",
        path: "volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1.StatefulSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1.StatefulSetCondition",
        parentId: "io.k8s.api.apps.v1.StatefulSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.Deployment",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta1.Deployment",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta1.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1beta1.Deployment",
        path: "spec.strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta1.Deployment",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.DeploymentSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta1.DeploymentSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta1.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1beta1.DeploymentSpec",
        path: "strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta1.DeploymentSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.DeploymentStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta1.DeploymentCondition",
        parentId: "io.k8s.api.apps.v1beta1.DeploymentStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.StatefulSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta1.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSet",
        path: "spec.volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.StatefulSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta1.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSetSpec",
        path: "volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta1.StatefulSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta1.StatefulSetCondition",
        parentId: "io.k8s.api.apps.v1beta1.StatefulSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.DaemonSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.DaemonSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.DaemonSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta2.DaemonSetCondition",
        parentId: "io.k8s.api.apps.v1beta2.DaemonSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.Deployment",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.Deployment",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1beta2.Deployment",
        path: "spec.strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.Deployment",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.DeploymentSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.DeploymentSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.DeploymentStrategy",
        parentId: "io.k8s.api.apps.v1beta2.DeploymentSpec",
        path: "strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.DeploymentSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.DeploymentStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta2.DeploymentCondition",
        parentId: "io.k8s.api.apps.v1beta2.DeploymentStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.ReplicaSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.ReplicaSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.ReplicaSet",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.ReplicaSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.ReplicaSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.ReplicaSetSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.ReplicaSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta2.ReplicaSetCondition",
        parentId: "io.k8s.api.apps.v1beta2.ReplicaSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.StatefulSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSet",
        path: "spec.volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.StatefulSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.apps.v1beta2.StatefulSetUpdateStrategy",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaim",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSetSpec",
        path: "volumeClaimTemplates",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.apps.v1beta2.StatefulSetStatus",
    [
      {
        id: "io.k8s.api.apps.v1beta2.StatefulSetCondition",
        parentId: "io.k8s.api.apps.v1beta2.StatefulSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.auditregistration.v1alpha1.AuditSink",
    [
      {
        id: "io.k8s.api.auditregistration.v1alpha1.Webhook",
        parentId: "io.k8s.api.auditregistration.v1alpha1.AuditSink",
        path: "spec.webhook",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.auditregistration.v1alpha1.AuditSinkSpec",
    [
      {
        id: "io.k8s.api.auditregistration.v1alpha1.Webhook",
        parentId: "io.k8s.api.auditregistration.v1alpha1.AuditSinkSpec",
        path: "webhook",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.auditregistration.v1alpha1.Webhook",
    [
      {
        id: "io.k8s.api.auditregistration.v1alpha1.WebhookClientConfig",
        parentId: "io.k8s.api.auditregistration.v1alpha1.Webhook",
        path: "clientConfig",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.authorization.v1.SubjectRulesReviewStatus",
    [
      {
        id: "io.k8s.api.authorization.v1.NonResourceRule",
        parentId: "io.k8s.api.authorization.v1.SubjectRulesReviewStatus",
        path: "nonResourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.authorization.v1.ResourceRule",
        parentId: "io.k8s.api.authorization.v1.SubjectRulesReviewStatus",
        path: "resourceRules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.authorization.v1beta1.SubjectRulesReviewStatus",
    [
      {
        id: "io.k8s.api.authorization.v1beta1.NonResourceRule",
        parentId: "io.k8s.api.authorization.v1beta1.SubjectRulesReviewStatus",
        path: "nonResourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.authorization.v1beta1.ResourceRule",
        parentId: "io.k8s.api.authorization.v1beta1.SubjectRulesReviewStatus",
        path: "resourceRules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.ExternalMetricSource",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.ExternalMetricSource",
        path: "metricSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.ExternalMetricStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.ExternalMetricStatus",
        path: "metricSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscaler",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscaler",
        path: "spec.metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerSpec",
        path: "metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerCondition",
        parentId:
          "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta1.MetricStatus",
        parentId:
          "io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerStatus",
        path: "currentMetrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.MetricSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta1.ExternalMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta1.ObjectMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta1.PodsMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricSpec",
        path: "pods",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.MetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta1.ExternalMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricStatus",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta1.ObjectMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricStatus",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta1.PodsMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta1.MetricStatus",
        path: "pods",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.ObjectMetricSource",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.ObjectMetricSource",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.ObjectMetricStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.ObjectMetricStatus",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.PodsMetricSource",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.PodsMetricSource",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta1.PodsMetricStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta1.PodsMetricStatus",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.ExternalMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.ExternalMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.ExternalMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.ExternalMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
        parentId: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler",
        path: "spec.behavior",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler",
        path: "spec.metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
        parentId: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerSpec",
        path: "behavior",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerSpec",
        path: "metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerCondition",
        parentId:
          "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        parentId:
          "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerStatus",
        path: "currentMetrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.MetricSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.ContainerResourceMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        path: "containerResource",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ExternalMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ObjectMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.PodsMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        path: "pods",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ResourceMetricSource",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricSpec",
        path: "resource",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.MetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.ContainerResourceMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        path: "containerResource",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ExternalMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ObjectMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.PodsMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        path: "pods",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.ResourceMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2beta2.MetricStatus",
        path: "resource",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.ObjectMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.ObjectMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.ObjectMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.ObjectMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.PodsMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.PodsMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.PodsMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2beta2.PodsMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.Job",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicy",
        parentId: "io.k8s.api.batch.v1.Job",
        path: "spec.podFailurePolicy",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.batch.v1.Job",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.batch.v1.Job",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.JobSpec",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicy",
        parentId: "io.k8s.api.batch.v1.JobSpec",
        path: "podFailurePolicy",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.batch.v1.JobSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.batch.v1.JobSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.JobStatus",
    [
      {
        id: "io.k8s.api.batch.v1.JobCondition",
        parentId: "io.k8s.api.batch.v1.JobStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1beta1.CronJob",
    [
      {
        id: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v1beta1.CronJob",
        path: "spec.jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1beta1.CronJobSpec",
    [
      {
        id: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v1beta1.CronJobSpec",
        path: "jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1beta1.CronJobStatus",
    [
      {
        id: "io.k8s.api.core.v1.ObjectReference",
        parentId: "io.k8s.api.batch.v1beta1.CronJobStatus",
        path: "active",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1beta1.JobTemplateSpec",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicy",
        parentId: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
        path: "spec.podFailurePolicy",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.batch.v1beta1.JobTemplateSpec",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v2alpha1.CronJob",
    [
      {
        id: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v2alpha1.CronJob",
        path: "spec.jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v2alpha1.CronJobSpec",
    [
      {
        id: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v2alpha1.CronJobSpec",
        path: "jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v2alpha1.CronJobStatus",
    [
      {
        id: "io.k8s.api.core.v1.ObjectReference",
        parentId: "io.k8s.api.batch.v2alpha1.CronJobStatus",
        path: "active",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicy",
        parentId: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
        path: "spec.podFailurePolicy",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.batch.v2alpha1.JobTemplateSpec",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.certificates.v1beta1.CertificateSigningRequestStatus",
    [
      {
        id: "io.k8s.api.certificates.v1beta1.CertificateSigningRequestCondition",
        parentId:
          "io.k8s.api.certificates.v1beta1.CertificateSigningRequestStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Affinity",
    [
      {
        id: "io.k8s.api.core.v1.NodeAffinity",
        parentId: "io.k8s.api.core.v1.Affinity",
        path: "nodeAffinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodAffinity",
        parentId: "io.k8s.api.core.v1.Affinity",
        path: "podAffinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodAntiAffinity",
        parentId: "io.k8s.api.core.v1.Affinity",
        path: "podAntiAffinity",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ConfigMapProjection",
    [
      {
        id: "io.k8s.api.core.v1.KeyToPath",
        parentId: "io.k8s.api.core.v1.ConfigMapProjection",
        path: "items",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ConfigMapVolumeSource",
    [
      {
        id: "io.k8s.api.core.v1.KeyToPath",
        parentId: "io.k8s.api.core.v1.ConfigMapVolumeSource",
        path: "items",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Container",
    [
      {
        id: "io.k8s.api.core.v1.EnvVar",
        parentId: "io.k8s.api.core.v1.Container",
        path: "env",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EnvFromSource",
        parentId: "io.k8s.api.core.v1.Container",
        path: "envFrom",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Lifecycle",
        parentId: "io.k8s.api.core.v1.Container",
        path: "lifecycle",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ContainerPort",
        parentId: "io.k8s.api.core.v1.Container",
        path: "ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ContainerResizePolicy",
        parentId: "io.k8s.api.core.v1.Container",
        path: "resizePolicy",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.Container",
        path: "resources",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.SecurityContext",
        parentId: "io.k8s.api.core.v1.Container",
        path: "securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeDevice",
        parentId: "io.k8s.api.core.v1.Container",
        path: "volumeDevices",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.VolumeMount",
        parentId: "io.k8s.api.core.v1.Container",
        path: "volumeMounts",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.Container",
        path: "livenessProbe",
        isArray: false,
        alias: { name: "livenessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.Container",
        path: "readinessProbe",
        isArray: false,
        alias: { name: "readinessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.Container",
        path: "startupProbe",
        isArray: false,
        alias: { name: "startupProbe", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ContainerStatus",
    [
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.ContainerStatus",
        path: "resources",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ContainerState",
        parentId: "io.k8s.api.core.v1.ContainerStatus",
        path: "lastState",
        isArray: false,
        alias: { name: "lastState", default: false },
      },
      {
        id: "io.k8s.api.core.v1.ContainerState",
        parentId: "io.k8s.api.core.v1.ContainerStatus",
        path: "state",
        isArray: false,
        alias: { name: "state", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.DownwardAPIVolumeSource",
    [
      {
        id: "io.k8s.api.core.v1.DownwardAPIVolumeFile",
        parentId: "io.k8s.api.core.v1.DownwardAPIVolumeSource",
        path: "items",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.EndpointSubset",
    [
      {
        id: "io.k8s.api.core.v1.EndpointPort",
        parentId: "io.k8s.api.core.v1.EndpointSubset",
        path: "ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EndpointAddress",
        parentId: "io.k8s.api.core.v1.EndpointSubset",
        path: "addresses",
        isArray: true,
        alias: { name: "address", default: true },
      },
      {
        id: "io.k8s.api.core.v1.EndpointAddress",
        parentId: "io.k8s.api.core.v1.EndpointSubset",
        path: "notReadyAddresses",
        isArray: true,
        alias: { name: "notReady", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Endpoints",
    [
      {
        id: "io.k8s.api.core.v1.EndpointPort",
        parentId: "io.k8s.api.core.v1.Endpoints",
        path: "subsets.ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EndpointAddress",
        parentId: "io.k8s.api.core.v1.Endpoints",
        path: "subsets.addresses",
        isArray: true,
        alias: { name: "address", default: true },
      },
      {
        id: "io.k8s.api.core.v1.EndpointAddress",
        parentId: "io.k8s.api.core.v1.Endpoints",
        path: "subsets.notReadyAddresses",
        isArray: true,
        alias: { name: "notReady", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.EnvVar",
    [
      {
        id: "io.k8s.api.core.v1.EnvVarSource",
        parentId: "io.k8s.api.core.v1.EnvVar",
        path: "valueFrom",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.HTTPGetAction",
    [
      {
        id: "io.k8s.api.core.v1.HTTPHeader",
        parentId: "io.k8s.api.core.v1.HTTPGetAction",
        path: "httpHeaders",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Handler",
    [
      {
        id: "io.k8s.api.core.v1.HTTPGetAction",
        parentId: "io.k8s.api.core.v1.Handler",
        path: "httpGet",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Lifecycle",
    [
      {
        id: "io.k8s.api.core.v1.LifecycleHandler",
        parentId: "io.k8s.api.core.v1.Lifecycle",
        path: "postStart",
        isArray: false,
        alias: { name: "postStart", default: false },
      },
      {
        id: "io.k8s.api.core.v1.LifecycleHandler",
        parentId: "io.k8s.api.core.v1.Lifecycle",
        path: "preStop",
        isArray: false,
        alias: { name: "preStop", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.LimitRange",
    [
      {
        id: "io.k8s.api.core.v1.LimitRangeItem",
        parentId: "io.k8s.api.core.v1.LimitRange",
        path: "spec.limits",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.LoadBalancerIngress",
    [
      {
        id: "io.k8s.api.core.v1.PortStatus",
        parentId: "io.k8s.api.core.v1.LoadBalancerIngress",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.LoadBalancerStatus",
    [
      {
        id: "io.k8s.api.core.v1.PortStatus",
        parentId: "io.k8s.api.core.v1.LoadBalancerStatus",
        path: "ingress.ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NamespaceStatus",
    [
      {
        id: "io.k8s.api.core.v1.NamespaceCondition",
        parentId: "io.k8s.api.core.v1.NamespaceStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Node",
    [
      {
        id: "io.k8s.api.core.v1.Taint",
        parentId: "io.k8s.api.core.v1.Node",
        path: "spec.taints",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NodeAffinity",
    [
      {
        id: "io.k8s.api.core.v1.PreferredSchedulingTerm",
        parentId: "io.k8s.api.core.v1.NodeAffinity",
        path: "preferredDuringSchedulingIgnoredDuringExecution",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.core.v1.NodeAffinity",
        path: "requiredDuringSchedulingIgnoredDuringExecution",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NodeSelector",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.NodeSelector",
        path: "nodeSelectorTerms.matchExpressions",
        isArray: true,
        alias: { name: "matchExpression", default: false },
      },
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.NodeSelector",
        path: "nodeSelectorTerms.matchFields",
        isArray: true,
        alias: { name: "matchField", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NodeSelectorTerm",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.NodeSelectorTerm",
        path: "matchExpressions",
        isArray: true,
        alias: { name: "matchExpression", default: false },
      },
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.NodeSelectorTerm",
        path: "matchFields",
        isArray: true,
        alias: { name: "matchField", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NodeSpec",
    [
      {
        id: "io.k8s.api.core.v1.Taint",
        parentId: "io.k8s.api.core.v1.NodeSpec",
        path: "taints",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.NodeStatus",
    [
      {
        id: "io.k8s.api.core.v1.NodeAddress",
        parentId: "io.k8s.api.core.v1.NodeStatus",
        path: "addresses",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.NodeCondition",
        parentId: "io.k8s.api.core.v1.NodeStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.NodeConfigStatus",
        parentId: "io.k8s.api.core.v1.NodeStatus",
        path: "config",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ContainerImage",
        parentId: "io.k8s.api.core.v1.NodeStatus",
        path: "images",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.AttachedVolume",
        parentId: "io.k8s.api.core.v1.NodeStatus",
        path: "volumesAttached",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolume",
    [
      {
        id: "io.k8s.api.core.v1.CephFSPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.cephfs",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CinderPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.cinder",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CSIPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.csi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.FlexPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.flexVolume",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ISCSIPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.iscsi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeNodeAffinity",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.nodeAffinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.RBDPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.rbd",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ScaleIOPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.scaleIO",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.StorageOSPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolume",
        path: "spec.storageos",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolumeClaim",
    [
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaim",
        path: "spec.resources",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaim",
        path: "spec.selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolumeClaimSpec",
    [
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaimSpec",
        path: "resources",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaimSpec",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolumeClaimStatus",
    [
      {
        id: "io.k8s.api.core.v1.PersistentVolumeClaimCondition",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaimStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolumeSpec",
    [
      {
        id: "io.k8s.api.core.v1.CephFSPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "cephfs",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CinderPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "cinder",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CSIPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "csi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.FlexPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "flexVolume",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ISCSIPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "iscsi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeNodeAffinity",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "nodeAffinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.RBDPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "rbd",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ScaleIOPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "scaleIO",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.StorageOSPersistentVolumeSource",
        parentId: "io.k8s.api.core.v1.PersistentVolumeSpec",
        path: "storageos",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Pod",
    [
      {
        id: "io.k8s.api.core.v1.Affinity",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.affinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodDNSConfig",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.dnsConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.EphemeralContainer",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.ephemeralContainers",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.HostAlias",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.hostAliases",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.LocalObjectReference",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.imagePullSecrets",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodReadinessGate",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.readinessGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodResourceClaim",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.resourceClaims",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSchedulingGate",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.schedulingGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSecurityContext",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.tolerations",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.TopologySpreadConstraint",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.topologySpreadConstraints",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Volume",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.volumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.containers",
        isArray: true,
        alias: { name: "container", default: true },
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.Pod",
        path: "spec.initContainers",
        isArray: true,
        alias: { name: "init", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodAffinity",
    [
      {
        id: "io.k8s.api.core.v1.WeightedPodAffinityTerm",
        parentId: "io.k8s.api.core.v1.PodAffinity",
        path: "preferredDuringSchedulingIgnoredDuringExecution",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodAffinityTerm",
        parentId: "io.k8s.api.core.v1.PodAffinity",
        path: "requiredDuringSchedulingIgnoredDuringExecution",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodAffinityTerm",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.PodAffinityTerm",
        path: "labelSelector",
        isArray: false,
        alias: { name: "labelSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.PodAffinityTerm",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodAntiAffinity",
    [
      {
        id: "io.k8s.api.core.v1.WeightedPodAffinityTerm",
        parentId: "io.k8s.api.core.v1.PodAntiAffinity",
        path: "preferredDuringSchedulingIgnoredDuringExecution",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodAffinityTerm",
        parentId: "io.k8s.api.core.v1.PodAntiAffinity",
        path: "requiredDuringSchedulingIgnoredDuringExecution",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodDNSConfig",
    [
      {
        id: "io.k8s.api.core.v1.PodDNSConfigOption",
        parentId: "io.k8s.api.core.v1.PodDNSConfig",
        path: "options",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodSecurityContext",
    [
      {
        id: "io.k8s.api.core.v1.Sysctl",
        parentId: "io.k8s.api.core.v1.PodSecurityContext",
        path: "sysctls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodSpec",
    [
      {
        id: "io.k8s.api.core.v1.Affinity",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "affinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodDNSConfig",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "dnsConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.EphemeralContainer",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "ephemeralContainers",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.HostAlias",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "hostAliases",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.LocalObjectReference",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "imagePullSecrets",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodReadinessGate",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "readinessGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodResourceClaim",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "resourceClaims",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSchedulingGate",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "schedulingGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSecurityContext",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "tolerations",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.TopologySpreadConstraint",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "topologySpreadConstraints",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Volume",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "volumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "containers",
        isArray: true,
        alias: { name: "container", default: true },
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.PodSpec",
        path: "initContainers",
        isArray: true,
        alias: { name: "init", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodStatus",
    [
      {
        id: "io.k8s.api.core.v1.PodCondition",
        parentId: "io.k8s.api.core.v1.PodStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodIP",
        parentId: "io.k8s.api.core.v1.PodStatus",
        path: "podIPs",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ContainerStatus",
        parentId: "io.k8s.api.core.v1.PodStatus",
        path: "containerStatuses",
        isArray: true,
        alias: { name: "containerStatus", default: true },
      },
      {
        id: "io.k8s.api.core.v1.ContainerStatus",
        parentId: "io.k8s.api.core.v1.PodStatus",
        path: "ephemeralContainerStatuses",
        isArray: true,
        alias: { name: "ephemeral", default: false },
      },
      {
        id: "io.k8s.api.core.v1.ContainerStatus",
        parentId: "io.k8s.api.core.v1.PodStatus",
        path: "initContainerStatuses",
        isArray: true,
        alias: { name: "init", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodTemplate",
    [
      {
        id: "io.k8s.api.core.v1.PodSpec",
        parentId: "io.k8s.api.core.v1.PodTemplate",
        path: "template.spec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PodTemplateSpec",
    [
      {
        id: "io.k8s.api.core.v1.Affinity",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.affinity",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodDNSConfig",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.dnsConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.EphemeralContainer",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.ephemeralContainers",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.HostAlias",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.hostAliases",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.LocalObjectReference",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.imagePullSecrets",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodReadinessGate",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.readinessGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodResourceClaim",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.resourceClaims",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSchedulingGate",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.schedulingGates",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.PodSecurityContext",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.tolerations",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.TopologySpreadConstraint",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.topologySpreadConstraints",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Volume",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.volumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.containers",
        isArray: true,
        alias: { name: "container", default: true },
      },
      {
        id: "io.k8s.api.core.v1.Container",
        parentId: "io.k8s.api.core.v1.PodTemplateSpec",
        path: "spec.initContainers",
        isArray: true,
        alias: { name: "init", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PreferredSchedulingTerm",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelectorTerm",
        parentId: "io.k8s.api.core.v1.PreferredSchedulingTerm",
        path: "preference",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Probe",
    [
      {
        id: "io.k8s.api.core.v1.HTTPGetAction",
        parentId: "io.k8s.api.core.v1.Probe",
        path: "httpGet",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ProjectedVolumeSource",
    [
      {
        id: "io.k8s.api.core.v1.VolumeProjection",
        parentId: "io.k8s.api.core.v1.ProjectedVolumeSource",
        path: "sources",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ReplicationController",
    [
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.core.v1.ReplicationController",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ReplicationControllerSpec",
    [
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.core.v1.ReplicationControllerSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ReplicationControllerStatus",
    [
      {
        id: "io.k8s.api.core.v1.ReplicationControllerCondition",
        parentId: "io.k8s.api.core.v1.ReplicationControllerStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ResourceRequirements",
    [
      {
        id: "io.k8s.api.core.v1.ResourceClaim",
        parentId: "io.k8s.api.core.v1.ResourceRequirements",
        path: "claims",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.SecretProjection",
    [
      {
        id: "io.k8s.api.core.v1.KeyToPath",
        parentId: "io.k8s.api.core.v1.SecretProjection",
        path: "items",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.SecretVolumeSource",
    [
      {
        id: "io.k8s.api.core.v1.KeyToPath",
        parentId: "io.k8s.api.core.v1.SecretVolumeSource",
        path: "items",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Service",
    [
      {
        id: "io.k8s.api.core.v1.ServicePort",
        parentId: "io.k8s.api.core.v1.Service",
        path: "spec.ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ServiceAccount",
    [
      {
        id: "io.k8s.api.core.v1.LocalObjectReference",
        parentId: "io.k8s.api.core.v1.ServiceAccount",
        path: "imagePullSecrets",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ObjectReference",
        parentId: "io.k8s.api.core.v1.ServiceAccount",
        path: "secrets",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ServiceSpec",
    [
      {
        id: "io.k8s.api.core.v1.ServicePort",
        parentId: "io.k8s.api.core.v1.ServiceSpec",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.ServiceStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Condition",
        parentId: "io.k8s.api.core.v1.ServiceStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.LoadBalancerStatus",
        parentId: "io.k8s.api.core.v1.ServiceStatus",
        path: "loadBalancer",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.Volume",
    [
      {
        id: "io.k8s.api.core.v1.CephFSVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "cephfs",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CinderVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "cinder",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ConfigMapVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "configMap",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.CSIVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "csi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.DownwardAPIVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "downwardAPI",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.FlexVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "flexVolume",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ISCSIVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "iscsi",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ProjectedVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "projected",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.RBDVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "rbd",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ScaleIOVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "scaleIO",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.SecretVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "secret",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.StorageOSVolumeSource",
        parentId: "io.k8s.api.core.v1.Volume",
        path: "storageos",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.VolumeNodeAffinity",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.VolumeNodeAffinity",
        path: "required.matchExpressions",
        isArray: true,
        alias: { name: "matchExpression", default: false },
      },
      {
        id: "io.k8s.api.core.v1.NodeSelectorRequirement",
        parentId: "io.k8s.api.core.v1.VolumeNodeAffinity",
        path: "required.matchFields",
        isArray: true,
        alias: { name: "matchField", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.VolumeProjection",
    [
      {
        id: "io.k8s.api.core.v1.ConfigMapProjection",
        parentId: "io.k8s.api.core.v1.VolumeProjection",
        path: "configMap",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.DownwardAPIProjection",
        parentId: "io.k8s.api.core.v1.VolumeProjection",
        path: "downwardAPI",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.SecretProjection",
        parentId: "io.k8s.api.core.v1.VolumeProjection",
        path: "secret",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.WeightedPodAffinityTerm",
    [
      {
        id: "io.k8s.api.core.v1.PodAffinityTerm",
        parentId: "io.k8s.api.core.v1.WeightedPodAffinityTerm",
        path: "podAffinityTerm",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.DaemonSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSet",
        path: "spec.template",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSet",
        path: "spec.updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
        path: "template",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.DaemonSetUpdateStrategy",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSetSpec",
        path: "updateStrategy",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.DaemonSetStatus",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.DaemonSetCondition",
        parentId: "io.k8s.api.extensions.v1beta1.DaemonSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.Deployment",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.Deployment",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.DeploymentStrategy",
        parentId: "io.k8s.api.extensions.v1beta1.Deployment",
        path: "spec.strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.Deployment",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.DeploymentSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.DeploymentSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.DeploymentStrategy",
        parentId: "io.k8s.api.extensions.v1beta1.DeploymentSpec",
        path: "strategy",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.DeploymentSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.DeploymentStatus",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.DeploymentCondition",
        parentId: "io.k8s.api.extensions.v1beta1.DeploymentStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IDRange",
        parentId: "io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.HTTPIngressPath",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IngressBackend",
        parentId: "io.k8s.api.extensions.v1beta1.HTTPIngressPath",
        path: "backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.HTTPIngressRuleValue",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IngressBackend",
        parentId: "io.k8s.api.extensions.v1beta1.HTTPIngressRuleValue",
        path: "paths.backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.Ingress",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IngressBackend",
        parentId: "io.k8s.api.extensions.v1beta1.Ingress",
        path: "spec.backend",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.IngressRule",
        parentId: "io.k8s.api.extensions.v1beta1.Ingress",
        path: "spec.rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.IngressTLS",
        parentId: "io.k8s.api.extensions.v1beta1.Ingress",
        path: "spec.tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.IngressRule",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.HTTPIngressRuleValue",
        parentId: "io.k8s.api.extensions.v1beta1.IngressRule",
        path: "http",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.IngressSpec",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IngressBackend",
        parentId: "io.k8s.api.extensions.v1beta1.IngressSpec",
        path: "backend",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.IngressRule",
        parentId: "io.k8s.api.extensions.v1beta1.IngressSpec",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.IngressTLS",
        parentId: "io.k8s.api.extensions.v1beta1.IngressSpec",
        path: "tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.IngressStatus",
    [
      {
        id: "io.k8s.api.core.v1.PortStatus",
        parentId: "io.k8s.api.extensions.v1beta1.IngressStatus",
        path: "loadBalancer.ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.NetworkPolicy",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicy",
        path: "spec.egress",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicy",
        path: "spec.ingress",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicy",
        path: "spec.podSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyPort",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
        path: "ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyPeer",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
        path: "to",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyPeer",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
        path: "from",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyPort",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.NetworkPolicyPeer",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyPeer",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicyPeer",
        path: "podSelector",
        isArray: false,
        alias: { name: "podSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyEgressRule",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
        path: "egress",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.NetworkPolicyIngressRule",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
        path: "ingress",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.NetworkPolicySpec",
        path: "podSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedCSIDriver",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.allowedCSIDrivers",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedFlexVolume",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.allowedFlexVolumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedHostPath",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.allowedHostPaths",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.fsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.HostPortRange",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.hostPorts",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.runAsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.runAsUser",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.SELinuxStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.seLinux",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicy",
        path: "spec.supplementalGroups",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedCSIDriver",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "allowedCSIDrivers",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedFlexVolume",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "allowedFlexVolumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.AllowedHostPath",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "allowedHostPaths",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.FSGroupStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "fsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.HostPortRange",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "hostPorts",
        isArray: true,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "runAsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "runAsUser",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.SELinuxStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "seLinux",
        isArray: false,
      },
      {
        id: "io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions",
        parentId: "io.k8s.api.extensions.v1beta1.PodSecurityPolicySpec",
        path: "supplementalGroups",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.ReplicaSet",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.ReplicaSet",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.ReplicaSet",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.ReplicaSetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.extensions.v1beta1.ReplicaSetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.extensions.v1beta1.ReplicaSetSpec",
        path: "template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.ReplicaSetStatus",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.ReplicaSetCondition",
        parentId: "io.k8s.api.extensions.v1beta1.ReplicaSetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IDRange",
        parentId: "io.k8s.api.extensions.v1beta1.RunAsGroupStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IDRange",
        parentId: "io.k8s.api.extensions.v1beta1.RunAsUserStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions",
    [
      {
        id: "io.k8s.api.extensions.v1beta1.IDRange",
        parentId:
          "io.k8s.api.extensions.v1beta1.SupplementalGroupsStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.NetworkPolicy",
    [
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
        parentId: "io.k8s.api.networking.v1.NetworkPolicy",
        path: "spec.egress",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
        parentId: "io.k8s.api.networking.v1.NetworkPolicy",
        path: "spec.ingress",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.networking.v1.NetworkPolicy",
        path: "spec.podSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
    [
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyPort",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
        path: "ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyPeer",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
        path: "to",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
    [
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyPeer",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
        path: "from",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyPort",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.NetworkPolicyPeer",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyPeer",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.networking.v1.NetworkPolicyPeer",
        path: "podSelector",
        isArray: false,
        alias: { name: "podSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.NetworkPolicySpec",
    [
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyEgressRule",
        parentId: "io.k8s.api.networking.v1.NetworkPolicySpec",
        path: "egress",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.NetworkPolicyIngressRule",
        parentId: "io.k8s.api.networking.v1.NetworkPolicySpec",
        path: "ingress",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.networking.v1.NetworkPolicySpec",
        path: "podSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.HTTPIngressPath",
    [
      {
        id: "io.k8s.api.networking.v1beta1.IngressBackend",
        parentId: "io.k8s.api.networking.v1beta1.HTTPIngressPath",
        path: "backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.HTTPIngressRuleValue",
    [
      {
        id: "io.k8s.api.networking.v1beta1.IngressBackend",
        parentId: "io.k8s.api.networking.v1beta1.HTTPIngressRuleValue",
        path: "paths.backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.Ingress",
    [
      {
        id: "io.k8s.api.networking.v1beta1.IngressBackend",
        parentId: "io.k8s.api.networking.v1beta1.Ingress",
        path: "spec.backend",
        isArray: false,
      },
      {
        id: "io.k8s.api.networking.v1beta1.IngressRule",
        parentId: "io.k8s.api.networking.v1beta1.Ingress",
        path: "spec.rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1beta1.IngressTLS",
        parentId: "io.k8s.api.networking.v1beta1.Ingress",
        path: "spec.tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.IngressRule",
    [
      {
        id: "io.k8s.api.networking.v1beta1.HTTPIngressRuleValue",
        parentId: "io.k8s.api.networking.v1beta1.IngressRule",
        path: "http",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.IngressSpec",
    [
      {
        id: "io.k8s.api.networking.v1beta1.IngressBackend",
        parentId: "io.k8s.api.networking.v1beta1.IngressSpec",
        path: "backend",
        isArray: false,
      },
      {
        id: "io.k8s.api.networking.v1beta1.IngressRule",
        parentId: "io.k8s.api.networking.v1beta1.IngressSpec",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1beta1.IngressTLS",
        parentId: "io.k8s.api.networking.v1beta1.IngressSpec",
        path: "tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1beta1.IngressStatus",
    [
      {
        id: "io.k8s.api.core.v1.PortStatus",
        parentId: "io.k8s.api.networking.v1beta1.IngressStatus",
        path: "loadBalancer.ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1alpha1.RuntimeClass",
    [
      {
        id: "io.k8s.api.node.v1alpha1.Scheduling",
        parentId: "io.k8s.api.node.v1alpha1.RuntimeClass",
        path: "spec.scheduling",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1alpha1.RuntimeClassSpec",
    [
      {
        id: "io.k8s.api.node.v1alpha1.Scheduling",
        parentId: "io.k8s.api.node.v1alpha1.RuntimeClassSpec",
        path: "scheduling",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1beta1.RuntimeClass",
    [
      {
        id: "io.k8s.api.node.v1beta1.Scheduling",
        parentId: "io.k8s.api.node.v1beta1.RuntimeClass",
        path: "scheduling",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.FSGroupStrategyOptions",
    [
      {
        id: "io.k8s.api.policy.v1beta1.IDRange",
        parentId: "io.k8s.api.policy.v1beta1.FSGroupStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.PodDisruptionBudget",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.policy.v1beta1.PodDisruptionBudget",
        path: "spec.selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.PodDisruptionBudgetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.policy.v1beta1.PodDisruptionBudgetSpec",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.PodDisruptionBudgetStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Condition",
        parentId: "io.k8s.api.policy.v1beta1.PodDisruptionBudgetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
    [
      {
        id: "io.k8s.api.policy.v1beta1.AllowedCSIDriver",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.allowedCSIDrivers",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.AllowedFlexVolume",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.allowedFlexVolumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.AllowedHostPath",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.allowedHostPaths",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.FSGroupStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.fsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.HostPortRange",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.hostPorts",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.runAsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.runAsUser",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.SELinuxStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.seLinux",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicy",
        path: "spec.supplementalGroups",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
    [
      {
        id: "io.k8s.api.policy.v1beta1.AllowedCSIDriver",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "allowedCSIDrivers",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.AllowedFlexVolume",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "allowedFlexVolumes",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.AllowedHostPath",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "allowedHostPaths",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.FSGroupStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "fsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.HostPortRange",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "hostPorts",
        isArray: true,
      },
      {
        id: "io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "runAsGroup",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "runAsUser",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.SELinuxStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "seLinux",
        isArray: false,
      },
      {
        id: "io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions",
        parentId: "io.k8s.api.policy.v1beta1.PodSecurityPolicySpec",
        path: "supplementalGroups",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions",
    [
      {
        id: "io.k8s.api.policy.v1beta1.IDRange",
        parentId: "io.k8s.api.policy.v1beta1.RunAsGroupStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions",
    [
      {
        id: "io.k8s.api.policy.v1beta1.IDRange",
        parentId: "io.k8s.api.policy.v1beta1.RunAsUserStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions",
    [
      {
        id: "io.k8s.api.policy.v1beta1.IDRange",
        parentId: "io.k8s.api.policy.v1beta1.SupplementalGroupsStrategyOptions",
        path: "ranges",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1.AggregationRule",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelectorRequirement",
        parentId: "io.k8s.api.rbac.v1.AggregationRule",
        path: "clusterRoleSelectors.matchExpressions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1.ClusterRole",
    [
      {
        id: "io.k8s.api.rbac.v1.AggregationRule",
        parentId: "io.k8s.api.rbac.v1.ClusterRole",
        path: "aggregationRule",
        isArray: false,
      },
      {
        id: "io.k8s.api.rbac.v1.PolicyRule",
        parentId: "io.k8s.api.rbac.v1.ClusterRole",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1.ClusterRoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1.Subject",
        parentId: "io.k8s.api.rbac.v1.ClusterRoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1.RoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1.Subject",
        parentId: "io.k8s.api.rbac.v1.RoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1alpha1.AggregationRule",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelectorRequirement",
        parentId: "io.k8s.api.rbac.v1alpha1.AggregationRule",
        path: "clusterRoleSelectors.matchExpressions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1alpha1.ClusterRole",
    [
      {
        id: "io.k8s.api.rbac.v1alpha1.AggregationRule",
        parentId: "io.k8s.api.rbac.v1alpha1.ClusterRole",
        path: "aggregationRule",
        isArray: false,
      },
      {
        id: "io.k8s.api.rbac.v1alpha1.PolicyRule",
        parentId: "io.k8s.api.rbac.v1alpha1.ClusterRole",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1alpha1.ClusterRoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1alpha1.Subject",
        parentId: "io.k8s.api.rbac.v1alpha1.ClusterRoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1alpha1.RoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1alpha1.Subject",
        parentId: "io.k8s.api.rbac.v1alpha1.RoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1beta1.AggregationRule",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelectorRequirement",
        parentId: "io.k8s.api.rbac.v1beta1.AggregationRule",
        path: "clusterRoleSelectors.matchExpressions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1beta1.ClusterRole",
    [
      {
        id: "io.k8s.api.rbac.v1beta1.AggregationRule",
        parentId: "io.k8s.api.rbac.v1beta1.ClusterRole",
        path: "aggregationRule",
        isArray: false,
      },
      {
        id: "io.k8s.api.rbac.v1beta1.PolicyRule",
        parentId: "io.k8s.api.rbac.v1beta1.ClusterRole",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1beta1.ClusterRoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1beta1.Subject",
        parentId: "io.k8s.api.rbac.v1beta1.ClusterRoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.rbac.v1beta1.RoleBinding",
    [
      {
        id: "io.k8s.api.rbac.v1beta1.Subject",
        parentId: "io.k8s.api.rbac.v1beta1.RoleBinding",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.settings.v1alpha1.PodPreset",
    [
      {
        id: "io.k8s.api.core.v1.EnvVar",
        parentId: "io.k8s.api.settings.v1alpha1.PodPreset",
        path: "spec.env",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EnvFromSource",
        parentId: "io.k8s.api.settings.v1alpha1.PodPreset",
        path: "spec.envFrom",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.settings.v1alpha1.PodPreset",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeMount",
        parentId: "io.k8s.api.settings.v1alpha1.PodPreset",
        path: "spec.volumeMounts",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Volume",
        parentId: "io.k8s.api.settings.v1alpha1.PodPreset",
        path: "spec.volumes",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.settings.v1alpha1.PodPresetSpec",
    [
      {
        id: "io.k8s.api.core.v1.EnvVar",
        parentId: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
        path: "env",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EnvFromSource",
        parentId: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
        path: "envFrom",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
        path: "selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeMount",
        parentId: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
        path: "volumeMounts",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Volume",
        parentId: "io.k8s.api.settings.v1alpha1.PodPresetSpec",
        path: "volumes",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.StorageClass",
    [
      {
        id: "io.k8s.api.core.v1.TopologySelectorTerm",
        parentId: "io.k8s.api.storage.v1.StorageClass",
        path: "allowedTopologies",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.VolumeAttachment",
    [
      {
        id: "io.k8s.api.storage.v1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1.VolumeAttachment",
        path: "spec.source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.VolumeAttachmentSource",
    [
      {
        id: "io.k8s.api.core.v1.PersistentVolumeSpec",
        parentId: "io.k8s.api.storage.v1.VolumeAttachmentSource",
        path: "inlineVolumeSpec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.VolumeAttachmentSpec",
    [
      {
        id: "io.k8s.api.storage.v1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1.VolumeAttachmentSpec",
        path: "source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1alpha1.VolumeAttachment",
    [
      {
        id: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1alpha1.VolumeAttachment",
        path: "spec.source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1alpha1.VolumeAttachmentSource",
    [
      {
        id: "io.k8s.api.core.v1.PersistentVolumeSpec",
        parentId: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSource",
        path: "inlineVolumeSpec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1alpha1.VolumeAttachmentSpec",
    [
      {
        id: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1alpha1.VolumeAttachmentSpec",
        path: "source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.CSIDriver",
    [
      {
        id: "io.k8s.api.storage.v1beta1.TokenRequest",
        parentId: "io.k8s.api.storage.v1beta1.CSIDriver",
        path: "spec.tokenRequests",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.CSIDriverSpec",
    [
      {
        id: "io.k8s.api.storage.v1beta1.TokenRequest",
        parentId: "io.k8s.api.storage.v1beta1.CSIDriverSpec",
        path: "tokenRequests",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.CSINode",
    [
      {
        id: "io.k8s.api.storage.v1beta1.CSINodeDriver",
        parentId: "io.k8s.api.storage.v1beta1.CSINode",
        path: "spec.drivers",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.StorageClass",
    [
      {
        id: "io.k8s.api.core.v1.TopologySelectorTerm",
        parentId: "io.k8s.api.storage.v1beta1.StorageClass",
        path: "allowedTopologies",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.VolumeAttachment",
    [
      {
        id: "io.k8s.api.storage.v1beta1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1beta1.VolumeAttachment",
        path: "spec.source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.VolumeAttachmentSource",
    [
      {
        id: "io.k8s.api.core.v1.PersistentVolumeSpec",
        parentId: "io.k8s.api.storage.v1beta1.VolumeAttachmentSource",
        path: "inlineVolumeSpec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.VolumeAttachmentSpec",
    [
      {
        id: "io.k8s.api.storage.v1beta1.VolumeAttachmentSource",
        parentId: "io.k8s.api.storage.v1beta1.VolumeAttachmentSpec",
        path: "source",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.WebhookClientConfig",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
        path: "webhookClientConfig",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
        path: "spec.additionalPrinterColumns",
        isArray: true,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
        path: "spec.conversion",
        isArray: false,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition",
        path: "spec.versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
        path: "additionalPrinterColumns",
        isArray: true,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
        path: "conversion",
        isArray: false,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec",
        path: "versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionStatus",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionCondition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionVersion",
        path: "additionalPrinterColumns",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.JSONSchemaProps",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.JSON",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.JSONSchemaProps",
        path: "enum",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroup",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.ServerAddressByClientCIDR",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroup",
        path: "serverAddressByClientCIDRs",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.GroupVersionForDiscovery",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroup",
        path: "versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroupList",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.ServerAddressByClientCIDR",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroupList",
        path: "groups.serverAddressByClientCIDRs",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.GroupVersionForDiscovery",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIGroupList",
        path: "groups.versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.APIResourceList",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.APIResource",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIResourceList",
        path: "resources",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.APIVersions",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.ServerAddressByClientCIDR",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.APIVersions",
        path: "serverAddressByClientCIDRs",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.Initializers",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Initializer",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.Initializers",
        path: "pending",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Status",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.Initializers",
        path: "result",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelectorRequirement",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        path: "matchExpressions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.OwnerReference",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
        path: "ownerReferences",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apimachinery.pkg.apis.meta.v1.StatusDetails",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.StatusCause",
        parentId: "io.k8s.apimachinery.pkg.apis.meta.v1.StatusDetails",
        path: "causes",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1.MutatingWebhook",
    [
      {
        id: "io.k8s.api.admissionregistration.v1.WebhookClientConfig",
        parentId: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
        path: "clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.MatchCondition",
        parentId: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
        path: "matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.RuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1.MutatingWebhook",
        path: "objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
    [
      {
        id: "io.k8s.api.admissionregistration.v1.WebhookClientConfig",
        parentId:
          "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
        path: "webhooks.clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.MatchCondition",
        parentId:
          "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
        path: "webhooks.matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.RuleWithOperations",
        parentId:
          "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
        path: "webhooks.rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
        path: "webhooks.namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration",
        path: "webhooks.objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
    [
      {
        id: "io.k8s.api.admissionregistration.v1.WebhookClientConfig",
        parentId: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
        path: "clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.MatchCondition",
        parentId: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
        path: "matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.RuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1.ValidatingWebhook",
        path: "objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
    [
      {
        id: "io.k8s.api.admissionregistration.v1.WebhookClientConfig",
        parentId:
          "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
        path: "webhooks.clientConfig",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.MatchCondition",
        parentId:
          "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
        path: "webhooks.matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1.RuleWithOperations",
        parentId:
          "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
        path: "webhooks.rules",
        isArray: true,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
        path: "webhooks.namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId:
          "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration",
        path: "webhooks.objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionStatus",
    [
      {
        id: "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionCondition",
        parentId: "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.apiserverinternal.v1alpha1.ServerStorageVersion",
        parentId: "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionStatus",
        path: "storageVersions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.HPAScalingRules",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.HPAScalingPolicy",
        parentId: "io.k8s.api.autoscaling.v2beta2.HPAScalingRules",
        path: "policies",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
    [
      {
        id: "io.k8s.api.autoscaling.v2beta2.HPAScalingRules",
        parentId:
          "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
        path: "scaleDown",
        isArray: false,
        alias: { name: "scaleDown", default: false },
      },
      {
        id: "io.k8s.api.autoscaling.v2beta2.HPAScalingRules",
        parentId:
          "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerBehavior",
        path: "scaleUp",
        isArray: false,
        alias: { name: "scaleUp", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.CronJob",
    [
      {
        id: "io.k8s.api.batch.v1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v1.CronJob",
        path: "spec.jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.CronJobSpec",
    [
      {
        id: "io.k8s.api.batch.v1.JobTemplateSpec",
        parentId: "io.k8s.api.batch.v1.CronJobSpec",
        path: "jobTemplate",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.CronJobStatus",
    [
      {
        id: "io.k8s.api.core.v1.ObjectReference",
        parentId: "io.k8s.api.batch.v1.CronJobStatus",
        path: "active",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.JobTemplateSpec",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicy",
        parentId: "io.k8s.api.batch.v1.JobTemplateSpec",
        path: "spec.podFailurePolicy",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.batch.v1.JobTemplateSpec",
        path: "spec.selector",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.PodTemplateSpec",
        parentId: "io.k8s.api.batch.v1.JobTemplateSpec",
        path: "spec.template",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.certificates.v1.CertificateSigningRequestStatus",
    [
      {
        id: "io.k8s.api.certificates.v1.CertificateSigningRequestCondition",
        parentId: "io.k8s.api.certificates.v1.CertificateSigningRequestStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.EphemeralContainer",
    [
      {
        id: "io.k8s.api.core.v1.EnvVar",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "env",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EnvFromSource",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "envFrom",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Lifecycle",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "lifecycle",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ContainerPort",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ContainerResizePolicy",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "resizePolicy",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "resources",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.SecurityContext",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeDevice",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "volumeDevices",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.VolumeMount",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "volumeMounts",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "livenessProbe",
        isArray: false,
        alias: { name: "livenessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "readinessProbe",
        isArray: false,
        alias: { name: "readinessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainer",
        path: "startupProbe",
        isArray: false,
        alias: { name: "startupProbe", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.EphemeralContainers",
    [
      {
        id: "io.k8s.api.core.v1.EnvVar",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.env",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.EnvFromSource",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.envFrom",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Lifecycle",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.lifecycle",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.ContainerPort",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.ports",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ContainerResizePolicy",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.resizePolicy",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.resources",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.SecurityContext",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.securityContext",
        isArray: false,
      },
      {
        id: "io.k8s.api.core.v1.VolumeDevice",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.volumeDevices",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.VolumeMount",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.volumeMounts",
        isArray: true,
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.livenessProbe",
        isArray: false,
        alias: { name: "livenessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.readinessProbe",
        isArray: false,
        alias: { name: "readinessProbe", default: false },
      },
      {
        id: "io.k8s.api.core.v1.Probe",
        parentId: "io.k8s.api.core.v1.EphemeralContainers",
        path: "ephemeralContainers.startupProbe",
        isArray: false,
        alias: { name: "startupProbe", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.PersistentVolumeClaimTemplate",
    [
      {
        id: "io.k8s.api.core.v1.ResourceRequirements",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaimTemplate",
        path: "spec.resources",
        isArray: false,
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.PersistentVolumeClaimTemplate",
        path: "spec.selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.TopologySpreadConstraint",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.core.v1.TopologySpreadConstraint",
        path: "labelSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.discovery.v1.EndpointSlice",
    [
      {
        id: "io.k8s.api.discovery.v1.Endpoint",
        parentId: "io.k8s.api.discovery.v1.EndpointSlice",
        path: "endpoints",
        isArray: true,
      },
      {
        id: "io.k8s.api.discovery.v1.EndpointPort",
        parentId: "io.k8s.api.discovery.v1.EndpointSlice",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.discovery.v1beta1.EndpointSlice",
    [
      {
        id: "io.k8s.api.discovery.v1beta1.Endpoint",
        parentId: "io.k8s.api.discovery.v1beta1.EndpointSlice",
        path: "endpoints",
        isArray: true,
      },
      {
        id: "io.k8s.api.discovery.v1beta1.EndpointPort",
        parentId: "io.k8s.api.discovery.v1beta1.EndpointSlice",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.FlowSchema",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta1.FlowSchema",
        path: "spec.rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.FlowSchemaSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta1.FlowSchemaSpec",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.LimitResponse",
        parentId:
          "io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration",
        path: "limitResponse",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.NonResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
        path: "nonResourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta1.ResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
        path: "resourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta1.Subject",
        parentId: "io.k8s.api.flowcontrol.v1beta1.PolicyRulesWithSubjects",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration",
        parentId: "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration",
        path: "spec.limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta1.LimitedPriorityLevelConfiguration",
        parentId:
          "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationSpec",
        path: "limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.HTTPIngressPath",
    [
      {
        id: "io.k8s.api.networking.v1.IngressBackend",
        parentId: "io.k8s.api.networking.v1.HTTPIngressPath",
        path: "backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.HTTPIngressRuleValue",
    [
      {
        id: "io.k8s.api.networking.v1.IngressBackend",
        parentId: "io.k8s.api.networking.v1.HTTPIngressRuleValue",
        path: "paths.backend",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.Ingress",
    [
      {
        id: "io.k8s.api.networking.v1.IngressBackend",
        parentId: "io.k8s.api.networking.v1.Ingress",
        path: "spec.defaultBackend",
        isArray: false,
      },
      {
        id: "io.k8s.api.networking.v1.IngressRule",
        parentId: "io.k8s.api.networking.v1.Ingress",
        path: "spec.rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.IngressTLS",
        parentId: "io.k8s.api.networking.v1.Ingress",
        path: "spec.tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressBackend",
    [
      {
        id: "io.k8s.api.networking.v1.IngressServiceBackend",
        parentId: "io.k8s.api.networking.v1.IngressBackend",
        path: "service",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressRule",
    [
      {
        id: "io.k8s.api.networking.v1.HTTPIngressRuleValue",
        parentId: "io.k8s.api.networking.v1.IngressRule",
        path: "http",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressSpec",
    [
      {
        id: "io.k8s.api.networking.v1.IngressBackend",
        parentId: "io.k8s.api.networking.v1.IngressSpec",
        path: "defaultBackend",
        isArray: false,
      },
      {
        id: "io.k8s.api.networking.v1.IngressRule",
        parentId: "io.k8s.api.networking.v1.IngressSpec",
        path: "rules",
        isArray: true,
      },
      {
        id: "io.k8s.api.networking.v1.IngressTLS",
        parentId: "io.k8s.api.networking.v1.IngressSpec",
        path: "tls",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressStatus",
    [
      {
        id: "io.k8s.api.networking.v1.IngressLoadBalancerIngress",
        parentId: "io.k8s.api.networking.v1.IngressStatus",
        path: "loadBalancer.ingress",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1.RuntimeClass",
    [
      {
        id: "io.k8s.api.node.v1.Scheduling",
        parentId: "io.k8s.api.node.v1.RuntimeClass",
        path: "scheduling",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1.Scheduling",
    [
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.node.v1.Scheduling",
        path: "tolerations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1alpha1.Scheduling",
    [
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.node.v1alpha1.Scheduling",
        path: "tolerations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.node.v1beta1.Scheduling",
    [
      {
        id: "io.k8s.api.core.v1.Toleration",
        parentId: "io.k8s.api.node.v1beta1.Scheduling",
        path: "tolerations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1.PodDisruptionBudget",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.policy.v1.PodDisruptionBudget",
        path: "spec.selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1.PodDisruptionBudgetSpec",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.policy.v1.PodDisruptionBudgetSpec",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.policy.v1.PodDisruptionBudgetStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Condition",
        parentId: "io.k8s.api.policy.v1.PodDisruptionBudgetStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.CSIDriver",
    [
      {
        id: "io.k8s.api.storage.v1.TokenRequest",
        parentId: "io.k8s.api.storage.v1.CSIDriver",
        path: "spec.tokenRequests",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.CSIDriverSpec",
    [
      {
        id: "io.k8s.api.storage.v1.TokenRequest",
        parentId: "io.k8s.api.storage.v1.CSIDriverSpec",
        path: "tokenRequests",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.CSINode",
    [
      {
        id: "io.k8s.api.storage.v1.CSINodeDriver",
        parentId: "io.k8s.api.storage.v1.CSINode",
        path: "spec.drivers",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1alpha1.CSIStorageCapacity",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.storage.v1alpha1.CSIStorageCapacity",
        path: "nodeTopology",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1beta1.CSIStorageCapacity",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.storage.v1beta1.CSIStorageCapacity",
        path: "nodeTopology",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceConversion",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.WebhookConversion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceConversion",
        path: "webhook",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceConversion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition",
        path: "spec.conversion",
        isArray: false,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionVersion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition",
        path: "spec.versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionSpec",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceConversion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionSpec",
        path: "conversion",
        isArray: false,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionVersion",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionSpec",
        path: "versions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionStatus",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionCondition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionVersion",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceColumnDefinition",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionVersion",
        path: "additionalPrinterColumns",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSON",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps",
        path: "enum",
        isArray: true,
      },
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.ValidationRule",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps",
        path: "x-kubernetes-validations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.WebhookConversion",
    [
      {
        id: "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.WebhookClientConfig",
        parentId:
          "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.WebhookConversion",
        path: "clientConfig",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.ExternalMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.ExternalMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.ExternalMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.ExternalMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.HPAScalingRules",
    [
      {
        id: "io.k8s.api.autoscaling.v2.HPAScalingPolicy",
        parentId: "io.k8s.api.autoscaling.v2.HPAScalingRules",
        path: "policies",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler",
    [
      {
        id: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerBehavior",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler",
        path: "spec.behavior",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler",
        path: "spec.metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerBehavior",
    [
      {
        id: "io.k8s.api.autoscaling.v2.HPAScalingRules",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerBehavior",
        path: "scaleDown",
        isArray: false,
        alias: { name: "scaleDown", default: false },
      },
      {
        id: "io.k8s.api.autoscaling.v2.HPAScalingRules",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerBehavior",
        path: "scaleUp",
        isArray: false,
        alias: { name: "scaleUp", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerBehavior",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerSpec",
        path: "behavior",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.MetricSpec",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerSpec",
        path: "metrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerCondition",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerStatus",
        path: "conditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.autoscaling.v2.MetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerStatus",
        path: "currentMetrics",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.MetricIdentifier",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        path: "selector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.MetricSpec",
    [
      {
        id: "io.k8s.api.autoscaling.v2.ContainerResourceMetricSource",
        parentId: "io.k8s.api.autoscaling.v2.MetricSpec",
        path: "containerResource",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ExternalMetricSource",
        parentId: "io.k8s.api.autoscaling.v2.MetricSpec",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ObjectMetricSource",
        parentId: "io.k8s.api.autoscaling.v2.MetricSpec",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.PodsMetricSource",
        parentId: "io.k8s.api.autoscaling.v2.MetricSpec",
        path: "pods",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ResourceMetricSource",
        parentId: "io.k8s.api.autoscaling.v2.MetricSpec",
        path: "resource",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.MetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2.ContainerResourceMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.MetricStatus",
        path: "containerResource",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ExternalMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.MetricStatus",
        path: "external",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ObjectMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.MetricStatus",
        path: "object",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.PodsMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.MetricStatus",
        path: "pods",
        isArray: false,
      },
      {
        id: "io.k8s.api.autoscaling.v2.ResourceMetricStatus",
        parentId: "io.k8s.api.autoscaling.v2.MetricStatus",
        path: "resource",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.ObjectMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.ObjectMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.ObjectMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.ObjectMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.PodsMetricSource",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.PodsMetricSource",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.autoscaling.v2.PodsMetricStatus",
    [
      {
        id: "io.k8s.api.autoscaling.v2.MetricIdentifier",
        parentId: "io.k8s.api.autoscaling.v2.PodsMetricStatus",
        path: "metric",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.core.v1.LifecycleHandler",
    [
      {
        id: "io.k8s.api.core.v1.HTTPGetAction",
        parentId: "io.k8s.api.core.v1.LifecycleHandler",
        path: "httpGet",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.FlowSchema",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta2.FlowSchema",
        path: "spec.rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.FlowSchemaSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta2.FlowSchemaSpec",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.LimitedPriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.LimitResponse",
        parentId:
          "io.k8s.api.flowcontrol.v1beta2.LimitedPriorityLevelConfiguration",
        path: "limitResponse",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.NonResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
        path: "nonResourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta2.ResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
        path: "resourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta2.Subject",
        parentId: "io.k8s.api.flowcontrol.v1beta2.PolicyRulesWithSubjects",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.LimitedPriorityLevelConfiguration",
        parentId: "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration",
        path: "spec.limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta2.LimitedPriorityLevelConfiguration",
        parentId:
          "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationSpec",
        path: "limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.storage.v1.CSIStorageCapacity",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.storage.v1.CSIStorageCapacity",
        path: "nodeTopology",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.PodFailurePolicy",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicyOnPodConditionsPattern",
        parentId: "io.k8s.api.batch.v1.PodFailurePolicy",
        path: "rules.onPodConditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.batch.v1.PodFailurePolicyRule",
    [
      {
        id: "io.k8s.api.batch.v1.PodFailurePolicyOnPodConditionsPattern",
        parentId: "io.k8s.api.batch.v1.PodFailurePolicyRule",
        path: "onPodConditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1alpha1.ClusterCIDR",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.networking.v1alpha1.ClusterCIDR",
        path: "spec.nodeSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1alpha1.ClusterCIDRSpec",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.networking.v1alpha1.ClusterCIDRSpec",
        path: "nodeSelector",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
    [
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.NamedRuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        path: "excludeResourceRules",
        isArray: true,
        alias: { name: "excludeResourceRule", default: false },
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.NamedRuleWithOperations",
        parentId: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        path: "resourceRules",
        isArray: true,
        alias: { name: "resourceRule", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        path: "namespaceSelector",
        isArray: false,
        alias: { name: "namespaceSelector", default: false },
      },
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.LabelSelector",
        parentId: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        path: "objectSelector",
        isArray: false,
        alias: { name: "objectSelector", default: false },
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy",
    [
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.AuditAnnotation",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy",
        path: "spec.auditAnnotations",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchCondition",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy",
        path: "spec.matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy",
        path: "spec.matchConstraints",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.Validation",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicy",
        path: "spec.validations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyBinding",
    [
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyBinding",
        path: "spec.matchResources",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyBindingSpec",
    [
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyBindingSpec",
        path: "matchResources",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicySpec",
    [
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.AuditAnnotation",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicySpec",
        path: "auditAnnotations",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchCondition",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicySpec",
        path: "matchConditions",
        isArray: true,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.MatchResources",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicySpec",
        path: "matchConstraints",
        isArray: false,
      },
      {
        id: "io.k8s.api.admissionregistration.v1alpha1.Validation",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicySpec",
        path: "validations",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.FlowSchema",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta3.FlowSchema",
        path: "spec.rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.FlowSchemaSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
        parentId: "io.k8s.api.flowcontrol.v1beta3.FlowSchemaSpec",
        path: "rules",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.LimitedPriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.LimitResponse",
        parentId:
          "io.k8s.api.flowcontrol.v1beta3.LimitedPriorityLevelConfiguration",
        path: "limitResponse",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.NonResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
        path: "nonResourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta3.ResourcePolicyRule",
        parentId: "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
        path: "resourceRules",
        isArray: true,
      },
      {
        id: "io.k8s.api.flowcontrol.v1beta3.Subject",
        parentId: "io.k8s.api.flowcontrol.v1beta3.PolicyRulesWithSubjects",
        path: "subjects",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.PriorityLevelConfiguration",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.LimitedPriorityLevelConfiguration",
        parentId: "io.k8s.api.flowcontrol.v1beta3.PriorityLevelConfiguration",
        path: "spec.limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.flowcontrol.v1beta3.PriorityLevelConfigurationSpec",
    [
      {
        id: "io.k8s.api.flowcontrol.v1beta3.LimitedPriorityLevelConfiguration",
        parentId:
          "io.k8s.api.flowcontrol.v1beta3.PriorityLevelConfigurationSpec",
        path: "limited",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressLoadBalancerIngress",
    [
      {
        id: "io.k8s.api.networking.v1.IngressPortStatus",
        parentId: "io.k8s.api.networking.v1.IngressLoadBalancerIngress",
        path: "ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.networking.v1.IngressLoadBalancerStatus",
    [
      {
        id: "io.k8s.api.networking.v1.IngressPortStatus",
        parentId: "io.k8s.api.networking.v1.IngressLoadBalancerStatus",
        path: "ingress.ports",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha1.AllocationResult",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.resource.v1alpha1.AllocationResult",
        path: "availableOnNodes",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha1.ResourceClaimStatus",
    [
      {
        id: "io.k8s.api.resource.v1alpha1.AllocationResult",
        parentId: "io.k8s.api.resource.v1alpha1.ResourceClaimStatus",
        path: "allocation",
        isArray: false,
      },
      {
        id: "io.k8s.api.resource.v1alpha1.ResourceClaimConsumerReference",
        parentId: "io.k8s.api.resource.v1alpha1.ResourceClaimStatus",
        path: "reservedFor",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha1.ResourceClaimTemplate",
    [
      {
        id: "io.k8s.api.resource.v1alpha1.ResourceClaimSpec",
        parentId: "io.k8s.api.resource.v1alpha1.ResourceClaimTemplate",
        path: "spec.spec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha1.ResourceClass",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.resource.v1alpha1.ResourceClass",
        path: "suitableNodes",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyStatus",
    [
      {
        id: "io.k8s.apimachinery.pkg.apis.meta.v1.Condition",
        parentId:
          "io.k8s.api.admissionregistration.v1alpha1.ValidatingAdmissionPolicyStatus",
        path: "conditions",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha2.AllocationResult",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.resource.v1alpha2.AllocationResult",
        path: "availableOnNodes",
        isArray: false,
      },
      {
        id: "io.k8s.api.resource.v1alpha2.ResourceHandle",
        parentId: "io.k8s.api.resource.v1alpha2.AllocationResult",
        path: "resourceHandles",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha2.ResourceClaimStatus",
    [
      {
        id: "io.k8s.api.resource.v1alpha2.AllocationResult",
        parentId: "io.k8s.api.resource.v1alpha2.ResourceClaimStatus",
        path: "allocation",
        isArray: false,
      },
      {
        id: "io.k8s.api.resource.v1alpha2.ResourceClaimConsumerReference",
        parentId: "io.k8s.api.resource.v1alpha2.ResourceClaimStatus",
        path: "reservedFor",
        isArray: true,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha2.ResourceClaimTemplate",
    [
      {
        id: "io.k8s.api.resource.v1alpha2.ResourceClaimSpec",
        parentId: "io.k8s.api.resource.v1alpha2.ResourceClaimTemplate",
        path: "spec.spec",
        isArray: false,
      },
    ],
  ],
  [
    "io.k8s.api.resource.v1alpha2.ResourceClass",
    [
      {
        id: "io.k8s.api.core.v1.NodeSelector",
        parentId: "io.k8s.api.resource.v1alpha2.ResourceClass",
        path: "suitableNodes",
        isArray: false,
      },
    ],
  ],
]);
