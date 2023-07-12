import { getSettings } from "../database/utils";
import { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";

interface Data {
  segments: SponsorBlockSegment[];
}

export const getSponsorBlockSegments = async (
  videoId: string,
  categories?: string[]
): Promise<Data> => {
  const { deviceId } = getSettings();
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/sponsorBlock?deviceId=${deviceId}&videoId=${videoId}`
  );
  return request.json();
};
