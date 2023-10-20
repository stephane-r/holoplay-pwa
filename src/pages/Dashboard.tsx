import { Flex, Space, Title } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { GenreList } from "../components/Genre";
import { LinkSeeAll } from "../components/LinkSeeAll";
import { PageHeader } from "../components/PageHeader";
import { Popular } from "../components/Popular";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";
import { Trending } from "../components/Trending";
import { useVideoShareListener } from "../hooks/useVideoShareListener";

export const DashboardPage = memo(() => {
  const { t } = useTranslation();

  useVideoShareListener();

  return (
    <div>
      <PageHeader title={t("page.dashboard.title")} />
      <Space h={20} />
      <RecentlyPlay />
      <Space h={60} />
      <RecentFavorites />
      <Space h={60} />
      <GenreList />
      <Space h={60} />
      <Flex align="baseline" gap={12}>
        <Title order={2}>{t("page.trending.title")}</Title>
        <LinkSeeAll to="/trending" />
      </Flex>
      <Space h="lg" />
      <Trending horizontal />
      <Space h={60} />
      <Flex align="baseline" gap={12}>
        <Title order={2}>{t("page.most-populars.title")}</Title>
        <LinkSeeAll to="/most-popular" />
      </Flex>
      <Space h="lg" />
      <Popular horizontal />
    </div>
  );
});
