import { Box, Flex, Space } from "@mantine/core";
import { memo } from "react";

import { ColorScheme } from "./ColorScheme";
import { GithubActionIcon } from "./GithubActionIcon";
import classes from "./Header.module.css";
import { SearchBar } from "./SearchBar";
import { SearchFilters } from "./SearchFiltersMenu";
import { SyncActionIcon } from "./SyncActionIcon";

export const Header = memo(() => {
  return (
    <header className={classes.container}>
      <SearchBar />
      <Space w={8} />
      <Flex gap={8}>
        <SearchFilters />
        <Box hiddenFrom="md">
          <SyncActionIcon />
        </Box>
        <Box visibleFrom="md">
          <GithubActionIcon />
        </Box>
        <Box visibleFrom="sm">
          <ColorScheme />
        </Box>
      </Flex>
    </header>
  );
});
