import { ColorExtractor } from "image-color-extraction";

export type ColorInfo = {
  color: string;
  count: number;
};

export const colorExtractor = new ColorExtractor();
