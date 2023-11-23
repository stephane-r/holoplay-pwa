import { Alert, Box, Flex } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "next-i18next";

import { CardList } from "../components/CardList";
import { ModalCreatePlaylist } from "../components/ModalCreatePlaylist";
import { PageHeader } from "../components/PageHeader";
import { usePlaylists } from "../providers/Playlist";

export const PlaylistsPage = memo(() => {
  const { t } = useTranslation("common");

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
  const { t } = useTranslation("common");

  if (!playlists.length) {
    return (
      <Alert title={t("playlists.empty.alert.title")} color="blue" radius="md">
        {t("playlists.empty.alert.message")}
      </Alert>
    );
  }

  return <CardList data={playlists as any} />;
});
