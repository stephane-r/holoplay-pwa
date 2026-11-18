import { useLocation, useParams } from "react-router-dom";

import { isLocalPlaylistId } from "../utils/playlistIdentity";

export const useIsLocalPlaylist = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const location = useLocation();
  const isLocalPlaylist =
    location.pathname.includes("/playlists/") &&
    Boolean(playlistId) &&
    isLocalPlaylistId(playlistId as string);
  const isRemotePlaylistDetail =
    location.pathname.includes("/playlists/") &&
    Boolean(playlistId) &&
    !isLocalPlaylistId(playlistId as string);

  return {
    playlistId,
    isLocalPlaylist,
    isRemotePlaylistDetail,
  };
};
