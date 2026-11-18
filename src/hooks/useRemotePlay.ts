import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { database } from "../services/database";
import { usePlayerVideo } from "../providers/Player";
import { usePlaybackService } from "../services/playback/usePlaybackService";
import {
  type PingRemotePlayResponse,
  clearRemoteDevice,
  pingRemotePlay,
} from "../services/remotePlay";
import { usePlayVideo } from "./usePlayVideo";

export const useRemotePlay = () => {
  const { handlePlay } = usePlayVideo();
  const { video } = usePlayerVideo();
  const { loadingVideoId } = usePlaybackService();
  const { t } = useTranslation();

  useQuery("remote-request", () => pingRemotePlay(), {
    onSuccess: async (data: PingRemotePlayResponse | null) => {
      if (!data) return;
      if (data.videoId === video?.videoId) return;
      if (data.videoId === loadingVideoId) return;

      handlePlay(data.videoId);
      const settings = await database.getSettings();
      if (settings) {
        clearRemoteDevice(settings.deviceId);
      }
      notifications.show({
        title: t("remote.device.receive.notification.title"),
        message: t("remote.device.receive.notification.message"),
      });
    },
    refetchInterval: 1000,
  });

  return null;
};
