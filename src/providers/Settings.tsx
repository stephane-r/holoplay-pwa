import {
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
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
import type { RemoteDevice, Settings } from "../types/interfaces/Settings";
import { stringValueIsEmpty } from "../utils/stringValueIsEmpty";

const SettingsContext = createContext<null | {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}>(null);

const INITIAL_SETTINGS = getSettings();

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const exportFileName = useMemo(
    () =>
      stringValueIsEmpty(INITIAL_SETTINGS.exportFileName as string)
        ? null
        : INITIAL_SETTINGS.exportFileName,
    [],
  );
  const [settings, setSettings] = useState<Settings>({
    ...INITIAL_SETTINGS,
    exportFileName,
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
  useContext(SettingsContext)?.setSettings as Dispatch<
    SetStateAction<Settings>
  >;
export const useRemoteDevices = () =>
  useContext(SettingsContext)?.settings.devices as RemoteDevice[];

const generateRandomInteger = (min = 1, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));
