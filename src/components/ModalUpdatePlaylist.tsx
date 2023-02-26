import { Button, Flex, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { memo, useState } from "react";
import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ModalUpdatePlaylistProps {
  opened: boolean;
  onClose: () => void;
  playlist: Playlist;
}

export const ModalUpdatePlaylist: React.FC<ModalUpdatePlaylistProps> = memo(
  ({ opened, onClose, playlist }) => {
    const [playlistTitle, setPlaylistTitle] = useState(playlist.title);
    const setPlaylists = useSetPlaylists();

    const handleUpdatePlaylist = () => {
      db.update("playlists", { ID: playlist.ID }, (data: Playlist) => ({
        ...data,
        title: playlistTitle,
      }));
      db.commit();
      setPlaylists(getPlaylists());
      showNotification({
        title: "Playlist updated",
        message: `${playlistTitle} has been updated}`,
      });

      onClose();
    };

    return (
      <Modal
        opened={opened}
        onClose={() => onClose()}
        centered
        size="lg"
        title="Update playlist"
        overlayBlur={3}
      >
        <Form onSubmit={() => handleUpdatePlaylist()}>
          <TextInput
            data-autofocus
            placeholder="My awesome title"
            label="Title"
            value={playlistTitle}
            onChange={(event) => setPlaylistTitle(event.target.value)}
          />
        </Form>
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={() => onClose()} color="gray">
            Cancel
          </Button>
          <Button type="submit" disabled={playlistTitle.length === 0}>
            Update playlist
          </Button>
        </Flex>
      </Modal>
    );
  }
);
