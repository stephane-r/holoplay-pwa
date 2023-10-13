import { createContext, useContext, useMemo, useState } from "react";

import { Video } from "../types/interfaces/Video";

const PlayerPlaylistContext = createContext<Video[]>([]);
const SetPlayerPlaylistContext = createContext<
  React.Dispatch<React.SetStateAction<Video[]>>
>(() => {});

interface PlayerPlaylistProviderProps {
  children: React.ReactNode;
}

export const PlayerPlaylistProvider: React.FC<PlayerPlaylistProviderProps> = ({
  children,
}) => {
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
