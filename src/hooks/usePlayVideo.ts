import { showNotification } from "@mantine/notifications";
import { useState } from "react";

import { useSetHistory } from "../providers/History";
import {
  initialPlayerState,
  useSetPlayerState,
  useSetPlayerUrl,
  useSetPlayerVideo,
} from "../providers/Player";
import { useSettings } from "../providers/Settings";
import { database } from "../services/database";
import { playbackQueue } from "../services/playback";
import { getSponsorBlockSegments } from "../services/sponsor-block";
import { getVideo } from "../services/video";
import type { Video, VideoThumbnail } from "../types/interfaces/Video";
import { colorExtractor } from "../utils/colorExtractor";

const DEFAULT_PRIMARY_COLOR = {
  color: "#000",
  count: 1,
};

export const usePlayVideo = () => {
  const [loading, setLoading] = useState(false);
  const settings = useSettings();
  const setPlayerUrl = useSetPlayerUrl();
  const setPlayerVideo = useSetPlayerVideo();
  const setPlayerState = useSetPlayerState();
  const setHistory = useSetHistory();

  const handlePlay = async (videoId: string, queue?: Video[]) => {
    setLoading(true);

    try {
      const [sponsorBlockSegments, data] = await Promise.all([
        settings.sponsorBlock
          ? getSponsorBlockSegments(videoId)
          : { segments: null },
        getVideo(videoId),
      ]);

      if (!data.url) {
        throw new Error("No video url found");
      }

      const videoThumbnail = data.video.videoThumbnails.find(
        (thumbnail) => thumbnail.quality === "sddefault",
      ) as VideoThumbnail;

      let videoThumbnailUrl = videoThumbnail.url;

      if (videoThumbnail.url.startsWith("/")) {
        const currentSettings = await database.getSettings();
        videoThumbnailUrl = `${
          currentSettings?.currentInstance?.uri
        }${videoThumbnailUrl}`;
      }

      const colors = await colorExtractor
        .extractColor(videoThumbnailUrl)
        .catch(console.log);

      const lastVideoPlayed = await database.getLastVideoPlayed();
      if (lastVideoPlayed?.videoId !== videoId) {
        setHistory(data.video);
      }

      setPlayerUrl(data.url);
      setPlayerVideo({
        video: data.video,
        thumbnailUrl: videoThumbnailUrl,
        primaryColor: colors ? colors[0] : DEFAULT_PRIMARY_COLOR,
        sponsorBlockSegments: sponsorBlockSegments.segments,
      });
      setPlayerState((previousState) => ({
        ...initialPlayerState,
        repeat: previousState.repeat,
        volume: previousState.volume,
      }));

      if (queue) {
        playbackQueue.setQueue(queue, videoId);
      } else if (!playbackQueue.setCurrentVideoId(videoId)) {
        playbackQueue.setQueue(data.video.recommendedVideos, videoId);
      }
    } catch (error) {
      showNotification({
        title: "Error",
        // @ts-ignore
        message: error.message,
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
