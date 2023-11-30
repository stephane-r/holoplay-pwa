import { db } from ".";
import type {
  CardChannel,
  CardPlaylist,
  CardVideo,
} from "../types/interfaces/Card";
import type { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import {
  formatedCardChannel,
  formatedCardPlaylist,
  formatedCardVideo,
  formatedPlaylistCardVideo,
} from "../utils/formatData";

const formatedPlaylists = () => {
  if (!db.columnExists("playlists", "cards")) {
    db.alterTable("history", "thumbnail", "");
    db.commit();
  }

  const playlists = db.queryAll("playlists") as Playlist[];
  const history = db.queryAll("history") as CardVideo[];

  const updatedPlaylists =
    playlists.map((p) => {
      if ((p as FavoritePlaylist).title === "Favorites") {
        return {
          ...p,
          videos: (p as FavoritePlaylist).videos?.map((card) => {
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
    }) ?? null;

  const updatedHistory = history.map((v) => formatedCardVideo(v)) ?? null;

  return {
    playlists: updatedPlaylists,
    history: updatedHistory,
  };
};

const migration = () => {
  try {
    const { playlists, history } = formatedPlaylists();

    if (playlists) {
      for (const playlist of playlists) {
        db.update("playlists", { title: playlist.title }, () => playlist);
      }
    }

    if (history) {
      for (const video of history) {
        db.update("history", () => video);
      }
    }

    db.commit();
  } catch (error) {
    console.log(error);
  }
};

export default migration;
