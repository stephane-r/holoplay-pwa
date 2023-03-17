import { Alert } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useFavorite } from "../providers/Favorite";
import { CardList } from "./CardList";

export const FavoritePlaylist = memo(() => {
  const favorite = useFavorite();
  const { t } = useTranslation();

  if (!favorite.videos.length) {
    return (
      <Alert title={t("favorite.empty.title")} color="blue" radius="md">
        {t("favorite.empty.message")}
      </Alert>
    );
  }

  return <CardList data={favorite.videos} />;
});
