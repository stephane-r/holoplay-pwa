import { ActionIcon, Menu } from "@mantine/core";
import {
  IconDownload,
  IconPlayerPlay,
  IconPlus,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useIsLocalPlaylist } from "../hooks/useIsLocalPlaylist";
import type { CardVideo } from "../types/interfaces/Card";
import { ModalAddToPlaylist } from "./ModalAddToPlaylist";
import { ModalDeleteFromPlaylist } from "./ModalDeleteFromPlaylist";

interface CardMenuProps {
  card: CardVideo;
}

export const CardMenu: FC<CardMenuProps> = memo(({ card }) => {
  const [addToPlaylistModalOpened, setAddToPlaylistModalOpened] =
    useState(false);
  const [deleteFromPlaylistModalOpened, setDeleteFromPlaylistModalOpened] =
    useState(false);
  const { isRemotePlaylistDetail, isLocalPlaylist } = useIsLocalPlaylist();
  const { t } = useTranslation();

  return (
    <>
      <Menu aria-label="Card menu" shadow="md" width={200}>
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
                  leftSection={<IconTrash size={14} />}
                  aria-label={t("menu.video.remove.playlist")}
                >
                  {t("menu.video.remove.playlist")}
                </Menu.Item>
              ) : (
                <Menu.Item
                  onClick={() => setAddToPlaylistModalOpened(true)}
                  leftSection={<IconPlayerPlay size={14} />}
                  aria-label={t("menu.video.add.playlist")}
                >
                  {t("menu.video.add.playlist")}
                </Menu.Item>
              )}
            </>
          ) : null}
          <Menu.Label>{t("menu.video.other")}</Menu.Label>
          <Menu.Item leftSection={<IconDownload size={14} />}>
            {t("menu.video.download")}
          </Menu.Item>
          <Menu.Item leftSection={<IconShare size={14} />}>
            {t("menu.video.share")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalAddToPlaylist
        opened={addToPlaylistModalOpened}
        onClose={() => setAddToPlaylistModalOpened(false)}
        video={card}
      />
      <ModalDeleteFromPlaylist
        opened={deleteFromPlaylistModalOpened}
        onClose={() => setDeleteFromPlaylistModalOpened(false)}
        video={card}
      />
    </>
  );
});
