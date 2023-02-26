import { Flex } from "@mantine/core";
import { memo } from "react";
import { usePlaylists } from "../providers/Playlist";
import { PlaylistCard } from "./PlaylistCard";

export const PlaylistList = memo(() => {
  const playlists = usePlaylists();

  return (
    <Flex gap={16}>
      {playlists.map((playlist) => (
        <PlaylistCard key={String(playlist.ID)} playlist={playlist} />
      ))}
    </Flex>
  );
});
