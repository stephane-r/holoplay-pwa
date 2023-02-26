import { memo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { getPlaylist as getLocalPlaylist } from "../database/utils";
import { LoadingOverlay, Text } from "@mantine/core";
import { CardList } from "../components/CardList";
import { Playlist } from "../types/interfaces/Playlist";
import { useQuery } from "react-query";
import { getPlaylist as getRemotePlaylist } from "../services/playlist";

export const PlaylistDetailPage = memo(() => {
  return (
    <div>
      <PageContainer />
    </div>
  );
});

const PageContainer = memo(() => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const isLocalPlaylist = Number(playlistId);
  const [remotePlaylist, setRemotePlaylist] = useState<null | Playlist>(null);
  const playlist = isLocalPlaylist
    ? getLocalPlaylist(Number(playlistId))
    : remotePlaylist;

  useQuery(
    `playlist-${playlistId}`,
    () => getRemotePlaylist(playlistId as string),
    {
      onSuccess: setRemotePlaylist,
    }
  );

  if (!playlist) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <PageHeader title={playlist?.title} canGoBack />
      {playlist.videos.length === 0 ? (
        <Text>Playlist is empty</Text>
      ) : (
        <CardList data={playlist.videos} />
      )}
    </>
  );
});
