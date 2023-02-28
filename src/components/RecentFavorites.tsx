import { Alert, Space, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useFavorite } from "../providers/Favorite";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentFavorites = memo(() => {
  const favorite = useFavorite();

  if (!favorite.videos.length) {
    return (
      <Alert title="Oh no!">
        <Text>Your favorites list is empty</Text>
      </Alert>
    );
  }

  const data = favorite.videos.slice(0, 10);

  return (
    <>
      <Title order={2}>Recent favorites</Title>
      <Space h="lg" />
      <HorizontalGridList data={data} keyPrefix="recent-favorites" />
    </>
  );
});
