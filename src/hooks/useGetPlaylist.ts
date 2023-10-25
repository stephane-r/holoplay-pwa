import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";

import { usePlaylists } from "../providers/Playlist";
import { queryClient } from "../queryClient";
import { getPlaylist } from "../services/playlist";
import type { Playlist } from "../types/interfaces/Playlist";

export const useGetPlaylist = (playlistId: string | number) => {
  const playlists = usePlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const getLocalPlaylist = useCallback(
    (id: number) => {
      setPlaylist(playlists.find((p) => p.ID === id) as Playlist);
    },
    [playlists],
  );

  const getRemotePlaylist = (id: string) => {
    queryClient
      .fetchQuery(`playlist-${id}`, () => getPlaylist(id))
      .then((playlist) => setPlaylist(playlist))
      .catch((error) => {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "red",
        });
      });
  };

  useEffect(() => {
    const isLocalPlaylist = Number(playlistId);

    if (playlist && !isLocalPlaylist) {
      return;
    }

    if (isLocalPlaylist) {
      getLocalPlaylist(Number(playlistId));
    } else {
      getRemotePlaylist(playlistId as string);
    }
  }, [playlistId, playlist, getLocalPlaylist]);

  return { playlist, getLocalPlaylist, getRemotePlaylist };
};
