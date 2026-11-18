import type { Instance } from "../types/interfaces/Instance";

// https://api.invidious.io/instances.json returns an array of
// [domain, instanceData] tuples rather than a flat list of objects.
export type InvidiousInstanceEntry = [string, Omit<Instance, "domain">];

export const fetchInvidiousInstances = async (): Promise<
  InvidiousInstanceEntry[]
> => {
  const request = await fetch("https://api.invidious.io/instances.json");
  return request.json();
};

export const filterAndParseInstances = (
  instances: InvidiousInstanceEntry[],
): Instance[] => {
  return instances
    .filter(([, instance]) => instance.api)
    .map(([domain, instance]) => ({
      domain,
      ...instance,
    }));
};
