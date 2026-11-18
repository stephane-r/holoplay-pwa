import { useState } from "react";

import { database } from "../services/database";
import { getPlaylist as getRemotePlaylist } from "../services/playlist";
import type { Video } from "../types/interfaces/Video";
import { notifyError } from "../utils/notify";
import { isLocalPlaylistId } from "../utils/playlistIdentity";
import { usePlayVideo } from "./usePlayVideo";

export const usePlayPlaylist = () => {
  const [loading, setLoading] = useState(false);
  const { handlePlay: play } = usePlayVideo();

  const handlePlay = async (playlistId: string | number) => {
    setLoading(true);

    try {
      const data = isLocalPlaylistId(playlistId)
        ? await database.getPlaylist(playlistId as number)
        : await getRemotePlaylist(playlistId as string);
      if (!data) {
        throw new Error("Playlist not found");
      }
      const [firstVideo] = data.videos as Video[];

      play(firstVideo.videoId, data.videos as Video[]);
    } catch {
      notifyError({
        title: "Error",
        message: "An error occurred while trying to play the playlist",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePlay,
  };
};
