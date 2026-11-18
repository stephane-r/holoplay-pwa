import { playbackService } from "../services/playback";
import { usePlaybackService } from "../services/playback/usePlaybackService";
import type { Video } from "../types/interfaces/Video";

export const usePlayVideo = (videoId?: string) => {
  const { loadingVideoId } = usePlaybackService();

  const loading = videoId
    ? loadingVideoId === videoId
    : loadingVideoId !== null;

  const handlePlay = (id: string, queue?: Video[]) =>
    playbackService.play(id, queue);

  return {
    loading,
    handlePlay,
  };
};
