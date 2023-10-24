import { getSettings } from "../database/utils";
import type { Instance } from "../types/interfaces/Instance";

export const getCurrentInstance = (): Instance => {
  const settings = getSettings();

  if (!settings.currentInstance) {
    throw new Error("No current instance");
  }

  return settings.currentInstance;
};
