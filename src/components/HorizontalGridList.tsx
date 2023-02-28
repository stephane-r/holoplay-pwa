import { Box, createStyles } from "@mantine/core";
import { memo } from "react";
import { useElementSize } from "@mantine/hooks";
import { Video } from "../types/interfaces/Video";
import { CardList } from "./CardList";

const useStyles = createStyles((theme) => ({
  container: {},
}));

interface HorizontalGridListProps {
  data: Video[];
  keyPrefix: string;
}

export const HorizontalGridList: React.FC<HorizontalGridListProps> = memo(
  ({ data }) => {
    const { classes } = useStyles();
    const { ref, width } = useElementSize();

    return (
      <Box ref={ref} style={{ overflow: "hidden" }}>
        <div className={classes.container} style={{ maxWidth: width }}>
          <CardList data={data} scrollable />
        </div>
      </Box>
    );
  }
);
