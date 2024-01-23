import { Alert, Space, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useFavorite } from "../providers/Favorite";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentFavorites = memo(() => {
  const favorite = useFavorite();
  const data = favorite.cards.slice(0, 10);
  const { t } = useTranslation();

  return (
    <>
      <Title order={2}>{t("recente.favorites.title")}</Title>
      <Space h="lg" />
      {!favorite.cards.length ? (
        <Alert
          data-testid="recent-favorites"
          title={t("recente.favorites.alert.title")}
        >
          <Text>{t("recente.favorites.alert.message")}</Text>
        </Alert>
      ) : (
        <HorizontalGridList data={data} label="Recent favorites" />
      )}
    </>
  );
});
