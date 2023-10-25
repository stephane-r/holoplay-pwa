import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { type FC, memo } from "react";

import type { Card } from "../types/interfaces/Card";
import { CardList } from "./CardList";

interface HorizontalGridListProps {
  data: Card[];
  keyPrefix: string;
}

export const HorizontalGridList: FC<HorizontalGridListProps> = memo(
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
