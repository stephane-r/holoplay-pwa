import { ActionIcon, Menu } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { memo } from "react";
import { usePlayerUrl, usePlayerVideo } from "../providers/Player";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonDownload: React.FC<ButtonDownloadProps> = memo(
  ({ iconSize }) => {
    const { video } = usePlayerVideo();
    const playerUrl = usePlayerUrl();

    if (!video) return null;

    const handleDownload = () => {
      window.open(playerUrl as string, "_blank");
    };

    return (
      <Menu>
        <Menu.Target>
          <ActionIcon title="Download sound">
            <IconDownload size={iconSize} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown mah={400} style={{ overflow: "auto" }}>
          {video.adaptiveFormats.map((format) => (
            <Menu.Item onClick={() => handleDownload()}>
              <span>
                {format.type
                  .replace(";", ",")
                  .replace('="', ": ")
                  .replace('"', "")}
              </span>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }
);
