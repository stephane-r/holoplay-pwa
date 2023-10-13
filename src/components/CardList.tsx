import { Box, createStyles, rem } from "@mantine/core";
import { memo } from "react";

import { Video } from "../types/interfaces/Video";
import { Card } from "./Card";
import { ChannelCard } from "./ChannelCard";
import { PlaylistCard } from "./PlaylistCard";

const useStyles = createStyles((theme) => ({
  grid: {
    display: "grid",
    gridColumnGap: theme.spacing.lg,
    gridRowGap: theme.spacing.lg,

    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.md})`]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.xl})`]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },

    [`@media (min-width: 1650px)`]: {
      gridTemplateColumns: "repeat(6, 1fr)",
    },

    [`@media (min-width: 2400px)`]: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },
  },
  flexGrid: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing.lg,
    overflow: "auto",
  },
  column: {},
  flexColumn: {
    flex: `0 0 ${rem(277)}`,
  },
}));

interface CardListProps {
  data: Video[];
  scrollable?: boolean;
}

export const CardList: React.FC<CardListProps> = memo(
  ({ data, scrollable = false }) => {
    const { classes } = useStyles();

    if (!data.length) return null;

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
