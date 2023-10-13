import qs from "qs";

import { TrendingFilters } from "../providers/TrendingFilters";
import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getTrendings = async (
  params: TrendingFilters,
): Promise<Video[]> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(
    `${apiUrl}/api/v1/trending?${qs.stringify(params)}`,
  );
  return request.json();
};
