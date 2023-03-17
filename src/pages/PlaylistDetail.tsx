import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { Alert, LoadingOverlay, Text } from "@mantine/core";
import { CardList } from "../components/CardList";
import { useIsLocalPlaylist } from "../hooks/useIsLocalPlaylist";
import { useGetPlaylist } from "../hooks/useGetPlaylist";
import { useTranslation } from "react-i18next";

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
        <CardList data={playlist.videos} />
      )}
    </>
  );
});
