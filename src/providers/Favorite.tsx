import { type FC, type PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { database } from "../services/database";
import type { FavoritePlaylist } from "../types/interfaces/Playlist";

// @ts-ignore
const FavoriteContext = createContext<FavoritePlaylist>({});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const favoritePlaylist = useLiveQuery(() => database.getFavoritePlaylist(), []);

  const favorite = useMemo(
    () =>
      ({
        ...favoritePlaylist,
        cards: favoritePlaylist?.cards ?? [],
      }) as FavoritePlaylist,
    [favoritePlaylist],
  );

  return (
    <FavoriteContext.Provider value={favorite}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
