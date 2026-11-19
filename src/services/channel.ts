import qs from "qs";

import type { Channel } from "../types/interfaces/Channel";
import type { Playlist } from "../types/interfaces/Playlist";
import type { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getChannel = async (authorId: string): Promise<Channel> => {
  const apiUrl = (await getCurrentInstance()).uri;
  const request = await fetch(`${apiUrl}/api/v1/channels/${authorId}`);
  const data = await request.json();

  // Invidious responds with `{ error: "..." }` (and a non-2xx status) for
  // an invalid/unavailable channel rather than a Channel object — reading
  // it as one anyway silently produced a channel with every field
  // `undefined` instead of surfacing what actually went wrong.
  if (!request.ok) {
    throw new Error(
      data.error ?? `Failed to load channel (${request.status})`,
    );
  }

  return data;
};

interface VideosData {
  data: Video[];
  continuation: string | null;
}

export const getChannelVideos = async (
  authorId: string,
  continuation: string | null = null,
): Promise<VideosData> => {
  const apiUrl = (await getCurrentInstance()).uri;
  const params = continuation
    ? {
        continuation,
      }
    : {};
  const request = await fetch(
    `${apiUrl}/api/v1/channels/${authorId}/videos?${qs.stringify(params)}`,
  );
  const data = await request.json();

  if (!request.ok) {
    throw new Error(
      data.error ?? `Failed to load channel videos (${request.status})`,
    );
  }

  return {
    data: data.videos,
    continuation: data.continuation,
  };
};

interface PlaylistsData {
  data: Playlist[];
  continuation: string | null;
}

export const getChannelPlaylists = async (
  authorId: string,
  continuation: string | null = null,
): Promise<PlaylistsData> => {
  const apiUrl = (await getCurrentInstance()).uri;
  const params = continuation
    ? {
        continuation,
      }
    : {};
  const request = await fetch(
    `${apiUrl}/api/v1/channels/${authorId}/playlists?${qs.stringify(params)}`,
  );
  const data = await request.json();

  if (!request.ok) {
    throw new Error(
      data.error ?? `Failed to load channel playlists (${request.status})`,
    );
  }

  return {
    data: data.playlists,
    continuation: data.continuation,
  };
};
