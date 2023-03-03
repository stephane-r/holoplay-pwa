import { Search } from "../types/interfaces/Search";
import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

interface SearchParams extends Search {
  page: number;
}

export const search = async ({
  query,
  type,
  page = 1,
}: SearchParams): Promise<Video[]> => {
  const instance = getCurrentInstance();

  const request = await fetch(
    `${instance.uri}/api/v1/search?q=${query}&type=${String(type)}&page=${page}`
  );
  return request.json();
};
