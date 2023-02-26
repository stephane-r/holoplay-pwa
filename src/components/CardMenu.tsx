import { Menu, ActionIcon } from "@mantine/core";
import {
  IconPlus,
  IconDownload,
  IconShare,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { memo, useState } from "react";
import { Video } from "../types/interfaces/Video";
import { ModalAddToPlaylist } from "./ModalAddToPlaylist";

interface CardMenuProps {
  video: Video;
}

export const CardMenu: React.FC<CardMenuProps> = memo(({ video }) => {
  const [addToPlaylistModalOpened, setAddToPlaylistModalOpened] =
    useState(false);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconPlus size={18} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            onClick={() => setAddToPlaylistModalOpened(true)}
            icon={<IconPlayerPlay size={14} />}
          >
            Add to playlist
          </Menu.Item>
          <Menu.Label>Other</Menu.Label>
          <Menu.Item icon={<IconDownload size={14} />}>Download</Menu.Item>
          <Menu.Item icon={<IconShare size={14} />}>Share</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalAddToPlaylist
        opened={addToPlaylistModalOpened}
        onClose={() => setAddToPlaylistModalOpened(false)}
        video={video}
      />
    </>
  );
});
