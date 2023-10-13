import { createContext, useContext, useMemo, useState } from "react";

import { getFavoritePlaylist } from "../database/utils";
import { Playlist } from "../types/interfaces/Playlist";

const FavoriteContext = createContext<Playlist>(getFavoritePlaylist());
const SetFavoriteContext = createContext<
  React.Dispatch<React.SetStateAction<Playlist>>
>(() => {});

interface FavoriteProviderProps {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<Playlist>(getFavoritePlaylist());

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
