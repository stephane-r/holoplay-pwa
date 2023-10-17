import { Video } from "../types/interfaces/Video";

const DOMAIN_REGEX =
  /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+\.+[^:/?\n]+)/gm;

export const cleanVideoThumbnailsUrl = (video: Video) => ({
  ...video,
  videoThumbnails: video.videoThumbnails?.map((thumbnail) => ({
    ...thumbnail,
    url: thumbnail.url.replace(DOMAIN_REGEX, ""),
  })),
});
