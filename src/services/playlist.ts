import type { Playlist } from "../types/interfaces/Playlist";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(`${apiUrl}/api/v1/playlists/${playlistId}`);
  return request.json();
};
