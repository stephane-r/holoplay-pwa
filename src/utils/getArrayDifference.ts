import { removeDuplicateVideoId } from "../services/database";
import type { Card, CardVideo } from "../types/interfaces/Card";
import type { Playlist } from "../types/interfaces/Playlist";

// The four possible identifying fields across Card/Playlist variants — only
// one is ever present on a given item, the others are absent (not merely
// optional-but-typed-elsewhere), which is why a single generic needs them
// all declared as optional here.
interface CardLikeIdentifiers {
  ID?: number;
  videoId?: string;
  playlistId?: string;
  authorId?: string;
}

const getCardId = <T extends CardLikeIdentifiers>(
  card: T,
): string | number | undefined =>
  card.ID || card.videoId || card.playlistId || card.authorId;

export const getPlaylistId = <T extends { title: string }>(playlist: T) =>
  playlist.title;

export const getArrayDifference = <T extends CardLikeIdentifiers>(
  currentArray: T[],
  nextArray: T[],
  comparator: (item: T) => string | number | undefined = getCardId,
) =>
  nextArray.filter((currentItem) =>
    currentArray.every(
      (nextItem) => comparator(currentItem) !== comparator(nextItem),
    ),
  );

export const getUpdatedPlaylists = (
  currentArray: Playlist[],
  nextArray: Playlist[],
) =>
  currentArray
    .map((nextItem) => {
      const existingPlaylist = nextArray.find(
        (currentItem) => getPlaylistId(currentItem) === getPlaylistId(nextItem),
      );

      if (!existingPlaylist) return false;

      return {
        ...nextItem,
        videos: removeDuplicateVideoId([
          ...(existingPlaylist.videos as Card[]),
          ...(nextItem.videos as Card[]),
        ]) as CardVideo[],
      };
    })
    .filter(Boolean);
