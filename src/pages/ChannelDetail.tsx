import { LoadingOverlay, Paper, Tabs } from "@mantine/core";
import { IconPlaylist, IconVideo } from "@tabler/icons-react";
import { type FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { CardList } from "../components/CardList";
import { PageHeader } from "../components/PageHeader";
import { useGetChannel } from "../hooks/useGetChannel";
import { getChannelPlaylists, getChannelVideos } from "../services/channel";

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

interface PaginateDataListFetcherResponse {
  data: any;
  continuation: string | null;
}

interface PaginateDataListProps {
  queryKey: string;
  fetcher: () => Promise<PaginateDataListFetcherResponse>;
  onSuccess?: (data: PaginateDataListFetcherResponse) => void;
  hasNextPage?: boolean;
}

const PaginateDataList: FC<PaginateDataListProps> = memo(
  ({ queryKey, fetcher, onSuccess, hasNextPage }) => {
    const { ref, inView } = useInView();
    const [page, setPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [enabled, setEnabled] = useState(true);

    const { isFetching } = useQuery(`${queryKey}-${page}`, fetcher, {
      onSuccess: (data) => {
        setData((previousData) => [...previousData, ...data.data]);
        setPage((page) => page + 1);
        setEnabled(false);

        if (onSuccess) {
          onSuccess(data);
        }
      },
      enabled,
    });

    useEffect(() => {
      if (hasNextPage && inView) {
        setEnabled(true);
      }
    }, [inView, hasNextPage]);

    if (!data) {
      return <LoadingOverlay visible />;
    }

    return (
      <>
        <CardList data={data} />
        <button ref={ref} style={{ opacity: 0 }} />
        {isFetching && page > 1 ? (
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
  const [continuation, setContinuation] = useState<string | null>(null);

  const handleSuccess = (data: { data: any; continuation: string | null }) => {
    setContinuation(data.continuation);
  };

  return (
    <PaginateDataList
      queryKey={`channels-${authorId}-videos`}
      fetcher={() => getChannelVideos(authorId as string, continuation)}
      onSuccess={handleSuccess}
      hasNextPage={Boolean(continuation)}
    />
  );
});

const PlaylistsTab = memo(() => {
  const { authorId } = useParams();
  const [continuation, setContinuation] = useState<string | null>(null);

  const handleSuccess = (data: { data: any; continuation: string | null }) => {
    setContinuation(data.continuation);
  };

  return (
    <PaginateDataList
      queryKey={`channels-${authorId}-playlists`}
      fetcher={() => getChannelPlaylists(authorId as string, continuation)}
      onSuccess={handleSuccess}
      hasNextPage={Boolean(continuation)}
    />
  );
});
