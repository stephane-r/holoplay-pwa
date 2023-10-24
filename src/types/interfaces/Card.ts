import type { VideoThumbnail as Thumbnail } from "./Video";

export type CardVideoTypes = "video" | "livestream" | "scheduled";

export interface CardVideo {
  type: CardVideoTypes;
  videoId: string;
  title: string;
  thumbnail: string;
  liveNow: boolean;
  lengthSeconds: number;
  videoThumbnails?: Thumbnail[];
}

export interface CardChannel {
  type: "channel";
  author: string;
  authorId: string;
  authorVerified: boolean;
  videoCount: number;
  description: string;
  subCount: number;
  thumbnail: string;
  authorThumbnails?: Thumbnail[];
}

export interface CardPlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  videoThumbnails?: Thumbnail[];
}

export interface CardPlaylist {
  type: "playlist";
  playlistId?: string;
  ID?: number;
  title: string;
  videoCount: number;
  videos: CardVideo[];
}

export type Card = CardVideo | CardPlaylist | CardChannel;
