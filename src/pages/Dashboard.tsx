import { Space } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";
import { useVideoShareListener } from "../hooks/useVideoShareListener";

export const DashboardPage = memo(() => {
  const { t } = useTranslation();
  useVideoShareListener();

  return (
    <div>
      <PageHeader title={t("page.dashboard.title")} />
      <Space h="lg" />
      <RecentlyPlay />
      <Space h={60} />
      <RecentFavorites />
    </div>
  );
});
