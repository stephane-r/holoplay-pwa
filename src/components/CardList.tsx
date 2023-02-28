import { Box, createStyles } from "@mantine/core";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import { Video } from "../types/interfaces/Video";
import { Card } from "./Card";
import { PlaylistCard } from "./PlaylistCard";

const useStyles = createStyles((theme) => ({
  grid: {
    display: "grid",
    gridColumnGap: theme.spacing.lg,
    gridRowGap: theme.spacing.lg,

    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },

    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
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
    flex: "0 0 277px",
  },
}));

interface CardListProps {
  data: Video[];
  scrollable?: boolean;
}

export const CardList: React.FC<CardListProps> = memo(
  ({ data, scrollable = false }) => {
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "");
    const { classes } = useStyles();

    if (!data.length) return null;

    return (
      <Box className={scrollable ? classes.flexGrid : classes.grid}>
        {data.map((item, index) => (
          <Box
            key={`${currentPath}—${item.title}-${index}`}
            className={scrollable ? classes.flexColumn : classes.column}
          >
            {item.type === "playlist" ? (
              <PlaylistCard playlist={item as any} />
            ) : (
              <Card video={item} />
            )}
          </Box>
        ))}
      </Box>
    );
  }
);
