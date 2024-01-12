import type { Instance } from "./Instance";

export interface RemoteDevice {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  instances: Instance[];
  currentInstance: Instance | null;
  defaultInstance: Instance | null;
  customInstances: Instance[];
  videoMode: boolean;
  deviceId: string;
  devices: RemoteDevice[];
  sponsorBlock: boolean;
  sponsorBlockCategories: string[];
  analytics: boolean;
  exportFileName: string | null;
  exportLastDate: string | null;
}
