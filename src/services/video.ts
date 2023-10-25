import { getSettings } from "../database/utils";
import type { AdaptiveFormat, Video } from "../types/interfaces/Video";

export const getVideo = async (
  videoId: string,
): Promise<{ video: Video; url: string }> => {
  const { currentInstance } = getSettings();
  const request = await fetch(
    `${currentInstance?.uri}/api/v1/videos/${videoId}`,
  );
  const video: Video = await request.json();

  const adaptiveFormat = video.adaptiveFormats?.find(
    (format) => format.type.match(/webm/i) || format.type.match(/audio/i),
  ) as AdaptiveFormat;

  return {
    video,
    url: adaptiveFormat?.url,
  };
};
