import { Menu, ActionIcon } from "@mantine/core";
import {
  IconPlus,
  IconDownload,
  IconShare,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsLocalPlaylist } from "../hooks/useIsLocalPlaylist";
import { Video } from "../types/interfaces/Video";
import { ModalAddToPlaylist } from "./ModalAddToPlaylist";
import { ModalDeleteFromPlaylist } from "./ModalDeleteFromPlaylist";

interface CardMenuProps {
  video: Video;
}

export const CardMenu: React.FC<CardMenuProps> = memo(({ video }) => {
  const [addToPlaylistModalOpened, setAddToPlaylistModalOpened] =
    useState(false);
  const [deleteFromPlaylistModalOpened, setDeleteFromPlaylistModalOpened] =
    useState(false);
  const { isRemotePlaylistDetail, isLocalPlaylist } = useIsLocalPlaylist();
  const { t } = useTranslation();

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconPlus size={18} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {!isRemotePlaylistDetail ? (
            <>
              <Menu.Label>{t("menu.video.settings")}</Menu.Label>
              {isLocalPlaylist ? (
                <Menu.Item
                  onClick={() => setDeleteFromPlaylistModalOpened(true)}
                  color="red"
                  icon={<IconTrash size={14} />}
                >
                  {t("menu.video.remove.playlist")}
                </Menu.Item>
              ) : (
                <Menu.Item
                  onClick={() => setAddToPlaylistModalOpened(true)}
                  icon={<IconPlayerPlay size={14} />}
                >
                  {t("menu.video.add.playlist")}
                </Menu.Item>
              )}
            </>
          ) : null}
          <Menu.Label>{t("menu.video.other")}</Menu.Label>
          <Menu.Item icon={<IconDownload size={14} />}>
            {t("menu.video.download")}
          </Menu.Item>
          <Menu.Item icon={<IconShare size={14} />}>
            {t("menu.video.share")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalAddToPlaylist
        opened={addToPlaylistModalOpened}
        onClose={() => setAddToPlaylistModalOpened(false)}
        video={video}
      />
      <ModalDeleteFromPlaylist
        opened={deleteFromPlaylistModalOpened}
        onClose={() => setDeleteFromPlaylistModalOpened(false)}
        video={video}
      />
    </>
  );
});
