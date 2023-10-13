import { Box, Flex, ScrollArea, createStyles } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import { DrawerPlayerContainer } from "../containers/DrawerPlayer";
import { MobileNavigationContainer } from "../containers/MobileNavigation";
import { NavigationContainer } from "../containers/Navigation";
import { PlayerContainer } from "../containers/Player";
import { ColorSchemeProvider } from "../providers/ColorScheme";
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
import { AppUpdate } from "./AppUpdate";
import { Header } from "./Header";
import { Main } from "./Main";

const useStyles = createStyles(() => ({
  scrollArea: {
    flex: 1,
    height: "100vh",
  },
}));

export const App = () => {
  const { cx, classes } = useStyles();

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
                              <ColorSchemeProvider>
                                <MantineProvider>
                                  <SpotlightProvider>
                                    <Notifications />
                                    <Flex>
                                      <NavigationContainer />
                                      <ScrollArea
                                        className={cx(classes.scrollArea)}
                                        style={{
                                          position: "static",
                                        }} // Stay in inline-styles for now
                                      >
                                        <Flex>
                                          <Box style={{ flex: 1 }}>
                                            <Header />
                                            <Main>
                                              <Outlet />
                                            </Main>
                                            <MobileNavigationContainer />
                                          </Box>
                                          <DrawerPlayerContainer />
                                        </Flex>
                                        <PlayerContainer />
                                      </ScrollArea>
                                    </Flex>
                                  </SpotlightProvider>
                                </MantineProvider>
                              </ColorSchemeProvider>
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
