import { Space } from "@mantine/core";
import { memo } from "react";
import { ColorScheme } from "./ColorScheme";
import { GithubActionIcon } from "./GithubActionIcon";
import { SearchBar } from "./SearchBar";

export const Header = memo(() => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        position: "sticky",
        top: 0,
        backdropFilter: "blur(8px)",
        zIndex: 2,
        padding: 16,
      }}
    >
      <SearchBar />
      <Space w={8} />
      <GithubActionIcon />
      <Space w={8} />
      <ColorScheme />
    </header>
  );
});
