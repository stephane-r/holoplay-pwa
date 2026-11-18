import { ColorExtractor } from "image-color-extraction/lib/ColorExtractor";

export type ColorInfo = {
  color: string;
  count: number;
};

export const colorExtractor = new ColorExtractor();
