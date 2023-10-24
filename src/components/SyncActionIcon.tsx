import { ActionIcon } from "@mantine/core";
import { IconCloudDownload } from "@tabler/icons-react";
import { memo, useState } from "react";

import { ModalSyncData } from "./ModalSyncData";

export const SyncActionIcon = memo(() => {
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened((state) => !state);
  };

  return (
    <>
      <ActionIcon
        onClick={handleClose}
        radius="md"
        variant="filled"
        color="gray"
        style={{
          width: 36,
          height: 36,
        }}
      >
        <IconCloudDownload size={20} />
      </ActionIcon>
      <ModalSyncData opened={opened} onClose={handleClose} />
    </>
  );
});
