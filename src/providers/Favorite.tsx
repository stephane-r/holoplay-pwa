import { type FC, type PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { database } from "../services/database";
import type { Card } from "../types/interfaces/Card";
import type { FavoritePlaylist } from "../types/interfaces/Playlist";
import { getCardId } from "../utils/card";

const initialFavorite: FavoritePlaylist = {
  type: "playlist",
  title: "Favorites",
  cards: [],
  videos: [],
  videoCount: 0,
  playlistThumbnail: "",
};

const FavoriteContext = createContext<FavoritePlaylist>(initialFavorite);
const FavoriteIdsContext = createContext<Set<string | number | undefined>>(
  new Set(),
);

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

  // Computed once per favorites change here, instead of every ButtonFavorite
  // instance re-scanning the whole list with .find() on every render.
  const favoriteIds = useMemo(
    () => new Set(favorite.cards.map(getCardId)),
    [favorite.cards],
  );

  return (
    <FavoriteContext.Provider value={favorite}>
      <FavoriteIdsContext.Provider value={favoriteIds}>
        {children}
      </FavoriteIdsContext.Provider>
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);

export const useIsFavorite = (card: Card | null | undefined) => {
  const favoriteIds = useContext(FavoriteIdsContext);
  return card ? favoriteIds.has(getCardId(card)) : false;
};
