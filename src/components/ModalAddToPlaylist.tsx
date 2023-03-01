import {
  Space,
  Button,
  Flex,
  Select,
  Text,
  TextInput,
  Divider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { memo, useMemo, useState } from "react";
import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { usePlaylists, useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Video } from "../types/interfaces/Video";
import { formatToOptionsCollection } from "../utils/formatToOptions";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ModalAddToPlaylistProps {
  opened: boolean;
  onClose: () => void;
  video: Video;
}

export const ModalAddToPlaylist: React.FC<ModalAddToPlaylistProps> = memo(
  ({ opened, onClose, video }) => {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
      null
    );
    const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
    const playlists = usePlaylists();
    const setPlaylists = useSetPlaylists();
    const localPlaylist = playlists.filter((p) => !p.playlistId);

    const playlistsIsEmpty = playlists.length === 0;

    const handleAddToPlaylist = () => {
      if (selectedPlaylistId) {
        updatePlaylist();
      } else {
        createNewPlaylist();
      }

      db.commit();
      setPlaylists(getPlaylists());
      showNotification({
        title: video.title,
        message: `Added to playlist`,
      });

      onClose();
    };

    const updatePlaylist = () => {
      const selectedPlaylist = playlists.find(
        (playlist) => playlist.ID === Number(selectedPlaylistId)
      );

      if (!selectedPlaylist) {
        showNotification({
          title: "Error",
          message: "Select playlist does not exist",
          color: "red",
        });

        throw new Error("Select playlist does not exist");
      }

      db.update(
        "playlists",
        { ID: Number(selectedPlaylistId) },
        (playlist: Playlist) => ({
          ...playlist,
          videos: [video, ...playlist.videos],
          videoCount: [video, ...playlist.videos].length,
        })
      );
    };

    const createNewPlaylist = () => {
      db.insert("playlists", {
        createdAt: new Date().toISOString(),
        title: newPlaylistTitle,
        videos: [video],
        videoCount: 1,
        type: "playlist",
      });
    };

    const disabled = useMemo(() => {
      if (
        selectedPlaylistId ||
        (!selectedPlaylistId && newPlaylistTitle.length > 0)
      ) {
        return false;
      }

      return true;
    }, [selectedPlaylistId, newPlaylistTitle]);

    return (
      <>
        <Modal
          opened={opened}
          onClose={onClose}
          centered
          size="lg"
          title="Add video to playlist"
        >
          <Form onSubmit={handleAddToPlaylist}>
            {!playlistsIsEmpty ? (
              <>
                <Text>
                  Select the playlist to wich you want to add your video
                </Text>
                <Space h={4} />
                <Select
                  label="Playlists"
                  placeholder="Your playlist"
                  data={formatToOptionsCollection(localPlaylist)}
                  onChange={setSelectedPlaylistId}
                />
                {!selectedPlaylistId ? (
                  <>
                    <Space h={24} />
                    <Divider />
                    <Space h={16} />
                    <Text>Or create new playlist</Text>
                  </>
                ) : null}
              </>
            ) : null}
            {!selectedPlaylistId ? (
              <>
                {playlistsIsEmpty ? (
                  <Text>Create your first playlist</Text>
                ) : null}
                <Space h={4} />
                <TextInput
                  data-autofocus
                  placeholder="My awesome title"
                  label="Title"
                  onChange={(event) => setNewPlaylistTitle(event.target.value)}
                />
              </>
            ) : null}
            <Flex gap={8} justify="flex-end" mt="xl">
              <Button onClick={onClose} color="gray">
                Cancel
              </Button>
              <Button type="submit" disabled={disabled}>
                Add to playlist
              </Button>
            </Flex>
          </Form>
        </Modal>
      </>
    );
  }
);
