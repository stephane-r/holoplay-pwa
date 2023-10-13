import { createContext, useContext, useMemo, useState } from "react";

import { getPlaylists } from "../database/utils";
import { Playlist } from "../types/interfaces/Playlist";

const PlaylistContext = createContext<Playlist[]>([]);
const SetPlaylistContext = createContext<
  React.Dispatch<React.SetStateAction<Playlist[]>>
>(() => {});

interface PlaylistProviderProps {
  children: React.ReactNode;
}

export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({
  children,
}) => {
  const [playlists, setPlaylists] = useState(getPlaylists());

  const value = useMemo(
    () => ({
      playlists,
      setPlaylists,
    }),
    [playlists],
  );

  return (
    <PlaylistContext.Provider value={value.playlists}>
      <SetPlaylistContext.Provider value={value.setPlaylists}>
        {children}
      </SetPlaylistContext.Provider>
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
export const useSetPlaylists = () => useContext(SetPlaylistContext);
