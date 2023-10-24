import qs from "qs";

import type { Channel } from "../types/interfaces/Channel";
import type { Playlist } from "../types/interfaces/Playlist";
import type { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getChannel = async (authorId: string): Promise<Channel> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(`${apiUrl}/api/v1/channels/${authorId}`);
  return request.json();
};

interface VideosData {
  data: Video[];
  continuation: string | null;
}

export const getChannelVideos = async (
  authorId: string,
  continuation: string | null = null,
): Promise<VideosData> => {
  const apiUrl = getCurrentInstance().uri;
  const params = continuation
    ? {
        continuation,
      }
    : {};
  const request = await fetch(
    `${apiUrl}/api/v1/channels/${authorId}/videos?${qs.stringify(params)}`,
  );
  const data: {
    videos: Video[];
    continuation: string | null;
  } = await request.json();

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
  const apiUrl = getCurrentInstance().uri;
  const params = continuation
    ? {
        continuation,
      }
    : {};
  const request = await fetch(
    `${apiUrl}/api/v1/channels/${authorId}/playlists?${qs.stringify(params)}`,
  );
  const data: {
    playlists: Playlist[];
    continuation: string | null;
  } = await request.json();

  return {
    data: data.playlists,
    continuation: data.continuation,
  };
};
