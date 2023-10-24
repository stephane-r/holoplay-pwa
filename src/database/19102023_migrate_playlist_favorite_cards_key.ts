import { db } from ".";

const migration = () => {
  try {
    const favoritePlaylist = db.queryAll("playlists", {
      query: { title: "Favorites" },
    })[0];

    favoritePlaylist.cards = favoritePlaylist.videos;
    delete favoritePlaylist.videos;

    db.update("playlists", { title: "Favorites" }, () => favoritePlaylist);
    db.commit();
  } catch (error) {
    console.log(error);
  }
};

export default migration;
