import { db } from ".";

const migration = () => {
  try {
    if (!db.columnExists("playlists", "cards")) {
      db.alterTable("playlists", "cards", []);
      db.commit();
    }

    const favoritePlaylist = db.queryAll("playlists", {
      query: { title: "Favorites" },
    })[0];

    favoritePlaylist.cards = favoritePlaylist.videos;
    delete favoritePlaylist.videos;

    db.update("playlists", { title: "Favorites" }, () => ({
      ...favoritePlaylist,
      videos: [],
    }));
    db.commit();
  } catch (error) {
    console.log(error);
  }
};

export default migration;
