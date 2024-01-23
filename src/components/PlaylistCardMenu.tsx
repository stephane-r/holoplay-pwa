import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { CardPlaylist } from "../types/interfaces/Card";
import { ModalDeletePlaylist } from "./ModalDeletePlaylist";
import { ModalUpdatePlaylist } from "./ModalUpdatePlaylist";

interface PlaylistCardMenuProps {
  playlist: CardPlaylist;
}

export const PlaylistCardMenu: FC<PlaylistCardMenuProps> = memo(
  ({ playlist }) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [modalUpdateOpened, setModalUpdateOpened] = useState(false);
    const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
    const { t } = useTranslation();

    return (
      <>
        <Menu
          opened={menuOpened}
          onChange={setMenuOpened}
          shadow="md"
          width={200}
          aria-label="Open playlist menu"
        >
          <Menu.Target>
            <ActionIcon
              onClick={() => setMenuOpened(true)}
              variant="transparent"
              color="gray"
              style={{ marginLeft: "auto", marginRight: -8 }}
            >
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{t("playlist.nemu.title")}</Menu.Label>
            {!playlist.playlistId ? (
              <Menu.Item
                leftSection={<IconEdit size={14} />}
                onClick={() => setModalUpdateOpened(true)}
              >
                {t("playlist.nemu.edit")}
              </Menu.Item>
            ) : null}
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={() => setModalDeleteOpened(true)}
            >
              {t("playlist.nemu.delete")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <ModalUpdatePlaylist
          opened={modalUpdateOpened}
          onClose={() => setModalUpdateOpened(false)}
          playlist={playlist}
        />
        <ModalDeletePlaylist
          opened={modalDeleteOpened}
          onClose={() => setModalDeleteOpened(false)}
          playlist={playlist}
        />
      </>
    );
  },
);
