import { ActionIcon, Box } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { memo } from "react";
import { usePlayerUrl } from "../providers/Player";
import { downloadFile } from "../utils/downloadFile";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonDownload: React.FC<ButtonDownloadProps> = memo(
  ({ iconSize }) => {
    const playerUrl = usePlayerUrl();

    const handleDownload = () => {
      downloadFile(playerUrl as string, "audio.mp3");
    };

    return (
      <ActionIcon title="Download sound" onClick={handleDownload}>
        <IconDownload size={iconSize} />
      </ActionIcon>
    );
  }
);
