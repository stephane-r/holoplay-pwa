import type { Instance } from "./Instance";

export type RemoteDeviceType = "desktop" | "tablet" | "mobile";

export interface RemoteDevice {
  id: string;
  name: string;
  type: "desktop" | "tablet" | "mobile";
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
  // Missing on rows created before this field existed — read it through
  // `useSettings()`, which falls back to 1, rather than straight off a row.
  volume: number;
}
