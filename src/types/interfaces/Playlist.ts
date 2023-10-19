import { Card, CardVideo } from "./Card";
import { Video } from "./Video";

export interface Playlist {
  type: "playlist";
  ID?: number;
  playlistId?: string;
  title: string;
  videos: Card[] | Video[];
  videoCount: number;
  playlistThumbnail: string;
}

export interface FavoritePlaylist extends Omit<Playlist, "videos" | "title"> {
  title: "Favorites";
  videos: Card[];
}
