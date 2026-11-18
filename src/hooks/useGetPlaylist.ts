import { useEffect, useState } from "react";

import { usePlaylists } from "../providers/Playlist";
import { queryClient } from "../queryClient";
import { getPlaylist } from "../services/playlist";
import type { Playlist } from "../types/interfaces/Playlist";
import { notifyError } from "../utils/notify";
import { isLocalPlaylistId } from "../utils/playlistIdentity";

export const useGetPlaylist = (playlistId: string | number) => {
  const playlists = usePlaylists();
  const isLocal = isLocalPlaylistId(playlistId);
  // Derived directly from the already-loaded `playlists` list — no fetch
  // involved, so no need to round-trip it through an effect + state.
  const localPlaylist = isLocal
    ? ((playlists.find((p) => p.ID === Number(playlistId)) as Playlist) ??
      null)
    : null;
  const [remotePlaylist, setRemotePlaylist] = useState<Playlist | null>(null);

  const getRemotePlaylist = (id: string) => {
    queryClient
      .fetchQuery(`playlist-${id}`, () => getPlaylist(id))
      .then((playlist) => setRemotePlaylist(playlist))
      .catch((error) => {
        notifyError({ title: "Error", message: error.message });
      });
  };

  useEffect(() => {
    if (!isLocal && !remotePlaylist) {
      getRemotePlaylist(playlistId as string);
    }
  }, [playlistId, isLocal, remotePlaylist]);

  return { playlist: localPlaylist ?? remotePlaylist, getRemotePlaylist };
};
