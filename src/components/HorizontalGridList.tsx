import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { type FC, memo } from "react";

import type { Card } from "../types/interfaces/Card";
import { CardList } from "./CardList";

interface HorizontalGridListProps {
  data: Card[];
  label?: string;
}

export const HorizontalGridList: FC<HorizontalGridListProps> = memo(
  ({ data, label }) => {
    const { ref, width } = useElementSize();

    return (
      <Box ref={ref} style={{ overflow: "hidden" }}>
        <div style={{ maxWidth: width }}>
          <CardList label={label} data={data} scrollable />
        </div>
      </Box>
    );
  },
);
