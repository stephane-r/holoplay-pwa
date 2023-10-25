import { Alert, LoadingOverlay, Text } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CardList } from "../components/CardList";
import { PageHeader } from "../components/PageHeader";
import { useGetPlaylist } from "../hooks/useGetPlaylist";
import { useIsLocalPlaylist } from "../hooks/useIsLocalPlaylist";
import type { CardVideo } from "../types/interfaces/Card";

export const PlaylistDetailPage = memo(() => {
  return (
    <div>
      <PageContainer />
    </div>
  );
});

const PageContainer = memo(() => {
  const { playlistId } = useIsLocalPlaylist();
  const { playlist } = useGetPlaylist(playlistId as string | number);
  const { t } = useTranslation();

  if (!playlist) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <PageHeader title={playlist.title} canGoBack />
      {playlist.videos.length === 0 ? (
        <Alert title={playlist.title}>
          <Text>
            <strong>{playlist.title}</strong> {t("is.empty")}
          </Text>
        </Alert>
      ) : (
        <CardList data={playlist.videos as CardVideo[]} />
      )}
    </>
  );
});
