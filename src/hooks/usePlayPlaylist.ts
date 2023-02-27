import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { getPlaylist } from "../services/playlist";
import { usePlayVideo } from "./usePlayVideo";

export const usePlayPlaylist = () => {
  const [loading, setLoading] = useState(false);
  const { handlePlay: play } = usePlayVideo();

  const handlePlay = async (playlistId: string) => {
    setLoading(true);

    try {
      const data = await getPlaylist(playlistId);
      const [firstVideo] = data.videos;
      play(firstVideo.videoId, data.videos);
    } catch (error) {
      showNotification({
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
