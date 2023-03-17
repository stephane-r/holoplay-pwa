import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { ModalCreatePlaylist } from "../components/ModalCreatePlaylist";
import { usePlaylists } from "../providers/Playlist";
import { CardList } from "../components/CardList";
import { Alert, Box, Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";

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
      <Alert title={t("playlists.empty.alert.title")} color="blue" radius="md">
        {t("playlists.empty.alert.message")}
      </Alert>
    );
  }

  return <CardList data={playlists as any} />;
});
