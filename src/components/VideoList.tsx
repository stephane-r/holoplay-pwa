import { Box, Space } from "@mantine/core";
import { memo } from "react";
import { Video as VideoType } from "../types/interfaces/Video";
import { Video } from "./Video";

interface VideoListProps {
  videos: VideoType[];
}

export const VideoList: React.FC<VideoListProps> = memo(({ videos }) => {
  if (!videos) return null;

  return (
    <Box>
      {videos.map((video) => (
        <Video key={video.videoId} video={video} />
      ))}
    </Box>
  );
});
