interface Monitor {
  monitorId: number;
  createdAt: number;
  statusClass: string;
  name: string;
  url?: string;
}

interface Software {
  branch: string;
  name: string;
  version: string;
}

interface Metadata {
  lastChannelRefreshedAt: number;
  updatedAt: number;
}

interface User {
  activeHalfyear: number;
  activeMonth: number;
  total: number;
}

interface Stat {
  version: string;
  openRegistrations: boolean;
  software: Software;
  metadata: Metadata;
  usage: {
    users: User;
  };
}

type InstanceTypes = "https" | "onion";

export interface Instance {
  domain: string;
  api: boolean;
  cors: boolean;
  flag: string;
  monitor: Monitor;
  region: string;
  stats: Stat;
  type: InstanceTypes;
  uri: string;
  custom: boolean;
}

export interface CustomInstance {
  domain: string;
  type: InstanceTypes;
  uri: string;
  custom: boolean;
}
