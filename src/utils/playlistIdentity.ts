interface PlaylistLike {
  ID?: number;
  playlistId?: string;
}

export interface LocalPlaylistIdentity {
  origin: "local";
  id: number;
}

export interface RemotePlaylistIdentity {
  origin: "remote";
  id: string;
}

export type PlaylistIdentity = LocalPlaylistIdentity | RemotePlaylistIdentity;

// A playlist saved locally (Dexie) always has `ID`, its autoincrement
// primary key; one fetched from a remote Invidious instance always has
// `playlistId` instead — exactly one is ever set. This is the one place
// that decides which, instead of every call site re-deriving it with its
// own `Boolean(playlist.ID)` / `!playlist.playlistId` / `?? ` check (which
// had already drifted into 3 different-looking but equivalent checks
// across PlaylistCard, PlaylistCardMenu and ModalAddToPlaylist).
export const getPlaylistIdentity = (
  playlist: PlaylistLike,
): PlaylistIdentity | null => {
  if (playlist.ID !== undefined) {
    return { origin: "local", id: playlist.ID };
  }
  if (playlist.playlistId !== undefined) {
    return { origin: "remote", id: playlist.playlistId };
  }
  return null;
};

export const isLocalPlaylist = (playlist: PlaylistLike): boolean =>
  getPlaylistIdentity(playlist)?.origin === "local";

// Same local/remote distinction, but for routes and hooks that only ever
// have the bare id (a route param, a prop) rather than the full playlist
// object — a local playlist's Dexie `ID` is always numeric, a remote one's
// `playlistId` is an opaque string, so the id's own shape tells us which.
export const isLocalPlaylistId = (id: string | number): boolean =>
  !Number.isNaN(Number(id));
