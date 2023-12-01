import { Box, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { format } from "date-fns";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getAllPlaylists } from "../database/utils";
import { useSettings } from "../providers/Settings";
import { generateAndDownloadFile } from "../utils/generateAndDownloadFile";
import { ModalExportFilename } from "./ModalExportFilename";
import { TransferList } from "./TransferList";

const loadPlaylistData = (playlistsTitle: string[]) =>
  getAllPlaylists().filter((p) => playlistsTitle.includes(p.title));

export const ExportData = memo(() => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.export",
  });
  const [exportData, setExportData] = useState<string[]>([]);
  const userData = useMemo(() => getAllPlaylists().map((p) => p.title), []);

  const handleDownloadFile = useCallback(
    (fileName: string) => {
      setOpened(false);
      const playlists = loadPlaylistData(exportData);
      generateAndDownloadFile({ playlists }, fileName);
      notifications.show({
        title: t("notification.title"),
        message: t("notification.message"),
      });
    },
    [exportData, t],
  );

  const handleSubmit = useCallback((importData: string[]) => {
    setExportData(importData);
    setOpened(true);
  }, []);

  return (
    <Box mt="lg">
      <BlockLastExport />
      <TransferList
        data={userData}
        handleSubmit={handleSubmit}
        buttonSubmitLabel={t("button.submit")}
      />
      <ModalExportFilename
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmit={handleDownloadFile}
      />
    </Box>
  );
});

const BlockLastExport = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation();

  if (settings.exportLastDate === "") {
    return null;
  }

  return (
    <Text mb="md">
      {t("settings.data.export.last.date")} :{" "}
      <strong>
        {format(new Date(settings.exportLastDate as string), "dd-MM-yyyy")}
      </strong>
    </Text>
  );
});
