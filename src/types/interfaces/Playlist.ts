import { Video } from "./Video";

export interface Playlist {
  ID?: number;
  playlistId?: string;
  title: string;
  videos: Video[];
  videoCount: number;
  playlistThumbnail: string;
}
