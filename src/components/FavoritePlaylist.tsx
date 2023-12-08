import { Alert, Tabs, Text } from "@mantine/core";
import {
  IconHeart,
  IconPlayerRecord,
  IconPlaylist,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePaginateData } from "../hooks/usePaginateData";
import { useFavorite } from "../providers/Favorite";
import type { Card, CardVideo } from "../types/interfaces/Card";
import { CardList } from "./CardList";
import { isLiveStream } from "./VideoCard";

export const FavoritePlaylist = memo(() => {
  const favorite = useFavorite();
  const { t } = useTranslation();

  const data = favorite.cards;

  if (!data.length) {
    return (
      <Alert title={t("favorite.empty.title")} color="blue" radius="md">
        {t("favorite.empty.message")}
      </Alert>
    );
  }

  const videos = data.filter(
    (card) =>
      (card.type === "video" || card.type === "scheduled") &&
      card.lengthSeconds > 0,
  );
  const livestream = data.filter((card) => isLiveStream(card as CardVideo));
  const playlists = data.filter((card) => card.type === "playlist");
  const channels = data.filter((card) => card.type === "channel");

  return (
    <Tabs defaultValue="all">
      <Tabs.List mb="lg">
        <Tabs.Tab value="all" leftSection={<IconHeart size={18} />}>
          {t("favorite.tab.all")}
        </Tabs.Tab>
        <Tabs.Tab value="videos" leftSection={<IconVideo size={18} />}>
          {t("favorite.tab.videos")} ({videos.length})
        </Tabs.Tab>
        <Tabs.Tab
          value="livestream"
          leftSection={<IconPlayerRecord size={18} />}
        >
          {t("favorite.tab.livestreams")} ({livestream.length})
        </Tabs.Tab>
        <Tabs.Tab value="playlists" leftSection={<IconPlaylist size={18} />}>
          {t("favorite.tab.playlists")} ({playlists.length})
        </Tabs.Tab>
        <Tabs.Tab value="channels" leftSection={<IconUser size={18} />}>
          {t("favorite.tab.channels")} ({channels.length})
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="all" pt="xs">
        <DataList label="Favorites list" data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="videos" pt="xs">
        {!videos.length ? (
          <Empty />
        ) : (
          <DataList label="Favorites videos list" data={videos} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="livestream" pt="xs">
        {!livestream.length ? (
          <Empty />
        ) : (
          <DataList label="Favorites livestream list" data={livestream} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="playlists" pt="xs">
        {!playlists.length ? (
          <Empty />
        ) : (
          <DataList label="Favorites playlists list" data={playlists} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="channels" pt="xs">
        {!channels.length ? (
          <Empty />
        ) : (
          <DataList label="Favorites channels list" data={channels} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
});

interface DataListProps {
  data: Card[];
  label?: string;
}

const DataList: FC<DataListProps> = memo(({ label, data: initialData }) => {
  const { data, ref } = usePaginateData(initialData);

  return (
    <>
      <CardList label={label} data={data} />
      <button ref={ref} style={{ opacity: 0 }} />
    </>
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
