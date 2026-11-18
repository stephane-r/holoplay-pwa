import { showNotification } from "@mantine/notifications";

import { database } from "../database";
import { getSponsorBlockSegments } from "../sponsor-block";
import { getVideo } from "../video";
import type { SponsorBlockSegment } from "../../types/interfaces/SponsorBlock";
import type {
  ThumbnailQualityTypes,
  Video,
  VideoThumbnail,
} from "../../types/interfaces/Video";
import { colorExtractor, type ColorInfo } from "../../utils/colorExtractor";
import { formatedCardVideo } from "../../utils/formatData";

// Not every video actually has every quality (short videos, some live
// streams, and some instances can omit "sddefault"). Try a few reasonable
// qualities in order before giving up, instead of assuming the first one
// always exists.
const THUMBNAIL_QUALITY_PRIORITY: ThumbnailQualityTypes[] = [
  "sddefault",
  "high",
  "medium",
  "default",
];

const pickThumbnail = (
  thumbnails: VideoThumbnail[],
): VideoThumbnail | undefined => {
  for (const quality of THUMBNAIL_QUALITY_PRIORITY) {
    const thumbnail = thumbnails.find((t) => t.quality === quality);
    if (thumbnail) return thumbnail;
  }
  return thumbnails[0];
};

type Listener = () => void;

export interface PlayerVideo {
  video: Video | null;
  sponsorBlockSegments: SponsorBlockSegment[] | null;
  thumbnailUrl: string | null;
  primaryColor: ColorInfo | null;
}

export const initialPlayerVideoState: PlayerVideo = {
  video: null,
  sponsorBlockSegments: null,
  thumbnailUrl: null,
  primaryColor: null,
};

const DEFAULT_PRIMARY_COLOR = {
  color: "#000",
  count: 1,
};

interface PlaybackSnapshot {
  queue: Video[];
  currentVideoId: string | null;
  previousVideoId: string | null;
  nextVideoId: string | null;
  loadingVideoId: string | null;
  video: PlayerVideo | null;
  url: string | null;
}

const EMPTY_SNAPSHOT: PlaybackSnapshot = {
  queue: [],
  currentVideoId: null,
  previousVideoId: null,
  nextVideoId: null,
  loadingVideoId: null,
  video: null,
  url: null,
};

class PlaybackService {
  private snapshot: PlaybackSnapshot = EMPTY_SNAPSHOT;
  private listeners = new Set<Listener>();
  private playToken = 0;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.snapshot;

  /**
   * Replace the queue outright — called when the user starts playing from a
   * specific list (search results, a playlist, a channel's videos, etc).
   */
  setQueue(queue: Video[], currentVideoId: string) {
    this.commit({ queue, currentVideoId });
  }

  isInQueue(videoId: string) {
    return this.snapshot.queue.some((video) => video.videoId === videoId);
  }

  /**
   * Fetch and load a video, then commit it as the current one. If `queue` is
   * given, it replaces the current queue outright; otherwise, if `videoId`
   * is already in the current queue, playback just moves position within
   * it; failing that, falls back to the video's own recommendations.
   *
   * A monotonic token ensures a newer call always wins over a slower, older
   * one still in flight — fixes the out-of-order-response race where two
   * overlapping play() calls could otherwise let a stale response overwrite
   * a newer one.
   */
  play = async (videoId: string, queue?: Video[]) => {
    const token = ++this.playToken;
    this.commit({ loadingVideoId: videoId });

    try {
      const settings = await database.getSettings();
      const [sponsorBlockSegments, data] = await Promise.all([
        settings?.sponsorBlock
          ? getSponsorBlockSegments(videoId)
          : { segments: null },
        getVideo(videoId),
      ]);

      if (token !== this.playToken) return;
      if (!data.url) {
        throw new Error("No video url found");
      }

      const videoThumbnail = pickThumbnail(data.video.videoThumbnails ?? []);

      let videoThumbnailUrl = videoThumbnail?.url ?? null;
      if (videoThumbnailUrl?.startsWith("/")) {
        videoThumbnailUrl = `${settings?.currentInstance?.uri}${videoThumbnailUrl}`;
      }

      const colors = videoThumbnailUrl
        ? await colorExtractor.extractColor(videoThumbnailUrl).catch(console.log)
        : null;

      if (token !== this.playToken) return;

      const lastVideoPlayed = await database.getLastVideoPlayed();
      if (lastVideoPlayed?.videoId !== videoId) {
        database.addToHistory(formatedCardVideo(data.video));
      }

      const resolvedQueue =
        queue ??
        (this.isInQueue(videoId)
          ? this.snapshot.queue
          : data.video.recommendedVideos);

      this.commit({
        queue: resolvedQueue,
        currentVideoId: videoId,
        loadingVideoId: null,
        video: {
          video: data.video,
          thumbnailUrl: videoThumbnailUrl,
          primaryColor: colors ? colors[0] : DEFAULT_PRIMARY_COLOR,
          sponsorBlockSegments: sponsorBlockSegments.segments,
        },
        url: data.url,
      });
    } catch (error) {
      if (token !== this.playToken) return;
      this.commit({ loadingVideoId: null });
      showNotification({
        title: "Error",
        message: (error as Error).message,
        color: "red",
      });
    }
  };

  private commit(partial: Partial<PlaybackSnapshot>) {
    const merged = { ...this.snapshot, ...partial };
    const index = merged.queue.findIndex(
      (video) => video.videoId === merged.currentVideoId,
    );
    this.snapshot = {
      ...merged,
      previousVideoId: merged.queue[index - 1]?.videoId ?? null,
      nextVideoId: merged.queue[index + 1]?.videoId ?? null,
    };
    this.listeners.forEach((listener) => listener());
  }
}

export const playbackService = new PlaybackService();
