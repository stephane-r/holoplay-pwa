import { Box } from "@mantine/core";
import { memo } from "react";

import { Video } from "../types/interfaces/Video";
import { Card } from "./Card";
import classes from "./CardList.module.css";
import { ChannelCard } from "./ChannelCard";
import { PlaylistCard } from "./PlaylistCard";

interface CardListProps {
  data: Video[];
  scrollable?: boolean;
}

export const CardList: React.FC<CardListProps> = memo(
  ({ data, scrollable = false }) => {
    if (!data.length) {
      return null;
    }

    console.log(classes);

    return (
      <Box className={scrollable ? classes.flexGrid : classes.grid}>
        {data.map((item, index) => (
          <Box
            key={`${document.location.pathname}—${item.title}-${index}`}
            className={scrollable ? classes.flexColumn : classes.column}
          >
            {(() => {
              switch (item.type) {
                case "playlist":
                  return <PlaylistCard playlist={item as any} />;
                case "channel":
                  return <ChannelCard channel={item as any} />;
                default:
                  return <Card video={item} />;
              }
            })()}
          </Box>
        ))}
      </Box>
    );
  },
);
