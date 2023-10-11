import { Alert, Tabs, Text } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useFavorite } from "../providers/Favorite";
import { CardList } from "./CardList";
import {
  IconHeart,
  IconPlayerRecord,
  IconPlaylist,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";
import { isLiveStream } from "./Card";

export const FavoritePlaylist = memo(() => {
  const favorite = useFavorite();
  const { t } = useTranslation();

  const data = favorite.videos;

  if (!data.length) {
    return (
      <Alert title={t("favorite.empty.title")} color="blue" radius="md">
        {t("favorite.empty.message")}
      </Alert>
    );
  }

  const videos = data.filter(
    (video) =>
      (video.type === "video" || video.type === "scheduled") &&
      video.lengthSeconds > 0
  );
  const livestream = data.filter((video) => isLiveStream(video));
  const playlists = data.filter((video) => video.type === "playlist");
  const channels = data.filter((video) => video.type === "channel");

  return (
    <Tabs defaultValue="all">
      <Tabs.List mb="lg">
        <Tabs.Tab value="all" icon={<IconHeart size={18} />}>
          {t("favorite.tab.all")}
        </Tabs.Tab>
        <Tabs.Tab value="videos" icon={<IconVideo size={18} />}>
          {t("favorite.tab.videos")} ({videos.length})
        </Tabs.Tab>
        <Tabs.Tab value="livestream" icon={<IconPlayerRecord size={18} />}>
          {t("favorite.tab.livestreams")} ({livestream.length})
        </Tabs.Tab>
        <Tabs.Tab value="playlists" icon={<IconPlaylist size={18} />}>
          {t("favorite.tab.playlists")} ({playlists.length})
        </Tabs.Tab>
        <Tabs.Tab value="channels" icon={<IconUser size={18} />}>
          {t("favorite.tab.channels")} ({channels.length})
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="all" pt="xs">
        <CardList data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="videos" pt="xs">
        {!videos.length ? <Empty /> : <CardList data={videos} />}
      </Tabs.Panel>
      <Tabs.Panel value="livestream" pt="xs">
        {!livestream.length ? <Empty /> : <CardList data={livestream} />}
      </Tabs.Panel>
      <Tabs.Panel value="playlists" pt="xs">
        {!playlists.length ? <Empty /> : <CardList data={playlists} />}
      </Tabs.Panel>
      <Tabs.Panel value="channels" pt="xs">
        {!channels.length ? <Empty /> : <CardList data={channels} />}
      </Tabs.Panel>
    </Tabs>
  );
});

const Empty = memo(() => {
  const { t } = useTranslation();

  return (
    <Alert title={t("favorite.empty.title")}>
      <Text>{t("favorite.tab.empty")}</Text>
    </Alert>
  );
});
