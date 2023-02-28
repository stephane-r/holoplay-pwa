import { memo } from "react";
import { useFavorite } from "../providers/Favorite";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentFavorites = memo(() => {
  const favorite = useFavorite();

  if (!favorite.videos.length) {
    return null;
  }

  const data = favorite.videos.slice(0, 10);

  return <HorizontalGridList data={data} keyPrefix="recent-favorites" />;
});
