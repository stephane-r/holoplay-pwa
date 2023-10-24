import { getSettings } from "../database/utils";
import type { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";

interface Data {
  segments: SponsorBlockSegment[];
}

export const getSponsorBlockSegments = async (
  videoId: string,
  categories?: string[],
): Promise<Data> => {
  const { deviceId, sponsorBlockCategories } = getSettings();
  const request = await fetch(
    `${
      process.env.REACT_APP_API_URL
    }/api/sponsorBlock?deviceId=${deviceId}&videoId=${videoId}&categories=${sponsorBlockCategories.join(
      ",",
    )}'`,
  );
  return request.json();
};
