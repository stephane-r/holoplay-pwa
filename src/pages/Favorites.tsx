import { memo } from "react";
import { FavoritePlaylist } from "../components/FavoritePlaylist";
import { PageHeader } from "../components/PageHeader";

export const FavoritesPage = memo(() => {
  return (
    <div>
      <PageHeader title="Favorites" />
      <FavoritePlaylist />
    </div>
  );
});
