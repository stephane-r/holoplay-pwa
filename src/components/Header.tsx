import {
  Box,
  Flex,
  MediaQuery,
  Space,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { memo } from "react";

import { ColorScheme } from "./ColorScheme";
import { GithubActionIcon } from "./GithubActionIcon";
import { SearchBar } from "./SearchBar";
import { SearchFilters } from "./SearchFiltersMenu";
import { SyncActionIcon } from "./SyncActionIcon";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    position: "sticky",
    top: 0,
    backdropFilter: "blur(8px)",
    zIndex: 4,
    padding: 16,
  },
}));

export const Header = memo(() => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <header className={classes.container}>
      <SearchBar />
      <Space w={8} />
      <Flex gap={8}>
        <SearchFilters />
        <MediaQuery
          query={`(min-width: ${theme.breakpoints.md})`}
          styles={{ display: "none" }}
        >
          <Box>
            <SyncActionIcon />
          </Box>
        </MediaQuery>
        <MediaQuery
          query={`(max-width: ${theme.breakpoints.md})`}
          styles={{ display: "none" }}
        >
          <Box>
            <GithubActionIcon />
          </Box>
        </MediaQuery>
        <MediaQuery
          query={`(max-width: ${theme.breakpoints.md})`}
          styles={{ display: "none" }}
        >
          <Box>
            <ColorScheme />
          </Box>
        </MediaQuery>
      </Flex>
    </header>
  );
});
