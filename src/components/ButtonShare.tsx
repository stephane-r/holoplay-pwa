import { ActionIcon, Menu } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconBrandYoutube,
  IconCopy,
  IconPlayerPlay,
  IconShare,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerVideo } from "../providers/Player";
import { useSettings } from "../providers/Settings";
import type { Video } from "../types/interfaces/Video";

type ShareType = "holoplay" | "invidious" | "youtube";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonShare: FC<ButtonDownloadProps> = memo(({ iconSize }) => {
  const { video } = usePlayerVideo() as { video: Video };
  const clipboard = useClipboard();
  const settings = useSettings();
  const { t } = useTranslation();

  const formateVideoUrl = (type: ShareType) => {
    switch (type) {
      case "holoplay":
        return `https://app.holoplay.io/?v=${video.videoId}`;
      case "invidious":
        return `${settings.currentInstance?.uri}/watch?v=${video.videoId}`;
      case "youtube":
        return `https://www.youtube.com/watch?v=${video.videoId}`;
    }
  };

  const handleClick = (type: ShareType) => {
    clipboard.copy(formateVideoUrl(type));
    notifications.show({
      title: t("share.notification.title"),
      message: t("share.notification.message"),
    });
  };

  return (
    <Menu shadow="md" width={220}>
      <Menu.Target>
        <ActionIcon color="transparent" title={t("button.share.video")}>
          <IconShare size={iconSize} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t("share.title")}</Menu.Label>
        <Menu.Item
          onClick={() => handleClick("holoplay")}
          leftSection={<IconCopy size={18} />}
        >
          {t("share.holoplay.link")}
        </Menu.Item>
        <Menu.Item
          onClick={() => handleClick("invidious")}
          leftSection={<IconPlayerPlay size={18} />}
        >
          {t("share.invidious.link")}
        </Menu.Item>
        <Menu.Item
          onClick={() => handleClick("youtube")}
          leftSection={<IconBrandYoutube size={18} />}
        >
          {t("share.youtube.link")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
