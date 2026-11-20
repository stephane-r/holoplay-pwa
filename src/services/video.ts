import { database } from "./database";
import type { AdaptiveFormat, Video } from "../types/interfaces/Video";
import { parseChapters } from "../utils/chapters";

export const getVideo = async (
  videoId: string,
): Promise<{ video: Video; url: string }> => {
  const settings = await database.getSettings();
  const currentInstance = settings?.currentInstance;
  const request = await fetch(
    `${currentInstance?.uri}/api/v1/videos/${videoId}`,
  );
  const data = await request.json();

  // Invidious responds with `{ error: "..." }` (and a non-2xx status) for a
  // missing/unavailable video rather than a Video object — read as one
  // anyway, every field below comes back `undefined`, and the caller only
  // ever saw a generic "No video url found" instead of the real reason
  // (e.g. "This backend encountered an error. Please switch backends, or
  // try again later.").
  if (!request.ok) {
    throw new Error(data.error ?? `Failed to load video (${request.status})`);
  }

  const video = data as Video;
  video.chapters = parseChapters(
    video.description,
    video.descriptionHtml,
    video.lengthSeconds,
  );
  const adaptiveFormat = video.adaptiveFormats?.find(
    (format) => format.type.match(/webm/i) || format.type.match(/audio/i),
  ) as AdaptiveFormat;

  return {
    video,
    url: adaptiveFormat?.url,
  };
};
