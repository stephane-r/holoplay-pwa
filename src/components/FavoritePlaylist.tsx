import { Alert, Tabs } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useFavorite } from "../providers/Favorite";
import { CardList } from "./CardList";
import {
  IconHeart,
  IconPlaylist,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";

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

  const videos = data.filter((video) => video.type === "video");
  const playlists = data.filter((video) => video.type === "playlist");
  const channels = data.filter((video) => video.type === "channel");

  return (
    <Tabs defaultValue="all">
      <Tabs.List mb="lg">
        <Tabs.Tab value="all" icon={<IconHeart size={18} />}>
          All
        </Tabs.Tab>
        <Tabs.Tab value="videos" icon={<IconVideo size={18} />}>
          Videos ({videos.length})
        </Tabs.Tab>
        <Tabs.Tab value="playlists" icon={<IconPlaylist size={18} />}>
          Playlists ({playlists.length})
        </Tabs.Tab>
        <Tabs.Tab value="channels" icon={<IconUser size={18} />}>
          Channels ({channels.length})
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="all" pt="xs">
        <CardList data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="videos" pt="xs">
        <CardList data={data.filter((video) => video.type === "video")} />
      </Tabs.Panel>
      <Tabs.Panel value="playlists" pt="xs">
        <CardList data={data.filter((video) => video.type === "playlist")} />
      </Tabs.Panel>
      <Tabs.Panel value="channels" pt="xs">
        <CardList data={data.filter((video) => video.type === "channel")} />
      </Tabs.Panel>
    </Tabs>
  );
});
