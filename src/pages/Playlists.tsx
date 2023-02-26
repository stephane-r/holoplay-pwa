import { memo } from "react";
import { PlaylistList } from "../components/PlaylistList";
import { PageHeader } from "../components/PageHeader";
import { ModalCreatePlaylist } from "../components/ModalCreatePlaylist";
import { usePlaylists } from "../providers/Playlist";
import { CardList } from "../components/CardList";

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

  return <CardList data={playlists as any} />;
});
