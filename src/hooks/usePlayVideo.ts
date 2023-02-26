import { useState } from "react";
import { getSettings } from "../database/utils";
import { useSetPlayerUrl, useSetPlayerVideo } from "../providers/Player";
import { useSetPlayerPlaylist } from "../providers/PlayerPlaylist";
import { getVideo } from "../services/video";
import { VideoThumbnail } from "../types/interfaces/Video";
import { colorExtractor } from "../utils/colorExtractor";
import { useResolveVideosPlaylist } from "./useResolveVideosPlaylist";

export const usePlayVideo = () => {
  const [loading, setLoading] = useState(false);
  const setPlayerUrl = useSetPlayerUrl();
  const setPlayerVideo = useSetPlayerVideo();
  const getVideosPlaylist = useResolveVideosPlaylist();
  const setPlayerPlaylist = useSetPlayerPlaylist();

  const handlePlay = async (videoId: string) => {
    setLoading(true);

    try {
      const data = await getVideo(videoId);
      const videoThumbnail = data.video.videoThumbnails.find(
        (thumbnail) => thumbnail.quality === "sddefault"
      ) as VideoThumbnail;

      let videoThumbnailUrl = videoThumbnail.url;

      if (videoThumbnail.url.startsWith("/")) {
        videoThumbnailUrl = `${
          getSettings().currentInstance?.uri
        }${videoThumbnailUrl}`;
      }

      const colors = await colorExtractor
        .extractColor(videoThumbnailUrl)
        .catch(console.log);

      setPlayerUrl(data.url);
      setPlayerVideo({
        video: data.video,
        thumbnailUrl: videoThumbnailUrl,
        primaryColor: colors
          ? colors[0]
          : {
              color: "#000",
              count: 1,
            },
      });
      setPlayerPlaylist(getVideosPlaylist() ?? data.video.recommendedVideos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePlay,
  };
};
