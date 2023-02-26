interface Monitor {
  monitorId: Number;
  createdAt: Number;
  statusClass: String;
  name: String;
  url?: String;
}

interface Software {
  branch: String;
  name: String;
  version: string;
}

interface Metadata {
  lastChannelRefreshedAt: Number;
  updatedAt: Number;
}

interface User {
  activeHalfyear: Number;
  activeMonth: Number;
  total: Number;
}

interface Stat {
  version: String;
  openRegistrations: Boolean;
  software: Software;
  metadata: Metadata;
  usage: {
    users: User;
  };
}

type InstanceTypes = "https" | "onion";

export interface Instance {
  domain: String;
  api: Boolean;
  cors: Boolean;
  flag: String;
  monitor: Monitor;
  region: String;
  stats: Stat;
  type: InstanceTypes;
  uri: String;
}
