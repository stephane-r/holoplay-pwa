import { ActionIcon, Button, Flex, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings, useSettings } from "../providers/Settings";
import type { RemoteDevice, Settings } from "../types/interfaces/Settings";

interface ButtonDeleteDeviceProps {
  device: RemoteDevice;
}

export const ButtonDeleteDevice: FC<ButtonDeleteDeviceProps> = memo(
  ({ device: remoteDevice }) => {
    const { t } = useTranslation();
    const settings = useSettings();
    const setSettings = useSetSettings();
    const [opened, setOpened] = useState(false);

    const handleDelete = () => {
      const devices = settings.devices.filter(
        (device) => device.id !== remoteDevice.id,
      );
      db.update("settings", { ID: 1 }, (data: Settings) => ({
        devices,
      }));
      db.commit();
      setSettings((previousState) => ({
        ...previousState,
        devices,
      }));

      notifications.show({
        message: t("modal.device.delete.notification.message"),
        color: "green",
      });

      setOpened(false);
    };

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          size="lg"
          title={t("modal.device.delete.title")}
        >
          <Text>
            {t("modal.device.delete.title")}{" "}
            <strong>
              {remoteDevice.name} ({remoteDevice.id})
            </strong>{" "}
            ?
          </Text>
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => setOpened(false)} color="gray">
              {t("button.cancel")}
            </Button>
            <Button onClick={handleDelete} color="red">
              {t("delete")}
            </Button>
          </Flex>
        </Modal>
        <ActionIcon
          onClick={() => setOpened(true)}
          color="red"
          title={t("device.button.remove")}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </>
    );
  },
);
