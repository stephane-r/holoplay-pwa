import { db } from ".";
import { CardChannel, CardPlaylist, CardVideo } from "../types/interfaces/Card";
import { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import {
  formatedCardChannel,
  formatedCardPlaylist,
  formatedCardVideo,
  formatedPlaylistCardVideo,
} from "../utils/formatData";

const formatedPlaylists = () => {
  const playlists = db.queryAll("playlists") as Playlist[];

  return playlists.map((p) => {
    if ((p as FavoritePlaylist).title === "Favorites") {
      return {
        ...p,
        videos: (p as FavoritePlaylist).videos.map((card) => {
          switch (card.type) {
            case "channel":
              return formatedCardChannel(card as CardChannel);
            case "playlist":
              return formatedCardPlaylist(card as CardPlaylist);
            default:
              return formatedCardVideo(card as CardVideo);
          }
        }),
      };
    }

    const videos = p.videos.slice(0, 4);
    const formatedVideos = videos.map((video) =>
      formatedPlaylistCardVideo(video as CardVideo),
    );

    return {
      ...p,
      videos: formatedVideos,
    };
  });
};

const migration = () => {
  try {
    const playlists = formatedPlaylists();
    console.log(playlists);

    for (const playlist of playlists) {
      db.update("playlists", { title: playlist.title }, () => playlist);
    }

    db.commit();
  } catch (error) {
    console.log(error);
  }
};

export default migration;
