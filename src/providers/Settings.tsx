import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";

import { db } from "../database";
import { getSettings } from "../database/utils";
import {
  fetchInvidiousInstances,
  filterAndParseInstances,
} from "../services/instances";
import { Settings } from "../types/interfaces/Settings";

const SettingsContext = createContext<null | {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>(null);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>({
    ...getSettings(),
    instances: [],
  });

  const handleSuccess = useCallback(
    (data: any) => {
      if (settings.instances.length > 0) return;

      const instances = filterAndParseInstances(data as any);

      const currentInstance = (() => {
        if (settings.defaultInstance) {
          if (settings.defaultInstance.custom) {
            return settings.defaultInstance;
          }

          const isStillUp = instances.find(
            (instance) => instance.domain === settings.defaultInstance?.domain,
          );

          // If the default instance is still up, use it
          // Otherwise, pick a random instance
          if (isStillUp) {
            return settings.defaultInstance;
          }
        }

        return instances[generateRandomInteger(1, instances.length - 1)];
      })();

      setSettings((previousState) => ({
        ...previousState,
        instances,
        currentInstance,
      }));

      db.update("settings", { ID: 1 }, () => ({
        currentInstance,
      }));
      db.commit();
    },
    [settings.defaultInstance, settings.instances.length],
  );

  useQuery("instances", () => fetchInvidiousInstances(), {
    onSuccess: handleSuccess,
    enabled: settings.instances.length === 0,
  });

  const value = useMemo(
    () => ({
      settings,
      setSettings,
    }),
    [settings, setSettings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () =>
  useContext(SettingsContext)?.settings as Settings;
export const useSetSettings = () =>
  useContext(SettingsContext)?.setSettings as React.Dispatch<
    React.SetStateAction<Settings>
  >;

const generateRandomInteger = (min = 1, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));
