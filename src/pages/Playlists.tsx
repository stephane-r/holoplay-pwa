import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { ModalCreatePlaylist } from "../components/ModalCreatePlaylist";
import { usePlaylists } from "../providers/Playlist";
import { CardList } from "../components/CardList";
import { Alert } from "@mantine/core";

export const PlaylistsPage = memo(() => {
  return (
    <div>
      <PageHeader title="Playlists" />
      <ModalCreatePlaylist />
      <PlaylistListContainer />
    </div>
  );
});

const PlaylistListContainer = memo(() => {
  const playlists = usePlaylists();

  if (!playlists.length) {
    return (
      <Alert title="But, why?" color="blue" radius="md">
        You have no playlists
      </Alert>
    );
  }

  return <CardList data={playlists as any} />;
});
