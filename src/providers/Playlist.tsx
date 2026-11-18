import { type FC, type PropsWithChildren, createContext, useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { database } from "../services/database";
import type { Playlist } from "../types/interfaces/Playlist";

const PlaylistContext = createContext<Playlist[]>([]);

export const PlaylistProvider: FC<PropsWithChildren> = ({ children }) => {
  const playlists = (useLiveQuery(() => database.getPlaylists(), []) ??
    []) as Playlist[];

  return (
    <PlaylistContext.Provider value={playlists}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
