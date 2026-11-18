import { database } from "../services/database";
import type { Instance } from "../types/interfaces/Instance";

export const getCurrentInstance = async (): Promise<Instance> => {
  const settings = await database.getSettings();

  if (!settings?.currentInstance) {
    throw new Error("No current instance");
  }

  return settings.currentInstance;
};
