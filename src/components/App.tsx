import { AppShell, Box, Flex, LoadingOverlay } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import i18n from "i18next";
import { type FC, type PropsWithChildren, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import { DrawerPlayerContainer } from "../containers/DrawerPlayer";
import {
  HeaderDesktopContainer,
  HeaderMobileContainer,
} from "../containers/Header";
import { MobileNavigationContainer } from "../containers/MobileNavigation";
import { NavigationContainer } from "../containers/Navigation";
import { PlayerContainer } from "../containers/Player";
import { FavoriteProvider } from "../providers/Favorite";
import { HistoryProvider } from "../providers/History";
import { MantineProvider } from "../providers/Mantine";
import { StableNavigateProvider } from "../providers/Navigate";
import { PlayerProvider } from "../providers/Player";
import { PlayerModeProvider } from "../providers/PlayerMode";
import { PlaylistProvider } from "../providers/Playlist";
import { ScrollParentProvider, useSetScrollParent } from "../providers/ScrollParent";
import { SearchProvider } from "../providers/Search";
import { SettingsProvider } from "../providers/Settings";
import { SpotlightProvider } from "../providers/Spotlight";
import { TrendingFiltersProvider } from "../providers/TrendingFilters";
import { queryClient } from "../queryClient";
import { userAgent } from "../utils/userAgent";
import "./App.css";
import { AppUpdate } from "./AppUpdate";
import { Main } from "./Main";
import { Scripts } from "./Script";

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <StableNavigateProvider>
          <SettingsProvider>
            <SearchProvider>
              <TrendingFiltersProvider>
                <FavoriteProvider>
                  <PlaylistProvider>
                    <PlayerProvider>
                      <PlayerModeProvider>
                        <HistoryProvider>
                          <MantineProvider>
                            <Notifications />
                            <AppShell>
                              <SpotlightProvider />
                              <ScrollParentProvider>
                                <Flex className={`App ${userAgent.os.name}`}>
                                  <NavigationContainer />
                                  <HeaderMobileContainer />
                                  <AppContent>
                                    <HeaderDesktopContainer />
                                    <Main>
                                      <Suspense fallback={<LoadingOverlay visible />}>
                                        <Outlet />
                                      </Suspense>
                                    </Main>
                                  </AppContent>
                                  <DrawerPlayerContainer />
                                  <PlayerContainer />
                                  <MobileNavigationContainer />
                                  <Scripts />
                                </Flex>
                              </ScrollParentProvider>
                            </AppShell>
                          </MantineProvider>
                        </HistoryProvider>
                      </PlayerModeProvider>
                    </PlayerProvider>
                  </PlaylistProvider>
                </FavoriteProvider>
              </TrendingFiltersProvider>
            </SearchProvider>
          </SettingsProvider>
        </StableNavigateProvider>
        <AppUpdate />
      </QueryClientProvider>
    </I18nextProvider>
  );
};

// `.App-Content` is the real scroll container in this layout (see App.css:
// `body { overflow: hidden }`). Exposing its DOM node via ScrollParentProvider
// lets anything that virtualizes scroll-driven content (e.g. VirtuosoGrid in
// CardList.tsx) attach to it instead of wrongly assuming window scroll.
const AppContent: FC<PropsWithChildren> = ({ children }) => {
  const setScrollParent = useSetScrollParent();

  return (
    <Box className="App-Content" ref={setScrollParent}>
      {children}
    </Box>
  );
};
