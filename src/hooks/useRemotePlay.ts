import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { getSettings } from "../database/utils";
import { usePlayerVideo } from "../providers/Player";
import {
  type PingRemotePlayResponse,
  clearRemoteDevice,
  pingRemotePlay,
} from "../services/remotePlay";
import { usePlayVideo } from "./usePlayVideo";

export const useRemotePlay = () => {
  const { handlePlay, loading } = usePlayVideo();
  const { video } = usePlayerVideo();
  const { t } = useTranslation();

  useQuery("remote-request", () => pingRemotePlay(), {
    onSuccess: (data: PingRemotePlayResponse | null) => {
      if (!data || (data?.videoId === video?.videoId && !loading)) return;

      handlePlay(data.videoId);
      clearRemoteDevice(getSettings().deviceId);
      notifications.show({
        title: t("remote.device.receive.notification.title"),
        message: t("remote.device.receive.notification.message"),
      });
    },
    refetchInterval: 1000,
  });

  return null;
};
