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

import { getPlaylists } from "../database/utils";
import type { Playlist } from "../types/interfaces/Playlist";

const PlaylistContext = createContext<Playlist[]>([]);
const SetPlaylistContext = createContext<Dispatch<SetStateAction<Playlist[]>>>(
  () => {},
);

export const PlaylistProvider: FC<PropsWithChildren> = ({ children }) => {
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
