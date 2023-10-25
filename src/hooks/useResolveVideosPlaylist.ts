import { useLocation } from "react-router-dom";

import {
  getFavoritePlaylist,
  getPlaylist as getLocalPlaylist,
} from "../database/utils";
import { queryClient } from "../queryClient";
import type { Playlist } from "../types/interfaces/Playlist";
import type { Video } from "../types/interfaces/Video";

export const useResolveVideosPlaylist = () => {
  const location = useLocation();

  const getVideosPlaylist = () => {
    let videos: Video[] | null = null;

    if (location.pathname.includes("/playlists/")) {
      const [, , playlistId] = window.location.pathname.split("/");
      const isLocalPlaylist = Number(playlistId);

      if (isLocalPlaylist) {
        videos = getLocalPlaylist(Number(playlistId)).videos as Video[];
      } else {
        const remotePlaylist = queryClient.getQueriesData(
          `playlist-${playlistId}`,
        )[0][1] as Playlist;
        videos = remotePlaylist.videos as Video[];
      }
    }
    if (location.pathname.includes("/channels/")) {
      const [, , authorId] = window.location.pathname.split("/");
      const query = queryClient.getQueriesData(
        `channels-${authorId}-videos-1`,
      )[0][1] as { data: Video[] };
      videos = query.data;
    }
    if (location.pathname === "/favorites") {
      videos = getFavoritePlaylist().cards.filter(
        (card) => card.type === "video",
      ) as Video[];
    }
    if (location.pathname === "/most-popular") {
      videos = queryClient.getQueriesData("most-popular")[0][1] as Video[];
    }
    if (location.pathname === "/trending") {
      videos = queryClient.getQueriesData("trending")[0][1] as Video[];
    }
    // if (location.pathname === "/search") {
    //   videos = queryClient.getQueriesData("search")[0][1] as Video[];
    // }
    // if (location.pathname === "/history") {
    //   videos = getVideosHistory();
    // }

    return videos;
  };

  return getVideosPlaylist;
};
