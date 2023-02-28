// @ts-ignore
import HScrollGrid from "react-horizontal-scroll-grid";
import { Box, createStyles } from "@mantine/core";
import { memo } from "react";
import { Card } from "./Card";
import { useElementSize } from "@mantine/hooks";
import { Video } from "../types/interfaces/Video";

const CARD_WIDTH = 277;
const CARD_HEIGHT = 290;

const useStyles = createStyles((theme) => ({
  container: {
    ul: {
      padding: 0,
    },
  },
}));

interface HorizontalGridListProps {
  data: Video[];
  keyPrefix: string;
}

export const HorizontalGridList: React.FC<HorizontalGridListProps> = memo(
  ({ data, keyPrefix }) => {
    const { classes } = useStyles();
    const { ref, width } = useElementSize();

    return (
      <Box ref={ref} className={classes.container}>
        {width > 0 ? (
          <HScrollGrid
            gridWidth={width}
            gridHeight={CARD_HEIGHT}
            cardWidth={CARD_WIDTH}
          >
            {data.map((video) => (
              <Card
                key={`${keyPrefix}-${video.videoId}`}
                video={video}
                component="li"
              />
            ))}
          </HScrollGrid>
        ) : null}
      </Box>
    );
  }
);
