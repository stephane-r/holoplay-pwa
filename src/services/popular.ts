import type { CardVideo } from "../types/interfaces/Card";
import { getCurrentInstance } from "../utils/getCurrentInstance";

export const getPopuplars = async (): Promise<CardVideo[]> => {
  const apiUrl = getCurrentInstance().uri;
  const request = await fetch(`${apiUrl}/api/v1/popular`);
  return request.json();
};
