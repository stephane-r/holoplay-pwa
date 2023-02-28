import { Space, Title } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";

export const DashboardPage = () => {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <Space h="lg" />
      <Title order={2}>Recently Play</Title>
      <Space h="lg" />
      <RecentlyPlay />
      <Space h={60} />
      <Title order={2}>Recent favorites</Title>
      <Space h="lg" />
      <RecentFavorites />
    </div>
  );
};
