import { Search } from "../types/interfaces/Search";
import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const search = async ({ query, type }: Search): Promise<Video[]> => {
  const instance = getCurrentInstance();

  const request = await fetch(
    `${instance.uri}/api/v1/search?q=${query}&type=${String(type)}`
  );
  return request.json();
};
