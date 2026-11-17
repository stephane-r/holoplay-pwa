import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useLiveQuery } from "dexie-react-hooks";

import { database } from "../services/database";
import {
  fetchInvidiousInstances,
  filterAndParseInstances,
} from "../services/instances";
import type { Instance } from "../types/interfaces/Instance";
import type { RemoteDevice, Settings } from "../types/interfaces/Settings";
import { stringValueIsEmpty } from "../utils/stringValueIsEmpty";

const SettingsContext = createContext<null | { settings: Settings }>(null);

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const row = useLiveQuery(() => database.getSettings());
  const [instances, setInstances] = useState<Instance[]>([]);

  const handleSuccess = useCallback(
    (data: any) => {
      if (!row || instances.length > 0) return;

      const parsedInstances = filterAndParseInstances(data as any);

      const currentInstance = (() => {
        if (row.defaultInstance) {
          if (row.defaultInstance.custom) {
            return row.defaultInstance;
          }

          const isStillUp = parsedInstances.find(
            (instance) => instance.domain === row.defaultInstance?.domain,
          );

          // If the default instance is still up, use it
          // Otherwise, pick a random instance
          if (isStillUp) {
            return row.defaultInstance;
          }
        }

        return parsedInstances[
          generateRandomInteger(1, parsedInstances.length - 1)
        ];
      })();

      setInstances(parsedInstances);
      database.updateSettings({ currentInstance });
    },
    [instances.length, row],
  );

  useQuery("instances", () => fetchInvidiousInstances(), {
    onSuccess: handleSuccess,
    enabled: row !== undefined && instances.length === 0,
  });

  const exportFileName = useMemo(() => {
    if (!row) return null;
    return stringValueIsEmpty(row.exportFileName as string)
      ? null
      : row.exportFileName;
  }, [row]);

  const settings = useMemo(
    () =>
      row
        ? ({
            ...row,
            exportFileName,
            instances,
          } as Settings)
        : null,
    [row, exportFileName, instances],
  );

  const value = useMemo(
    () => (settings ? { settings } : null),
    [settings],
  );

  if (!value) {
    return null;
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () =>
  useContext(SettingsContext)?.settings as Settings;
export const useRemoteDevices = () =>
  useContext(SettingsContext)?.settings.devices as RemoteDevice[];

const generateRandomInteger = (min = 1, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));
