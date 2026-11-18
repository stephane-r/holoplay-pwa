import type { Card } from "../types/interfaces/Card";
import { getPlaylistIdentity } from "./playlistIdentity";

export const getCardId = (item: Card) => {
  switch (item.type) {
    case "playlist":
      return getPlaylistIdentity(item)?.id;
    case "channel":
      return item.authorId;
    default:
      return item.videoId;
  }
};

export const getCardTitle = (item: Card) => {
  switch (item.type) {
    case "channel":
      return item.author;
    default:
      return item.title;
  }
};
