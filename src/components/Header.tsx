import { createStyles, Space } from "@mantine/core";
import { memo } from "react";
import { MobileNavigationContainer } from "../containers/MobileNavigation";
import { ColorScheme } from "./ColorScheme";
import { GithubActionIcon } from "./GithubActionIcon";
import { SearchBar } from "./SearchBar";

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

  return (
    <header className={classes.container}>
      <MobileNavigationContainer />
      <SearchBar />
      <Space w={8} />
      <div>
        <GithubActionIcon />
      </div>
      <Space w={8} />
      <div>
        <ColorScheme />
      </div>
    </header>
  );
});
