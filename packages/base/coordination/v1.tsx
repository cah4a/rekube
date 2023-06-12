import { IObjectMeta } from "meta/v1";
import { MicroTime, useKubeProps, Resource } from "rekube";

/** * Lease defines a lease concept. */
export const Lease = (
  props: {
    /**
     * acquireTime is a time when the current lease was acquired.
     */
    acquireTime?: MicroTime;
    /**
     * holderIdentity contains the identity of the holder of a current lease.
     */
    holderIdentity?: string;
    /**
     * leaseDurationSeconds is a duration that candidates for a lease need to wait to force acquire it. This is measure against time of last observed renewTime.
     */
    leaseDurationSeconds?: number | bigint;
    /**
     * leaseTransitions is the number of transitions of a lease between holders.
     */
    leaseTransitions?: number | bigint;
    /**
     * renewTime is a time when the current holder of a lease has last updated the lease.
     */
    renewTime?: MicroTime;
  } & IObjectMeta
) => {
  const { childProps } = useKubeProps(props, {
    key: "spec",
  });
  return (
    <Resource
      id="io.k8s.api.coordination.v1.Lease"
      kind="Lease"
      apiVersion="coordination.k8s.io/v1"
      props={childProps}
    />
  );
};
