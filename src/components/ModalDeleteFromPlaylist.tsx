import { Button, Flex, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../database";
import { getPlaylist, getPlaylists } from "../database/utils";
import { useIsLocalPlaylist } from "../hooks/useIsLocalPlaylist";
import { useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Video } from "../types/interfaces/Video";
import { Modal } from "./Modal";

interface ModalDeleteFromPlaylistProps {
  opened: boolean;
  onClose: () => void;
  video: Video;
}

export const ModalDeleteFromPlaylist: React.FC<ModalDeleteFromPlaylistProps> =
  memo(({ opened, onClose, video }) => {
    const setPlaylists = useSetPlaylists();
    const { playlistId } = useIsLocalPlaylist();
    const { t } = useTranslation();

    const handleDeleteVideo = () => {
      const playlist = getPlaylist(Number(playlistId));

      if (!playlist) {
        showNotification({
          title: "Error",
          message: t("Playlist not found"),
          color: "red",
        });
        throw Error(t("Playlist not found") as string);
      }

      const updatedVideos = playlist.videos.filter(
        (v) => v.videoId !== video.videoId
      );

      db.update(
        "playlists",
        {
          ID: playlistId,
        },
        (row: Playlist) => ({
          ...row,
          videos: updatedVideos,
        })
      );
      db.commit();
      setPlaylists(getPlaylists());
      showNotification({
        title: t("modal.video.delete.playlist.notification.title"),
        message: `${video.title} ${t(
          "modal.video.delete.playlist.notification.message"
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
        title={t("modal.video.delete.playlist.title")}
        overlayBlur={3}
      >
        <Text>
          {t("modal.video.delete.playlist.text")} <strong>{video.title}</strong>{" "}
          {t("modal.video.delete.playlist.text2")}
        </Text>
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={() => onClose()} color="gray">
            {t("button.cancel")}
          </Button>
          <Button onClick={handleDeleteVideo} color="red">
            {t("modal.video.delete.playlist.button.submit")}
          </Button>
        </Flex>
      </Modal>
    );
  });
