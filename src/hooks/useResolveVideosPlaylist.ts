import { useLocation } from "react-router-dom";
import {
  getFavoritePlaylist,
  getPlaylist as getLocalPlaylist,
  getVideosHistory,
} from "../database/utils";
import { queryClient } from "../queryClient";
import { Playlist } from "../types/interfaces/Playlist";
import { Video } from "../types/interfaces/Video";

export const useResolveVideosPlaylist = () => {
  const location = useLocation();

  const getVideosPlaylist = () => {
    let videos: Video[] | null = null;

    if (location.pathname.includes("/playlists/")) {
      const [, , playlistId] = window.location.pathname.split("/");
      const isLocalPlaylist = Number(playlistId);

      if (isLocalPlaylist) {
        videos = getLocalPlaylist(Number(playlistId)).videos;
      } else {
        const remotePlaylist = queryClient.getQueriesData(
          `playlist-${playlistId}`
        )[0][1] as Playlist;
        videos = remotePlaylist.videos;
      }
    }
    if (location.pathname === "/favorites") {
      videos = getFavoritePlaylist().videos;
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
    if (location.pathname === "/history") {
      videos = getVideosHistory();
    }

    return videos;
  };

  return getVideosPlaylist;
};
