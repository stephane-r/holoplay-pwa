import { Button, Flex, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { memo } from "react";
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

    const handleDeleteVideo = () => {
      const playlist = getPlaylist(Number(playlistId));

      if (!playlist) {
        showNotification({
          title: "Error",
          message: "Playlist not found",
          color: "red",
        });
        throw Error("Playlist not found");
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
        title: "Video deleted",
        message: `${video.title} has been deleted from playlist`,
      });

      onClose();
    };

    return (
      <Modal
        opened={opened}
        onClose={() => onClose()}
        centered
        size="lg"
        title="Delete playlist"
        overlayBlur={3}
      >
        <Text>
          Do you want deleted <strong>{video.title}</strong> from playlist ?
        </Text>
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={() => onClose()} color="gray">
            Cancel
          </Button>
          <Button onClick={handleDeleteVideo} color="red">
            Delete playlist
          </Button>
        </Flex>
      </Modal>
    );
  });
