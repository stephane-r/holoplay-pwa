import { Box, Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { getAllPlaylists } from "../database/utils";
import { Playlist } from "../types/interfaces/Playlist";
import { generateAndDownloadFile } from "../utils/generateAndDownloadFile";
import { TransferList, TransferListData } from "./TransferList";

const loadPlaylistData = (playlistsTitle: string[]) => {
  const playlists = getAllPlaylists();
  return playlists.filter((p) => playlistsTitle.includes(p.title));
};

const formatePlaylistsToExport = (playlists: Playlist[]) => {
  return playlists.map((p) => ({
    ...p,
    videos: p.videos.map((v) => v.videoId),
  }));
};

export const ExportData = memo(() => {
  const userData = getAllPlaylists().map((p) => p.title);
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.export",
  });

  const handleSubmit = (data: TransferListData) => {
    const [, importData] = data;
    const playlists = loadPlaylistData(importData);
    const formatedPlaylists = formatePlaylistsToExport(playlists);
    generateAndDownloadFile({ playlists: formatedPlaylists });
    notifications.show({
      title: t("notification.title"),
      message: t("notification.message"),
    });
  };

  return (
    <Box mt="lg">
      <TransferList
        data={userData}
        handleSubmit={handleSubmit}
        buttonSubmitLabel={t("button.submit")}
      />
    </Box>
  );
});
