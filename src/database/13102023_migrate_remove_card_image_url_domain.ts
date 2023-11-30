// @ts-nocheck
import { db } from ".";
import { Playlist } from "../types/interfaces/Playlist";

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+\.+[^:/?\n]+)/gm;

const migration = () => {
  const favoritePlaylist = db.queryAll("playlists", {
    query: { title: "Favorites" },
  })[0] as Playlist;

  try {
    const updatedVideos = favoritePlaylist.videos?.map((video) => {
      if (video.videoThumbnails) {
        return {
          ...video,
          videoThumbnails: video.videoThumbnails?.map((thumbnail) => ({
            ...thumbnail,
            url: thumbnail.url.replace(DOMAIN_REGEX, ""),
          })),
        };
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
