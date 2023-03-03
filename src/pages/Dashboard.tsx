import { Space } from "@mantine/core";
import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";
import { useVideoShareListener } from "../hooks/useVideoShareListener";

export const DashboardPage = memo(() => {
  useVideoShareListener();

  return (
    <div>
      <PageHeader title="Dashboard" />
      <Space h="lg" />
      <RecentlyPlay />
      <Space h={60} />
      <RecentFavorites />
    </div>
  );
});
