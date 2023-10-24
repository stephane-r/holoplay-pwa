import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { db } from "../database";
import { getVideosHistory } from "../database/utils";
import type { CardVideo } from "../types/interfaces/Card";
import type { Video } from "../types/interfaces/Video";
import { formatedCardVideo } from "../utils/formatData";

const HistoryContext = createContext<CardVideo[]>([]);
const SetHistoryContext = createContext<(video: Video) => void>(() => {});

export const HistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [history, setHistory] = useState<CardVideo[]>(getVideosHistory());

  const handleSetHistory = useCallback((video: Video) => {
    db.insert("history", formatedCardVideo(video));
    db.commit();
    setHistory(getVideosHistory());
  }, []);

  const value = useMemo(
    () => ({
      history,
      setHistory: handleSetHistory,
    }),
    [history, handleSetHistory],
  );

  return (
    <HistoryContext.Provider value={value.history}>
      <SetHistoryContext.Provider value={value.setHistory}>
        {children}
      </SetHistoryContext.Provider>
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
export const useSetHistory = () => useContext(SetHistoryContext);
