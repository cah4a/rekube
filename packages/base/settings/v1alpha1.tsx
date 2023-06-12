import { IObjectMeta, ILabelSelector } from "meta/v1";
import { IEnvVar, IEnvFromSource, IVolumeMount, IVolume } from "core/v1";
import { useKubeProps, Resource } from "rekube";

/** * PodPreset is a policy resource that defines additional runtime requirements for a Pod.
 *
 * Child components:
 * - spec.selector: {@link LabelSelector} (single element)
 * - spec.volumes: {@link Volume}
 * - spec.env: {@link EnvVar}
 * - spec.envFrom: {@link EnvFromSource}
 * - spec.volumeMounts: {@link VolumeMount} */
export const PodPreset = ({
  children,
  ...props
}: {
  /**
   * Env defines the collection of EnvVar to inject into containers.
   */
  env?: IEnvVar[];
  /**
   * EnvFrom defines the collection of EnvFromSource to inject into containers.
   */
  envFrom?: IEnvFromSource[];
  /**
   * Selector is a label query over a set of resources, in this case pods. Required.
   */
  selector?: ILabelSelector;
  /**
   * VolumeMounts defines the collection of VolumeMount to inject into containers.
   */
  volumeMounts?: IVolumeMount[];
  /**
   * Volumes defines the collection of Volume to inject into the pod.
   */
  volumes?: IVolume[];
  children?: React.ReactNode;
} & IObjectMeta) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.settings.v1alpha1.PodPreset"
      kind="PodPreset"
      apiVersion="settings.k8s.io/v1alpha1"
      props={childProps}
    >
      {children}
    </Resource>
  );
};
