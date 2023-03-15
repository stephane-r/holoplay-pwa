import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Playlist } from "../types/interfaces/Playlist";
import { ModalDeletePlaylist } from "./ModalDeletePlaylist";
import { ModalUpdatePlaylist } from "./ModalUpdatePlaylist";

interface PlaylistCardMenuProps {
  playlist: Playlist;
}

export const PlaylistCardMenu: React.FC<PlaylistCardMenuProps> = memo(
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
        >
          <Menu.Target>
            <ActionIcon
              onClick={() => setMenuOpened(true)}
              style={{ marginLeft: "auto", marginRight: -8 }}
            >
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{t("playlist.nemu.title")}</Menu.Label>
            {!playlist.playlistId ? (
              <Menu.Item
                icon={<IconEdit size={14} />}
                onClick={() => setModalUpdateOpened(true)}
              >
                {t("playlist.nemu.edit")}
              </Menu.Item>
            ) : null}
            <Menu.Item
              color="red"
              icon={<IconTrash size={14} />}
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
  }
);
