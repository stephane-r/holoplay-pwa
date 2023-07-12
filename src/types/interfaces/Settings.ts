import { Instance } from "./Instance";

export interface Settings {
  instances: Instance[];
  currentInstance: Instance | null;
  defaultInstance: Instance | null;
  customInstances: Instance[];
  videoMode: boolean;
  deviceId: string;
}
