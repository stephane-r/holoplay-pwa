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

import { getFavoritePlaylist } from "../database/utils";
import type { FavoritePlaylist } from "../types/interfaces/Playlist";

// @ts-ignore
const FavoriteContext = createContext<FavoritePlaylist>({});
const SetFavoriteContext = createContext<
  Dispatch<SetStateAction<FavoritePlaylist>>
>(() => {});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const favoritePlaylist = getFavoritePlaylist();
  const [favorite, setFavorite] = useState<FavoritePlaylist>({
    ...favoritePlaylist,
    cards: favoritePlaylist.cards ?? [],
  });

  const value = useMemo(() => ({ favorite, setFavorite }), [favorite]);

  return (
    <FavoriteContext.Provider value={value.favorite}>
      <SetFavoriteContext.Provider value={value.setFavorite}>
        {children}
      </SetFavoriteContext.Provider>
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
export const useSetFavorite = () => useContext(SetFavoriteContext);
