import { Video } from "../types/interfaces/Video";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getPopuplars = async (): Promise<Video[]> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(`${apiUrl}/api/v1/popular`);
  return request.json();
};
