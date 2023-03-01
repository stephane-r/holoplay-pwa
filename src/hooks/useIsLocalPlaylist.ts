import { useLocation, useParams } from "react-router-dom";

export const useIsLocalPlaylist = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const location = useLocation();
  const isLocalPlaylist =
    location.pathname.includes("/playlists/") && Number(playlistId);
  const isRemotePlaylistDetail =
    location.pathname.includes("/playlists/") && !Number(playlistId);

  return {
    playlistId,
    isLocalPlaylist,
    isRemotePlaylistDetail,
  };
};
