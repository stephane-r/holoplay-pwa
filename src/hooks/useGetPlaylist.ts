import { useCallback, useEffect, useState } from "react";

import { usePlaylists } from "../providers/Playlist";
import { queryClient } from "../queryClient";
import { getPlaylist } from "../services/playlist";
import type { Playlist } from "../types/interfaces/Playlist";
import { notifyError } from "../utils/notify";
import { isLocalPlaylistId } from "../utils/playlistIdentity";

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
        notifyError({ title: "Error", message: error.message });
      });
  };

  useEffect(() => {
    const isLocal = isLocalPlaylistId(playlistId);

    if (playlist && !isLocal) {
      return;
    }

    if (isLocal) {
      getLocalPlaylist(Number(playlistId));
    } else {
      getRemotePlaylist(playlistId as string);
    }
  }, [playlistId, playlist, getLocalPlaylist]);

  return { playlist, getLocalPlaylist, getRemotePlaylist };
};
