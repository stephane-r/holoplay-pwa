import { type FC, type PropsWithChildren, createContext, useCallback, useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { database } from "../services/database";
import type { CardVideo } from "../types/interfaces/Card";
import type { Video } from "../types/interfaces/Video";
import { formatedCardVideo } from "../utils/formatData";

const HistoryContext = createContext<CardVideo[]>([]);
const SetHistoryContext = createContext<(video: Video) => void>(() => {});

export const HistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const history = useLiveQuery(() => database.getVideosHistory(), []) ?? [];

  const handleSetHistory = useCallback((video: Video) => {
    database.addToHistory(formatedCardVideo(video));
  }, []);

  return (
    <HistoryContext.Provider value={history}>
      <SetHistoryContext.Provider value={handleSetHistory}>
        {children}
      </SetHistoryContext.Provider>
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
export const useSetHistory = () => useContext(SetHistoryContext);
