import { Flex } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "../components/PageHeader";
import { Trending } from "../components/Trending";
import { TrendingFilters } from "../components/TrendingFilters";

export const TrendingPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.trending.title")}>
        <Flex align="center" ml="auto" gap="md">
          <TrendingFilters />
        </Flex>
      </PageHeader>
      <Trending />
    </div>
  );
});
