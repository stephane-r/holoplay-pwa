import { ActionIcon, Menu } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerUrl, usePlayerVideo } from "../providers/Player";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonDownload: FC<ButtonDownloadProps> = memo(({ iconSize }) => {
  const { video } = usePlayerVideo();
  const playerUrl = usePlayerUrl();
  const { t } = useTranslation();

  if (!video) return null;

  const handleDownload = () => {
    window.open(playerUrl as string, "_blank");
  };

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon color="transparent" title={t("download.sound")}>
          <IconDownload size={iconSize} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown mah={400} style={{ overflow: "auto" }}>
        {video.adaptiveFormats.map((format) => (
          <Menu.Item key={format.type} onClick={() => handleDownload()}>
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
});
