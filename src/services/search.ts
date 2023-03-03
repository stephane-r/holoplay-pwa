import qs from "qs";
import { Search } from "../types/interfaces/Search";
import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

interface SearchParams extends Search {
  page: number;
}

export const search = async ({
  sortBy: sort_by,
  ...params
}: SearchParams): Promise<Video[]> => {
  const instance = getCurrentInstance();

  const request = await fetch(
    `${instance.uri}/api/v1/search?${qs.stringify({ ...params, sort_by })}`
  );
  return request.json();
};
