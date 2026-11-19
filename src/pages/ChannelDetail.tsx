import { Alert, LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { IconPlaylist, IconVideo } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

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
  // The channel name comes along as a query param from wherever this page
  // is linked from (ChannelCard, Player, DrawerPlayer — all already have
  // it in hand) so the title shows immediately, without waiting on
  // useGetChannel's own request — which also means the tabs below no
  // longer need to wait for it either: videos/playlists only ever needed
  // `authorId`, and used to sit blocked behind a title-only request.
  const [searchParams] = useSearchParams();
  const { channel, error } = useGetChannel(authorId as string);
  // Falls back to the error message only once there's truly nothing else
  // to show (no title param and the channel's own request also failed).
  const title =
    searchParams.get("title") ?? channel?.author ?? error?.message ?? "";
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={title} canGoBack />
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
  error: Error | null;
  isFetching: boolean;
  isLoadingMore: boolean;
  sentinelRef: (node: HTMLElement | null) => void;
}

const PaginatedCardList = memo(
  ({
    items,
    error,
    isFetching,
    isLoadingMore,
    sentinelRef,
  }: PaginatedCardListProps) => {
    const { t } = useTranslation();

    // The first page's own request can take a while, and CardList renders
    // nothing at all for an empty list — without this, the tab just sat
    // there blank until it resolved (or forever, if the request failed).
    if (items.length === 0 && isFetching) {
      return (
        <Paper
          mih={300}
          pos="relative"
          radius="md"
          style={{ overflow: "hidden" }}
        >
          <LoadingOverlay visible />
        </Paper>
      );
    }

    if (items.length === 0 && error) {
      return (
        <Alert title="Error" color="red" radius="md">
          {error.message}
        </Alert>
      );
    }

    // The request succeeded but the channel genuinely has no videos/
    // playlists (e.g. its /playlists endpoint returning an empty array) —
    // distinct from the loading/error cases above, which already returned.
    if (items.length === 0) {
      return (
        <Alert title={t("list.empty.title")} color="blue" radius="md">
          {t("list.empty.message")}
        </Alert>
      );
    }

    return (
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
    );
  },
);

const VideosTab = memo(() => {
  const { authorId } = useParams();

  const { items, error, isFetching, isLoadingMore, sentinelRef } =
    useInfiniteList<CardVideo, string>({
      queryKey: `channels-${authorId}-videos`,
      fetchPage: async (cursor) => {
        const { data, continuation } = await getChannelVideos(
          authorId as string,
          cursor,
        );
        return {
          items: data.map(formatedCardVideo),
          nextCursor: continuation,
        };
      },
    });

  return (
    <PaginatedCardList
      items={items}
      error={error}
      isFetching={isFetching}
      isLoadingMore={isLoadingMore}
      sentinelRef={sentinelRef}
    />
  );
});

const PlaylistsTab = memo(() => {
  const { authorId } = useParams();

  const { items, error, isFetching, isLoadingMore, sentinelRef } =
    useInfiniteList<CardPlaylist, string>({
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
      error={error}
      isFetching={isFetching}
      isLoadingMore={isLoadingMore}
      sentinelRef={sentinelRef}
    />
  );
});
