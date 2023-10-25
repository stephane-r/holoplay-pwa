import qs from "qs";

import type { Card } from "../types/interfaces/Card";
import type { Search } from "../types/interfaces/Search";
import { getCurrentInstance } from "../utils/getCurrentInstance";

interface SearchParams extends Search {
  page: number;
}

export const search = async ({
  sortBy: sort_by,
  ...params
}: SearchParams): Promise<Card[]> => {
  const instance = getCurrentInstance();
  let uri = null;

  switch (params.service) {
    case "invidious":
      uri = `${instance.uri}/api/v1/search`;
      break;
    case "youtube_music":
      uri = `${process.env.REACT_APP_API_URL}/api/ytMusic/search`;
      break;
    default:
      throw new Error("Invalid service");
  }

  const request = await fetch(`${uri}?${qs.stringify({ ...params, sort_by })}`);
  return request.json();
};
