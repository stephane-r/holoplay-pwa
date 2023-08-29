type QualityTypes =
  | "maxres"
  | "maxresdefault"
  | "sddefault"
  | "high"
  | "medium"
  | "default"
  | "start"
  | "middle"
  | "end";

type VideoTypes = "video" | "playlist" | "channel" | "scheduled" | "livestream";

export interface VideoThumbnail {
  width: number;
  height: number;
  quality: QualityTypes;
  url: string;
}

export interface AdaptiveFormat {
  audioChannels: number;
  audioQuality: string;
  audioSampleRate: number;
  bitrate: string;
  clen: string;
  container: string;
  encoding: string;
  fps: number;
  index: string;
  init: string;
  itag: string;
  lmt: string;
  projectionType: string;
  type: string;
  url: string;
}

export interface Video {
  videoId: string;
  title: string;
  type: VideoTypes;
  adaptiveFormats: AdaptiveFormat[];
  videoThumbnails: VideoThumbnail[];
  recommendedVideos: Video[];
  allowRatings: boolean;
  author: string;
  authorId: string;
  description: string;
  descriptionHtml: string;
  genre: string;
  genreUrl?: string;
  isFamilyFriendly: boolean;
  isListed: boolean;
  isUpcoming: boolean;
  liveNow: boolean;
  likeCount: number;
  viewCount: number;
  lengthSeconds: number;
}
