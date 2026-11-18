import { notifications } from "@mantine/notifications";
import { type FileRejection } from "@mantine/dropzone";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Playlist } from "../types/interfaces/Playlist";

// Parsing the dropped export file and holding its contents until the user
// picks which playlists to import — split out of ImportData.tsx so that
// component only renders the dropzone/transfer-list UI.
export const useImportPlaylistsFile = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.import",
  });
  const [importedFileData, setImportedFileData] = useState<Playlist[] | null>(
    null,
  );

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      try {
        const fileData = JSON.parse(event.target?.result as string);
        setImportedFileData(fileData?.playlists ?? fileData);
      } catch {
        notifications.show({
          title: t("notification.error.title"),
          message: t("notification.error.message"),
          color: "red",
        });
      }
    });
    reader.readAsText(file);
  };

  const handleReject = ([file]: FileRejection[]) => {
    const [error] = file.errors;
    notifications.show({
      title: t("notification.error.title"),
      message: error.message,
      color: "red",
    });
  };

  const clear = () => setImportedFileData(null);

  return { importedFileData, handleDrop, handleReject, clear };
};
