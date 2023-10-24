import type {
  CardChannel,
  CardPlaylist,
  CardPlaylistVideo,
  CardVideo,
  CardVideoTypes,
} from "../types/interfaces/Card";
import type { Channel } from "../types/interfaces/Channel";
import type { Playlist } from "../types/interfaces/Playlist";
import type {
  ThumbnailQualityTypes,
  Video,
  VideoThumbnail,
} from "../types/interfaces/Video";

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+\.+[^:/?\n]+)/gm;

export const getThumbnailQuality = (
  thumbnails: VideoThumbnail[],
  quality: ThumbnailQualityTypes,
) => {
  const thumbnail = thumbnails.find(
    (thumbnail) => thumbnail.quality === quality,
  );
  return thumbnail ? thumbnail.url.replace(DOMAIN_REGEX, "") : "";
};

export const formatedPlaylistCardVideo = (
  video: CardPlaylistVideo | CardVideo,
): CardPlaylistVideo => {
  if (video.thumbnail) {
    return video;
  }

  return {
    videoId: video.videoId,
    title: video.title,
    thumbnail:
      video.thumbnail ??
      getThumbnailQuality(video.videoThumbnails ?? [], "medium"),
  };
};

export const formatedCardPlaylist = (
  playlist: CardPlaylist | Playlist,
): CardPlaylist => {
  return {
    playlistId: playlist.playlistId,
    ID: playlist.ID,
    title: playlist.title,
    type: playlist.type ?? "playlist",
    videoCount: playlist.videoCount,
    // @ts-ignore
    videos: playlist.videos.map(formatedCardVideo),
  };
};

export const formatedCardChannel = (
  channel: CardChannel | Channel,
): CardChannel => {
  return {
    type: channel.type,
    author: channel.author,
    authorId: channel.authorId,
    description: channel.description,
    authorVerified: channel.authorVerified,
    videoCount: channel.videoCount,
    subCount: channel.subCount,
    thumbnail:
      channel.thumbnail ??
      channel.authorThumbnails
        ?.find((thumbnail) => thumbnail.width === 512)
        ?.url.replace(DOMAIN_REGEX, ""),
  };
};

export const formatedCardVideo = (video: CardVideo | Video): CardVideo => {
  return {
    videoId: video.videoId,
    title: video.title,
    thumbnail:
      video.thumbnail ??
      getThumbnailQuality(video.videoThumbnails ?? [], "medium"),
    liveNow: video.liveNow,
    lengthSeconds: video.lengthSeconds,
    type: video.type as CardVideoTypes,
  };
};
