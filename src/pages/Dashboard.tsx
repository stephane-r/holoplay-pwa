import { Flex, Space, Title, createStyles } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useVideoShareListener } from "../hooks/useVideoShareListener";
import { Trending } from "../components/Trending";
import { Popular } from "../components/Popular";
import { Link } from "react-router-dom";
import { RecentFavorites } from "../components/RecentFavorites";
import { RecentlyPlay } from "../components/RecentlyPlay";
import { GenreList } from "../components/Genre";

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.blue[6],
    textDecoration: "none",
  },
}));

export const DashboardPage = memo(() => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  useVideoShareListener();

  return (
    <div>
      <PageHeader title={t("page.dashboard.title")} />
      <Space h="lg" />
      <Flex align="baseline" gap={12}>
        <Title order={2}>{t("page.trending.title")}</Title>
        <Link to="/trending" className={classes.link}>
          {t("button.see-all")}
        </Link>
      </Flex>
      <Space h="lg" />
      <Trending horizontal />
      <Space h={60} />
      <Flex align="baseline" gap={12}>
        <Title order={2}>{t("page.most-populars.title")}</Title>
        <Link to="/most-popular" className={classes.link}>
          {t("button.see-all")}
        </Link>
      </Flex>
      <Space h="lg" />
      <Popular horizontal />
      <Space h={60} />
      <GenreList />
      <Space h={60} />
      <RecentFavorites />
      <Space h={60} />
      <RecentlyPlay />
    </div>
  );
});
