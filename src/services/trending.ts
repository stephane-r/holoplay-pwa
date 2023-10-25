import qs from "qs";

import type { TrendingFilters } from "../providers/TrendingFilters";
import type { CardVideo } from "../types/interfaces/Card";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getTrendings = async (
  params: TrendingFilters,
): Promise<CardVideo[]> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(
    `${apiUrl}/api/v1/trending?${qs.stringify(params)}`,
  );
  return request.json();
};
