import { QueryClientProvider } from "react-query";
import { Box, createStyles, Flex, ScrollArea } from "@mantine/core";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
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
import { Player } from "./Player";
import { DrawerPlayer } from "./DrawerPlayer";
import { PlayerPlaylistProvider } from "../providers/PlayerPlaylist";

const useStyles = createStyles(() => ({
  scrollArea: {
    flex: 1,
    maxHeight: "100vh",
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
                <PlayerPlaylistProvider>
                  <ColorSchemeProvider>
                    <MantineProvider>
                      <NotificationsProvider>
                        <Flex>
                          <Navigation />
                          <ScrollArea
                            className={cx(classes.scrollArea)}
                            style={{ position: "static" }}
                          >
                            <Flex>
                              <Box style={{ flex: 1 }}>
                                <Header />
                                <Main>{children}</Main>
                              </Box>
                              <DrawerPlayer />
                            </Flex>
                            <Player />
                          </ScrollArea>
                        </Flex>
                      </NotificationsProvider>
                    </MantineProvider>
                  </ColorSchemeProvider>
                </PlayerPlaylistProvider>
              </PlayerProvider>
            </PlaylistProvider>
          </FavoriteProvider>
        </SearchProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
};
