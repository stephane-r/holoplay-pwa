import { removeDuplicateVideoId } from "../database/utils";
import type { Card, CardVideo } from "../types/interfaces/Card";
import type { Playlist } from "../types/interfaces/Playlist";

const getCardId = <T>(card: T): string | number =>
  // @ts-ignore
  card.ID || card.videoId || card.playlistId || card.authorId;

export const getPlaylistId = <T>(playlist: T) =>
  // @ts-ignore
  playlist.title;

export const getArrayDifference = <T>(
  currentArray: T[],
  nextArray: T[],
  comparator: (item: T) => string | number = getCardId,
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
