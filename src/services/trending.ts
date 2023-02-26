import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getTrendings = async (): Promise<Video[]> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(`${apiUrl}/api/v1/trending`);
  return request.json();
};
