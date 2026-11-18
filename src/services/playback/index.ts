import type { Video } from "../../types/interfaces/Video";

type Listener = () => void;

interface QueueSnapshot {
  queue: Video[];
  currentVideoId: string | null;
  previousVideoId: string | null;
  nextVideoId: string | null;
}

const EMPTY_SNAPSHOT: QueueSnapshot = {
  queue: [],
  currentVideoId: null,
  previousVideoId: null,
  nextVideoId: null,
};

class PlaybackQueueService {
  private snapshot: QueueSnapshot = EMPTY_SNAPSHOT;
  private listeners = new Set<Listener>();

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
    this.commit(queue, currentVideoId);
  }

  /**
   * Move within the existing queue (Next/Previous, or "ended" auto-advance) —
   * does not touch the queue itself. Returns false if `videoId` isn't
   * actually in the current queue, so the caller can fall back (see
   * usePlayVideo).
   */
  setCurrentVideoId(videoId: string): boolean {
    if (!this.snapshot.queue.some((video) => video.videoId === videoId)) {
      return false;
    }
    this.commit(this.snapshot.queue, videoId);
    return true;
  }

  isInQueue(videoId: string) {
    return this.snapshot.queue.some((video) => video.videoId === videoId);
  }

  private commit(queue: Video[], currentVideoId: string) {
    const index = queue.findIndex((video) => video.videoId === currentVideoId);
    this.snapshot = {
      queue,
      currentVideoId,
      previousVideoId: queue[index - 1]?.videoId ?? null,
      nextVideoId: queue[index + 1]?.videoId ?? null,
    };
    this.listeners.forEach((listener) => listener());
  }
}

export const playbackQueue = new PlaybackQueueService();
