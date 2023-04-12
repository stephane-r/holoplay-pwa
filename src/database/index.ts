// @ts-ignore
import localStorageDB from "localstoragedb";
import { getSettings } from "./utils";
import { Settings } from "../types/interfaces/Settings";

const initDb = () => {
  const db = new localStorageDB("library", localStorage);

  if (db.isNew()) {
    db.createTable("playlists", [
      "playlistId",
      "createdAt",
      "title",
      "videos",
      "videoCount",
      "type",
    ]);
    db.createTable("settings", [
      "createdAt",
      "currentInstance",
      "defaultInstance",
    ]);

    db.insert("playlists", {
      createdAt: new Date().toISOString(),
      title: "Favorites",
      videos: [],
    });
    db.insert("settings", {
      createdAt: new Date().toISOString(),
      currentInstance: null,
    });

    db.commit();
  }

  if (!db.tableExists("history")) {
    db.createTable("history", [
      "videoThumbnails",
      "description",
      "formatStreams",
      "lengthSeconds",
      "title",
      "type",
      "videoId",
      "videoThumbnails",
    ]);
  }

  if (!db.tableExists("searchHistory")) {
    db.createTable("searchHistory", ["createdAt", "term"]);
  }

  if (!db.columnExists("settings", "defaultInstance")) {
    db.alterTable("settings", "defaultInstance", null);
    db.commit();
  }

  return db;
};

export const db = initDb();
