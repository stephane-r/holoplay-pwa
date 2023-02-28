import { Space } from "@mantine/core";
import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";

export const DashboardPage = memo(() => {
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
