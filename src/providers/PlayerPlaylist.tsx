import {
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Video } from "../types/interfaces/Video";

const PlayerPlaylistContext = createContext<Video[]>([]);
const SetPlayerPlaylistContext = createContext<
  Dispatch<SetStateAction<Video[]>>
>(() => {});

export const PlayerPlaylistProvider: FC<PropsWithChildren> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  const value = useMemo(
    () => ({
      videos,
      setVideos,
    }),
    [videos],
  );

  return (
    <PlayerPlaylistContext.Provider value={value.videos}>
      <SetPlayerPlaylistContext.Provider value={value.setVideos}>
        {children}
      </SetPlayerPlaylistContext.Provider>
    </PlayerPlaylistContext.Provider>
  );
};

export const usePlayerPlaylist = () => useContext(PlayerPlaylistContext);
export const useSetPlayerPlaylist = () => useContext(SetPlayerPlaylistContext);
