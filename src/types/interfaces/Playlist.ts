import type { Card } from "./Card";
import type { Video } from "./Video";

export interface Playlist {
  type: "playlist";
  ID?: number;
  playlistId?: string;
  title: string;
  videos: Card[] | Video[];
  videoCount: number;
  playlistThumbnail: string;
}

export interface FavoritePlaylist extends Omit<Playlist, "title"> {
  title: "Favorites";
  cards: Card[];
}
