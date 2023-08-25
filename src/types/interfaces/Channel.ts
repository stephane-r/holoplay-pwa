import { VideoThumbnail } from "./Video";

export interface Channel {
  type: "channel";
  author: string;
  authorId: string;
  authorUrl: string;
  authorVerified: boolean;
  authorThumbnails: VideoThumbnail[];
  subCount: number;
  videoCount: number;
  description: string;
  descriptionHtml: string;
}
