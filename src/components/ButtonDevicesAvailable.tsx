import { ActionIcon, Box, Button, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceDesktop } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayerAudio, usePlayerVideo } from "../providers/Player";
import { useRemoteDevices } from "../providers/Settings";
import { sendToRemoteDevice } from "../services/remotePlay";
import type { RemoteDevice } from "../types/interfaces/Settings";
import { DeviceIcon } from "./DeviceList";

interface ButtonDevicesAvailableProps {
  variant: "icon" | "text";
}

export const ButtonDevicesAvailable: FC<ButtonDevicesAvailableProps> = memo(
  ({ variant }) => {
    const remoteDevices = useRemoteDevices();
    const { video } = usePlayerVideo();
    const playerAudio = usePlayerAudio();
    const { t } = useTranslation();

    if (!remoteDevices.length) {
      return null;
    }

    const handleRemotePlay = async (remoteDevice: RemoteDevice) => {
      if (!video) {
        return;
      }

      await sendToRemoteDevice({
        deviceUuid: remoteDevice.id,
        videoId: video?.videoId,
      });

      notifications.show({
        title: t("remote.device.send.notification.title"),
        message: t("remote.device.send.notification.message"),
      });

      // @ts-ignore
      const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;

      if (!audio.paused) {
        audio.pause();
      }
    };

    return (
      <Box>
        <Menu aria-label="Card menu" shadow="md" width={200}>
          <Menu.Target>
            {variant === "icon" ? (
              <ActionIcon color="transparent">
                <IconDeviceDesktop size={20} />
              </ActionIcon>
            ) : (
              <Button variant="subtle">
                {remoteDevices.length}{" "}
                {t("remote.device.text", { count: remoteDevices.length })}
              </Button>
            )}
          </Menu.Target>
          <Menu.Dropdown>
            {remoteDevices.map((device) => (
              <Menu.Item
                leftSection={<DeviceIcon type={device.type} size={16} />}
                onClick={() => handleRemotePlay(device)}
              >
                <Text size="sm" lineClamp={1}>
                  {device.name}
                </Text>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Box>
    );
  },
);
