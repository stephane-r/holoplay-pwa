import { Box, Button, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { useSetPlaylists } from "../providers/Playlist";
import type { CardPlaylist } from "../types/interfaces/Card";
import { Modal } from "./Modal";

interface ModalDeletePlaylistProps {
  opened: boolean;
  onClose: () => void;
  playlist: CardPlaylist;
}

export const ModalDeletePlaylist: FC<ModalDeletePlaylistProps> = memo(
  ({ opened, onClose, playlist }) => {
    const setPlaylists = useSetPlaylists();
    const { t } = useTranslation();

    const handleDeletePlaylist = () => {
      db.deleteRows("playlists", {
        ID: playlist.ID,
      });
      db.commit();
      setPlaylists(getPlaylists());
      notifications.show({
        title: t("modal.playlist.delete.notification.title"),
        message: `${playlist.title} ${t(
          "modal.playlist.delete.notification.message",
        )}`,
      });

      onClose();
    };

    return (
      <Modal
        opened={opened}
        onClose={() => onClose()}
        centered
        size="lg"
        title={t("modal.playlist.delete.title")}
        overlayProps={{
          blur: 3,
        }}
      >
        <Box role="form" aria-label={t("modal.playlist.delete.button.submit")}>
          <Text>
            {t("modal.playlist.delete.text")} <strong>{playlist.title}</strong>{" "}
            {t("modal.playlist.delete.text2")} ?
          </Text>
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => onClose()} color="gray">
              {t("button.cancel")}
            </Button>
            <Button onClick={handleDeletePlaylist} color="red">
              {t("modal.playlist.delete.button.submit")}
            </Button>
          </Flex>
        </Box>
      </Modal>
    );
  },
);
