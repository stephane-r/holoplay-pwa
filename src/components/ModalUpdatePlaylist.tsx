import { Button, Flex, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import type { CardPlaylist } from "../types/interfaces/Card";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ModalUpdatePlaylistProps {
  opened: boolean;
  onClose: () => void;
  playlist: CardPlaylist;
}

export const ModalUpdatePlaylist: FC<ModalUpdatePlaylistProps> = memo(
  ({ opened, onClose, playlist }) => {
    const [playlistTitle, setPlaylistTitle] = useState(playlist.title);
    const { t } = useTranslation();

    const handleUpdatePlaylist = async () => {
      await database.updatePlaylistTitle(playlist.ID as number, playlistTitle);
      notifications.show({
        title: t("modal.playlist.update.notification.title"),
        message: `${playlistTitle} ${t(
          "modal.playlist.update.notification.message",
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
        title={t("modal.playlist.update.title")}
        overlayProps={{
          blur: 3,
        }}
      >
        <Form
          label="Form update playlist"
          onSubmit={() => handleUpdatePlaylist()}
        >
          <TextInput
            data-autofocus
            placeholder={t("modal.playlist.update.input.placeholder") as string}
            label={t("modal.playlist.update.input.label")}
            value={playlistTitle}
            onChange={(event) => setPlaylistTitle(event.target.value)}
          />
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => onClose()} color="gray">
              {t("button.cancel")}
            </Button>
            <Button type="submit" disabled={playlistTitle?.length === 0}>
              {t("modal.playlist.update.button.submit")}
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  },
);
