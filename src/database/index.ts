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
    db.createTable("settings", ["createdAt", "currentInstance"]);

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

  return db;
};

export const db = initDb();
