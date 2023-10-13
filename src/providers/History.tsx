import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { db } from "../database";
import { getVideosHistory } from "../database/utils";
import { Video } from "../types/interfaces/Video";

const HistoryContext = createContext<Video[]>([]);
const SetHistoryContext = createContext<(video: Video) => void>(() => {});

interface HistoryProviderProps {
  children: React.ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<Video[]>(getVideosHistory());

  const handleSetHistory = useCallback((video: Video) => {
    db.insert("history", video);
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
