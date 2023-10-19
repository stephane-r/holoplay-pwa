import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { memo } from "react";

import { Video } from "../types/interfaces/Video";
import { CardList } from "./CardList";

interface HorizontalGridListProps {
  data: Video[];
  keyPrefix: string;
}

export const HorizontalGridList: React.FC<HorizontalGridListProps> = memo(
  ({ data }) => {
    const { ref, width } = useElementSize();

    return (
      <Box ref={ref} style={{ overflow: "hidden" }}>
        <div style={{ maxWidth: width }}>
          <CardList data={data} scrollable />
        </div>
      </Box>
    );
  },
);
