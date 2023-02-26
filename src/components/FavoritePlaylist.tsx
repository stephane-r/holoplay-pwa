import { memo } from "react";
import { useFavorite } from "../providers/Favorite";
import { CardList } from "./CardList";

export const FavoritePlaylist = memo(() => {
  const favorite = useFavorite();
  return <CardList data={favorite.videos} />;
});
