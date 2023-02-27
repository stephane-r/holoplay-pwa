import { ActionIcon } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import { memo } from "react";

interface ButtonDownloadProps {
  iconSize?: number;
}

export const ButtonShare: React.FC<ButtonDownloadProps> = memo(
  ({ iconSize }) => {
    return (
      <ActionIcon title="Share video">
        <IconShare size={iconSize} />
      </ActionIcon>
    );
  }
);
