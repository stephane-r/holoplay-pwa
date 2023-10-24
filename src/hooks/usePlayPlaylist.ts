import { notifications } from "@mantine/notifications";
import { useState } from "react";

import { getPlaylist as getLocalPlaylist } from "../database/utils";
import { getPlaylist as getRemotePlaylist } from "../services/playlist";
import type { Video } from "../types/interfaces/Video";
import { usePlayVideo } from "./usePlayVideo";

export const usePlayPlaylist = () => {
  const [loading, setLoading] = useState(false);
  const { handlePlay: play } = usePlayVideo();

  const handlePlay = async (playlistId: string | number) => {
    setLoading(true);

    try {
      const isLocalPlaylist = Number(playlistId);
      const data = isLocalPlaylist
        ? getLocalPlaylist(playlistId as number)
        : await getRemotePlaylist(playlistId as string);
      const [firstVideo] = data.videos as Video[];

      play(firstVideo.videoId, data.videos as Video[]);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while trying to play the playlist",
        color: "red",
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
