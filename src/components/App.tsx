import { QueryClientProvider } from "react-query";
import { Box, createStyles, Flex, ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { queryClient } from "../queryClient";
import { SettingsProvider } from "../providers/Settings";
import { SearchProvider } from "../providers/Search";
import { Main } from "./Main";
import { ColorSchemeProvider } from "../providers/ColorScheme";
import { MantineProvider } from "../providers/Mantine";
import { FavoriteProvider } from "../providers/Favorite";
import { NotificationsProvider } from "@mantine/notifications";
import { PlaylistProvider } from "../providers/Playlist";
import { PlayerProvider } from "../providers/Player";
import { PlayerPlaylistProvider } from "../providers/PlayerPlaylist";
import { NavigationContainer } from "../containers/Navigation";
import { PlayerContainer } from "../containers/Player";
import { DrawerPlayerContainer } from "../containers/DrawerPlayer";
import { PreviousNextTrackProvider } from "../providers/PreviousNextTrack";
import { HistoryProvider } from "../providers/History";
import { SpotlightProvider } from "../providers/Spotlight";

const useStyles = createStyles(() => ({
  scrollArea: {
    flex: 1,
    height: "100vh",
  },
}));

interface AppProps {
  children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({ children }) => {
  const { cx, classes } = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <SearchProvider>
          <FavoriteProvider>
            <PlaylistProvider>
              <PlayerProvider>
                <PreviousNextTrackProvider>
                  <PlayerPlaylistProvider>
                    <HistoryProvider>
                      <ColorSchemeProvider>
                        <MantineProvider>
                          <SpotlightProvider>
                            <NotificationsProvider>
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
                                      <Main>{children}</Main>
                                    </Box>
                                    <DrawerPlayerContainer />
                                  </Flex>
                                  <PlayerContainer />
                                </ScrollArea>
                              </Flex>
                            </NotificationsProvider>
                          </SpotlightProvider>
                        </MantineProvider>
                      </ColorSchemeProvider>
                    </HistoryProvider>
                  </PlayerPlaylistProvider>
                </PreviousNextTrackProvider>
              </PlayerProvider>
            </PlaylistProvider>
          </FavoriteProvider>
        </SearchProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
};
