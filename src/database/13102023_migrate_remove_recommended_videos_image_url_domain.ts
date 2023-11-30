// @ts-nocheck
import { db } from ".";
import { Playlist } from "../types/interfaces/Playlist";
import { cleanVideoThumbnailsUrl } from "../utils/cleanVideoThumbnailsUrl";

const migration = () => {
  const favoritePlaylist = db.queryAll("playlists", {
    query: { title: "Favorites" },
  })[0] as Playlist;

  try {
    const updatedVideos = favoritePlaylist.videos?.map((video) => {
      if (video.videoThumbnails) {
        return cleanVideoThumbnailsUrl(video);
      }
      return video;
    });

    if (updatedVideos) {
      favoritePlaylist.videos = updatedVideos;

      db.update("playlists", { title: "Favorites" }, () => favoritePlaylist);
      db.commit();
    }
  } catch (error) {
    console.log(error);
  }
};

export default migration;
