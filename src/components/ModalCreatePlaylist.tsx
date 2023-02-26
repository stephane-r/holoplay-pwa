import {
  Button,
  Flex,
  TextInput,
  ActionIcon,
  Box,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { memo, useState } from "react";
import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { useSetPlaylists } from "../providers/Playlist";
import { Modal } from "./Modal";

export const ModalCreatePlaylist = memo(() => {
  const [opened, setOpened] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const setPlaylists = useSetPlaylists();

  const handleAddToPlaylist = () => {
    db.insert("playlists", {
      createdAt: new Date().toISOString(),
      title: playlistTitle,
      videos: [],
      videoCount: 0,
      type: "playlist",
    });
    db.commit();
    setPlaylists(getPlaylists());
    showNotification({
      title: "Playlist created",
      message: `${playlistTitle} has been created}`,
    });

    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="lg"
        title="Create new playlist"
      >
        <TextInput
          data-autofocus
          placeholder="My awesome title"
          label="Title"
          onChange={(event) => setPlaylistTitle(event.target.value)}
        />
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={() => setOpened(false)} color="gray">
            Cancel
          </Button>
          <Button
            onClick={handleAddToPlaylist}
            disabled={playlistTitle.length === 0}
          >
            Create playlist
          </Button>
        </Flex>
      </Modal>
      <Box style={{ position: "absolute", bottom: 32, right: 32, zIndex: 2 }}>
        <Tooltip label="Create new playlist" position="left">
          <ActionIcon
            onClick={() => setOpened(true)}
            variant="filled"
            size="xl"
            radius="xl"
          >
            <IconPlus />
          </ActionIcon>
        </Tooltip>
      </Box>
    </>
  );
});
