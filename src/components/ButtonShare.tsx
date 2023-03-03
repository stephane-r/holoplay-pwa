import { ActionIcon, Menu } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconBrandYoutube,
  IconCopy,
  IconPlayerPlay,
  IconShare,
} from "@tabler/icons-react";
import { memo } from "react";
import { usePlayerVideo } from "../providers/Player";
import { useSettings } from "../providers/Settings";
import { Video } from "../types/interfaces/Video";

type ShareType = "holoplay" | "invidious" | "youtube";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonShare: React.FC<ButtonDownloadProps> = memo(
  ({ iconSize }) => {
    const { video } = usePlayerVideo() as { video: Video };
    const clipboard = useClipboard();
    const settings = useSettings();

    const formateVideoUrl = (type: ShareType) => {
      switch (type) {
        case "holoplay":
          return `https://app.holoplay.io/watch?v=${video.videoId}`;
        case "invidious":
          return `${settings.currentInstance?.uri}/watch?v=${video.videoId}`;
        case "youtube":
          return `https://www.youtube.com/watch?v=${video.videoId}`;
      }
    };

    const handleClick = (type: ShareType) => {
      clipboard.copy(formateVideoUrl(type));
      showNotification({
        title: "Copied to clipboard",
        message: "The link has been copied to your clipboard",
      });
    };

    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon title="Share video">
            <IconShare size={iconSize} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Share</Menu.Label>
          <Menu.Item
            onClick={() => handleClick("holoplay")}
            icon={<IconCopy size={18} />}
          >
            Copy <strong>HoloPlay</strong> link
          </Menu.Item>
          <Menu.Item
            onClick={() => handleClick("invidious")}
            icon={<IconPlayerPlay size={18} />}
          >
            Copy <strong>Invidious</strong> link
          </Menu.Item>
          <Menu.Item
            onClick={() => handleClick("youtube")}
            icon={<IconBrandYoutube size={18} />}
          >
            Copy <strong>Youtube</strong> link
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }
);
