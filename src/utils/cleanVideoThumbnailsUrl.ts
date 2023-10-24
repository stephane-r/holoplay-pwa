import type { Video } from "../types/interfaces/Video";
import { getThumbnailQuality } from "./formatData";

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+\.+[^:/?\n]+)/gm;

export const cleanVideoThumbnailsUrl = (video: Video) => ({
  ...video,
  thumbnail: getThumbnailQuality(
    video.videoThumbnails,
    "maxresdefault",
  ).replace(DOMAIN_REGEX, ""),
  videoThumbnails: video.videoThumbnails?.map((thumbnail) => ({
    ...thumbnail,
    url: thumbnail.url.replace(DOMAIN_REGEX, ""),
  })),
});
