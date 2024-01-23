import { db } from ".";
import { getCardId } from "../components/ButtonFavorite";
import type { Card, CardPlaylist, CardVideo } from "../types/interfaces/Card";
import type { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import type { SearchHistory } from "../types/interfaces/Search";
import type { Settings } from "../types/interfaces/Settings";

export const getSettings = (): Settings => {
  const settings = db.queryAll("settings", { query: { ID: 1 } })[0];
  return {
    ...settings,
    devices: settings.devices ?? [],
  };
};

export const getFavoritePlaylist = (): FavoritePlaylist => {
  return db.queryAll("playlists", { query: { title: "Favorites" } })[0];
};

export const removeDuplicateVideoId = (cards: Card[]): Card[] => {
  return cards.filter(
    (value, index, self) =>
      index === self.findIndex((t) => getCardId(t) === getCardId(value)),
  );
};

export const importVideosToFavorites = (importedCards: Card[]): void => {
  db.update("playlists", { title: "Favorites" }, (raw: FavoritePlaylist) => ({
    ...raw,
    cards: removeDuplicateVideoId([...importedCards, ...(raw.cards ?? [])]),
  }));
  db.commit();
};

export const importPlaylist = (playlist: CardPlaylist): void => {
  db.insert("playlists", {
    createdAt: new Date().toISOString(),
    title: playlist.title,
    videos: playlist.videos,
    videoCount: playlist.videoCount,
    type: "playlist",
  });
  db.commit();
};

export const updatePlaylistVideos = (title: string, videos: CardVideo[]) => {
  db.update("playlists", { title }, (raw: Playlist) => ({
    ...raw,
    videos,
  }));
  db.commit();
};

export const getPlaylists = (): Playlist[] => {
  return db.queryAll("playlists", {
    query: (row: Playlist) => row.title !== "Favorites",
  });
};

export const getAllPlaylists = (): CardPlaylist[] => {
  return db.queryAll("playlists");
};

export const getPlaylist = (playlistId: number): Playlist => {
  return db.queryAll("playlists", { query: { ID: playlistId } })[0];
};

export const getVideosHistory = (): CardVideo[] => {
  return db.queryAll("history", {
    sort: [["ID", "DESC"]],
  });
};

export const getLastVideoPlayed = (): CardVideo => {
  return getVideosHistory()[0];
};

export const getSearchHistory = (): SearchHistory[] => {
  return db.queryAll("searchHistory", {
    sort: [["ID", "DESC"]],
    limit: 5,
  });
};
