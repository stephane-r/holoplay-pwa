import { AppShell, Box, Flex } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import i18n from "i18next";
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
import { PlayerPlaylistProvider } from "../providers/PlayerPlaylist";
import { PlaylistProvider } from "../providers/Playlist";
import { PreviousNextTrackProvider } from "../providers/PreviousNextTrack";
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
                      <PreviousNextTrackProvider>
                        <PlayerPlaylistProvider>
                          <PlayerModeProvider>
                            <HistoryProvider>
                              <MantineProvider>
                                <Notifications />
                                <AppShell>
                                  <SpotlightProvider />
                                  <Flex className={`App ${userAgent.os.name}`}>
                                    <NavigationContainer />
                                    <HeaderMobileContainer />
                                    <Box className="App-Content">
                                      <HeaderDesktopContainer />
                                      <Main>
                                        <Outlet />
                                      </Main>
                                    </Box>
                                    <DrawerPlayerContainer />
                                    <PlayerContainer />
                                    <MobileNavigationContainer />
                                    <Scripts />
                                  </Flex>
                                </AppShell>
                              </MantineProvider>
                            </HistoryProvider>
                          </PlayerModeProvider>
                        </PlayerPlaylistProvider>
                      </PreviousNextTrackProvider>
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
