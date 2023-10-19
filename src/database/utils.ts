import { db } from ".";
import { getCardId } from "../components/ButtonFavorite";
import { Card, CardPlaylist, CardVideo } from "../types/interfaces/Card";
import { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import { SearchHistory } from "../types/interfaces/Search";
import { Settings } from "../types/interfaces/Settings";

export const getSettings = (): Settings => {
  return db.queryAll("settings", { query: { ID: 1 } })[0];
};

export const getFavoritePlaylist = (): FavoritePlaylist => {
  return db.queryAll("playlists", { query: { title: "Favorites" } })[0];
};

const removeDuplicateVideoId = (cards: Card[]): Card[] => {
  return cards.filter(
    (value, index, self) =>
      index === self.findIndex((t) => getCardId(t) === getCardId(value)),
  );
};

export const importVideosToFavorites = (importedCards: Card[]): void => {
  db.update("playlists", { title: "Favorites" }, (raw: FavoritePlaylist) => ({
    ...raw,
    videos: removeDuplicateVideoId([...importedCards, ...raw.videos]),
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

export const getPlaylists = (): Playlist[] => {
  const favoritePlaylist = getFavoritePlaylist();
  return [
    ...db.queryAll("playlists", {
      query: (row: Playlist) => row.title !== "Favorites",
    }),
    ...favoritePlaylist.videos.filter((v) => v.type === "playlist"),
  ];
};

export const getAllPlaylists = (): CardPlaylist[] => {
  return db.queryAll("playlists");
};

export const getLocalPlaylists = (): CardPlaylist[] => {
  return db.queryAll("playlists", {
    query: (row: Playlist) => row.title !== "Favorites" && !row.playlistId,
  });
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
