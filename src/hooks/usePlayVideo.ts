import { useState } from "react";
import { getLastVideoPlayed, getSettings } from "../database/utils";
import { useSetHistory } from "../providers/History";
import { useSetPlayerUrl, useSetPlayerVideo } from "../providers/Player";
import { useSetPlayerPlaylist } from "../providers/PlayerPlaylist";
import { useSetPreviousNextVideos } from "../providers/PreviousNextTrack";
import { getVideo } from "../services/video";
import { Video, VideoThumbnail } from "../types/interfaces/Video";
import { colorExtractor } from "../utils/colorExtractor";
import { useResolveVideosPlaylist } from "./useResolveVideosPlaylist";

const DEFAULT_PRIMARY_COLOR = {
  color: "#000",
  count: 1,
};

const getPreviousAndNextVideoId = (videos: Video[], videoId: string) => {
  const currentVideoIndex = videos.findIndex(
    (video) => video.videoId === videoId
  );
  const previousVideoId = videos[currentVideoIndex - 1]?.videoId ?? null;
  const nextVideoId = videos[currentVideoIndex + 1]?.videoId ?? null;

  return {
    videosIds: {
      previousVideoId,
      nextVideoId,
    },
  };
};

export const usePlayVideo = () => {
  const [loading, setLoading] = useState(false);
  const setPlayerUrl = useSetPlayerUrl();
  const setPlayerVideo = useSetPlayerVideo();
  const getVideosPlaylist = useResolveVideosPlaylist();
  const setPlayerPlaylist = useSetPlayerPlaylist();
  const setPreviousNextVideos = useSetPreviousNextVideos();
  const setHistory = useSetHistory();

  const handlePlay = async (
    videoId: string,
    playerPlaylist: Video[] | null = null
  ) => {
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

      if (getLastVideoPlayed()?.videoId !== videoId) {
        setHistory(data.video);
      }

      setPlayerUrl(data.url);
      setPlayerVideo({
        video: data.video,
        thumbnailUrl: videoThumbnailUrl,
        primaryColor: colors ? colors[0] : DEFAULT_PRIMARY_COLOR,
      });

      const videosPlaylist =
        playerPlaylist ?? getVideosPlaylist() ?? data.video.recommendedVideos;

      setPlayerPlaylist(videosPlaylist);

      setPreviousNextVideos(getPreviousAndNextVideoId(videosPlaylist, videoId));
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
