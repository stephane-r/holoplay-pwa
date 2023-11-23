import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export const useIsLocalPlaylist = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const router = useRouter();
  const isLocalPlaylist =
    router.pathname.includes("/playlists/") && Number(playlistId);
  const isRemotePlaylistDetail =
    router.pathname.includes("/playlists/") && !Number(playlistId);

  return {
    playlistId,
    isLocalPlaylist,
    isRemotePlaylistDetail,
  };
};
