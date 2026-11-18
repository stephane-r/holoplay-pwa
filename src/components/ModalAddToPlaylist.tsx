import {
  Button,
  Divider,
  Flex,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { type FC, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { usePlaylists } from "../providers/Playlist";
import type { CardVideo } from "../types/interfaces/Card";
import { notifyError } from "../utils/notify";
import { isLocalPlaylist } from "../utils/playlistIdentity";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ModalAddToPlaylistProps {
  opened: boolean;
  onClose: () => void;
  video: CardVideo;
}

export const ModalAddToPlaylist: FC<ModalAddToPlaylistProps> = memo(
  ({ opened, onClose, video }) => {
    const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<
      string | null
    >(null);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
    const playlists = usePlaylists();
    const localPlaylist = playlists.filter(isLocalPlaylist);
    const { t } = useTranslation();

    const playlistsIsEmpty = playlists.length === 0;

    const handleAddToPlaylist = async () => {
      if (selectedPlaylistTitle) {
        await updatePlaylist();
      } else {
        await createNewPlaylist();
      }

      notifications.show({
        title: video.title,
        message: t("modal.video.playlist.add"),
      });

      onClose();
    };

    const updatePlaylist = async () => {
      const selectedPlaylist = playlists.find(
        (playlist) => playlist.title === selectedPlaylistTitle,
      );

      if (!selectedPlaylist) {
        notifyError({
          title: t("error"),
          message: t("modal.video.playlist.add.error"),
        });

        throw new Error(t("modal.video.playlist.add.error") as string);
      }

      await database.addVideoToPlaylist(
        selectedPlaylistTitle as string,
        video,
      );
    };

    const createNewPlaylist = () => {
      return database.createPlaylist({
        title: newPlaylistTitle,
        videos: [video],
        videoCount: 1,
        type: "playlist",
      });
    };

    const disabled = useMemo(() => {
      if (
        selectedPlaylistTitle ||
        (!selectedPlaylistTitle && newPlaylistTitle.length > 0)
      ) {
        return false;
      }

      return true;
    }, [selectedPlaylistTitle, newPlaylistTitle]);

    return (
      <>
        <Modal
          opened={opened}
          onClose={onClose}
          centered
          size="lg"
          title={t("modal.video.playlist.title")}
        >
          <Form label="Form add to playlist" onSubmit={handleAddToPlaylist}>
            {!playlistsIsEmpty ? (
              <>
                <Text>{t("modal.video.playlist.your.text")}</Text>
                <Space h={4} />
                <Select
                  label={t("modal.video.playlist.your.label")}
                  placeholder={
                    t("modal.video.playlist.your.placeholder") as string
                  }
                  data={localPlaylist.map((p) => p.title)}
                  onChange={setSelectedPlaylistTitle}
                />
                {!selectedPlaylistTitle ? (
                  <>
                    <Space h={24} />
                    <Divider />
                    <Space h={16} />
                    <Text>{t("modal.video.playlist.or")}</Text>
                  </>
                ) : null}
              </>
            ) : null}
            {!selectedPlaylistTitle ? (
              <>
                {playlistsIsEmpty ? (
                  <Text>{t("modal.video.playlist.selected.text")}</Text>
                ) : null}
                <Space h={4} />
                <TextInput
                  data-autofocus
                  placeholder={
                    t("modal.video.playlist.selected.placeholder") as string
                  }
                  label={t("modal.video.playlist.selected.label")}
                  onChange={(event) => setNewPlaylistTitle(event.target.value)}
                />
              </>
            ) : null}
            <Flex gap={8} justify="flex-end" mt="xl">
              <Button onClick={onClose} color="gray">
                {t("button.cancel")}
              </Button>
              <Button type="submit" disabled={disabled}>
                {t("modal.video.playlist.button.add")}
              </Button>
            </Flex>
          </Form>
        </Modal>
      </>
    );
  },
);
