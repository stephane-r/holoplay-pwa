import { Alert } from "@mantine/core";
import { memo } from "react";
import { useFavorite } from "../providers/Favorite";
import { CardList } from "./CardList";

export const FavoritePlaylist = memo(() => {
  const favorite = useFavorite();

  if (!favorite.videos.length) {
    return (
      <Alert title="Oh no!" color="blue" radius="md">
        Your favorites list is empty
      </Alert>
    );
  }

  return <CardList data={favorite.videos} />;
});
