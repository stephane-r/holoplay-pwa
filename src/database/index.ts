// @ts-ignore
import localStorageDB from "localstoragedb";

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
      "customInstances",
    ]);

    db.insert("playlists", {
      createdAt: new Date().toISOString(),
      title: "Favorites",
      videos: [],
    });
    db.insert("settings", {
      createdAt: new Date().toISOString(),
      currentInstance: null,
      defaultInstance: null,
      customInstances: [],
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
    db.alterTable("settings", "defaultInstance");
    db.commit();
  }

  if (!db.columnExists("settings", "customInstances")) {
    db.alterTable("settings", "customInstances");
    db.commit();
  }

  return db;
};

export const db = initDb();
