import { Box, Flex } from "@mantine/core";

import { DrawerPlayerContainer } from "../containers/DrawerPlayer";
import {
  HeaderDesktopContainer,
  HeaderMobileContainer,
} from "../containers/Header";
import { MobileNavigationContainer } from "../containers/MobileNavigation";
import { NavigationContainer } from "../containers/Navigation";
import { PlayerContainer } from "../containers/Player";
import { AppUpdate } from "./AppUpdate";
import { Main } from "./Main";
import { Scripts } from "./Script";
import type { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <Flex className="App">
      <NavigationContainer />
      <HeaderMobileContainer />
      <Box className="App-Content">
        <HeaderDesktopContainer />
        <Main>
          {children}
        </Main>
      </Box>
      <DrawerPlayerContainer />
      <PlayerContainer />
      <MobileNavigationContainer />
      <Scripts />
      <AppUpdate />
    </Flex>
  );
};
