import { db } from ".";
import type { Settings } from "../types/interfaces/Settings";

const migration = () => {
  const settings = db.queryAll("settings", { query: { ID: 1 } })[0] as Settings;

  if (settings.customInstances.filter((instance) => !instance.custom)) {
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      customInstances: data.customInstances.map((instance) => ({
        ...instance,
        custom: true,
      })),
    }));
    db.commit();
  }

  if (settings.defaultInstance) {
    const isCustomInstance = settings.customInstances.find(
      (instance) => instance.domain === settings.defaultInstance?.domain,
    );

    if (!isCustomInstance) {
      return;
    }

    db.update("settings", { ID: 1 }, (data: Settings) => ({
      defaultInstance: {
        ...settings.defaultInstance,
        custom: true,
      },
    }));
    db.commit();
  }
};

export default migration;
