import { type FC, memo } from "react";

import type { Video as VideoType } from "../types/interfaces/Video";
import { Video } from "./Video";

interface VideoListProps {
  videos: VideoType[];
}

export const VideoList: FC<VideoListProps> = memo(({ videos }) => {
  if (!videos) return null;

  return videos.map((video) => (
    <Video key={`video-list-${video.videoId}`} video={video} />
  ));
});
