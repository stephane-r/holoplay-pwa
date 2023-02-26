import { db } from ".";
import { Playlist } from "../types/interfaces/Playlist";
import { Settings } from "../types/interfaces/Settings";

export const getSettings = (): Settings => {
  return db.queryAll("settings", { query: { ID: 1 } })[0];
};

export const getFavoritePlaylist = (): Playlist => {
  return db.queryAll("playlists", { query: { title: "Favorites" } })[0];
};

export const getPlaylists = (): Playlist[] => {
  return db.queryAll("playlists", {
    query: (row: Playlist) => row.title !== "Favorites",
  });
};

export const getLocalPlaylists = (): Playlist[] => {
  return db.queryAll("playlists", {
    query: (row: Playlist) => row.title !== "Favorites" && !row.playlistId,
  });
};

export const getPlaylist = (playlistId: number): Playlist => {
  return db.queryAll("playlists", { query: { ID: playlistId } })[0];
};
