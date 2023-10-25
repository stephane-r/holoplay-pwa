import type { Instance } from "../types/interfaces/Instance";

export const fetchInvidiousInstances = async () => {
  const request = await fetch("https://api.invidious.io/instances.json");
  return request.json();
};

export const filterAndParseInstances = (instances: any[]): Instance[] => {
  return instances
    .filter(([, instance]) => instance.api)
    .map(([domain, instance]) => ({
      domain,
      ...instance,
    }));
};
