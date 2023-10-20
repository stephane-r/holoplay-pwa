import { Alert, Box, Flex } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CardList } from "../components/CardList";
import { ModalCreatePlaylist } from "../components/ModalCreatePlaylist";
import { PageHeader } from "../components/PageHeader";
import { usePlaylists } from "../providers/Playlist";

export const PlaylistsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <Flex gap={20} align="center">
        <Box mb="xl">
          <ModalCreatePlaylist />
        </Box>
        <PageHeader title={t("page.playlists.title")} />
      </Flex>
      <PlaylistListContainer />
    </div>
  );
});

const PlaylistListContainer = memo(() => {
  const playlists = usePlaylists();
  const { t } = useTranslation();

  if (!playlists.length) {
    return (
      <Alert
        data-testid="playlists-empty"
        title={t("playlists.empty.alert.title")}
        color="blue"
        radius="md"
      >
        {t("playlists.empty.alert.message")}
      </Alert>
    );
  }

  return <CardList label="Playlists list" data={playlists as any} />;
});
