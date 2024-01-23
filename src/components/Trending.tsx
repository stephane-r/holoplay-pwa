import { Alert, Text } from "@mantine/core";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { useTrendingFiltersValues } from "../providers/TrendingFilters";
import { getTrendings } from "../services/trending";
import { CardList } from "./CardList";
import { HorizontalGridList } from "./HorizontalGridList";

interface TrendingProps {
  horizontal?: boolean;
}

export const Trending: FC<TrendingProps> = memo(({ horizontal = false }) => {
  const trendingFiltersValues = useTrendingFiltersValues();
  const query = useQuery(
    `trending-${trendingFiltersValues.type}-${trendingFiltersValues.region}`,
    () => getTrendings(trendingFiltersValues),
    {
      enabled: Boolean(trendingFiltersValues.region),
    },
  );
  const { t } = useTranslation();

  if (!query.data) {
    return <Text>{t("loading")}</Text>;
  }

  if (query.error) {
    return <Text>{t("error")}</Text>;
  }

  if (horizontal) {
    if (!query.data.length) {
      return (
        <Alert title={t("recently.play.alert.title")}>
          <Text>{t("recently.play.alert.message")}</Text>
        </Alert>
      );
    }
    return (
      <HorizontalGridList data={query.data.slice(0, 10)} label="Trending" />
    );
  }

  return <CardList data={query.data} label="Trending" />;
});
