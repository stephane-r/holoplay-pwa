import { Button, Flex, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { memo } from "react";
import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Modal } from "./Modal";

interface ModalDeletePlaylistProps {
  opened: boolean;
  onClose: () => void;
  playlist: Playlist;
}

export const ModalDeletePlaylist: React.FC<ModalDeletePlaylistProps> = memo(
  ({ opened, onClose, playlist }) => {
    const setPlaylists = useSetPlaylists();

    const handleDeletePlaylist = () => {
      db.deleteRows("playlists", {
        ID: playlist.ID,
      });
      db.commit();
      setPlaylists(getPlaylists());
      showNotification({
        title: "Playlist deleted",
        message: `${playlist.title} has been deleted`,
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
          Do you want deleted <strong>{playlist.title}</strong> playlist ?
        </Text>
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={() => onClose()} color="gray">
            Cancel
          </Button>
          <Button onClick={handleDeletePlaylist} color="red">
            Delete playlist
          </Button>
        </Flex>
      </Modal>
    );
  }
);
