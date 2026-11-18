import { LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { IconPlaylist, IconVideo } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { CardList } from "../components/CardList";
import { PageHeader } from "../components/PageHeader";
import { useGetChannel } from "../hooks/useGetChannel";
import { useInfiniteList } from "../hooks/useInfiniteList";
import { getChannelPlaylists, getChannelVideos } from "../services/channel";
import type { CardPlaylist, CardVideo } from "../types/interfaces/Card";
import { formatedCardPlaylist, formatedCardVideo } from "../utils/formatData";

export const ChannelDetailPage = memo(() => {
  return <PageContainer />;
});

const PageContainer = memo(() => {
  const { authorId } = useParams();
  const { channel } = useGetChannel(authorId as string);
  const { t } = useTranslation();

  if (!channel) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <PageHeader title={channel.author} canGoBack />
      <Tabs defaultValue="videos">
        <Tabs.List mb="lg">
          <Tabs.Tab leftSection={<IconVideo size={18} />} value="videos">
            {t("search.filter.type.videos")}
          </Tabs.Tab>
          <Tabs.Tab value="playlists" leftSection={<IconPlaylist size={18} />}>
            {t("search.filter.type.playlists")}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="videos" pt="xs">
          <VideosTab />
        </Tabs.Panel>
        <Tabs.Panel value="playlists" pt="xs">
          <PlaylistsTab />
        </Tabs.Panel>
      </Tabs>
    </>
  );
});

interface PaginatedCardListProps {
  items: (CardVideo | CardPlaylist)[];
  isLoadingMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
}

const PaginatedCardList = memo(
  ({ items, isLoadingMore, sentinelRef }: PaginatedCardListProps) => (
    <>
      <CardList data={items} />
      <button ref={sentinelRef} style={{ opacity: 0 }} />
      {isLoadingMore ? (
        <Paper
          h={100}
          pos="relative"
          radius="md"
          style={{ overflow: "hidden" }}
        >
          <LoadingOverlay visible />
        </Paper>
      ) : null}
    </>
  ),
);

const VideosTab = memo(() => {
  const { authorId } = useParams();

  const { items, isLoadingMore, sentinelRef } = useInfiniteList<
    CardVideo,
    string
  >({
    queryKey: `channels-${authorId}-videos`,
    fetchPage: async (cursor) => {
      const { data, continuation } = await getChannelVideos(
        authorId as string,
        cursor,
      );
      return { items: data.map(formatedCardVideo), nextCursor: continuation };
    },
  });

  return (
    <PaginatedCardList
      items={items}
      isLoadingMore={isLoadingMore}
      sentinelRef={sentinelRef}
    />
  );
});

const PlaylistsTab = memo(() => {
  const { authorId } = useParams();

  const { items, isLoadingMore, sentinelRef } = useInfiniteList<
    CardPlaylist,
    string
  >({
    queryKey: `channels-${authorId}-playlists`,
    fetchPage: async (cursor) => {
      const { data, continuation } = await getChannelPlaylists(
        authorId as string,
        cursor,
      );
      return {
        items: data.map(formatedCardPlaylist),
        nextCursor: continuation,
      };
    },
  });

  return (
    <PaginatedCardList
      items={items}
      isLoadingMore={isLoadingMore}
      sentinelRef={sentinelRef}
    />
  );
});
