import { Button, Flex, TextInput } from "@mantine/core";
import { format } from "date-fns";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings, useSettings } from "../providers/Settings";
import { Modal } from "./Modal";

const getDefaultExportFileName = () =>
  `holoplay-export-${format(new Date(), "dd-MM-yyyy")}.json`;

interface ModalExportFilenameProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export const ModalExportFilename: FC<ModalExportFilenameProps> = memo(
  ({ opened, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const settings = useSettings();
    const setSettings = useSetSettings();
    const [fileName, setFileName] = useState(
      settings.exportFileName ?? getDefaultExportFileName(),
    );

    const handleSubmit = () => {
      if (fileName !== getDefaultExportFileName()) {
        const settingsUpdated = {
          exportFileName: fileName,
          exportLastDate: new Date().toISOString(),
        };
        db.update("settings", { ID: 1 }, () => ({
          ...settingsUpdated,
        }));
        db.commit();
        setSettings((previousState) => ({
          ...previousState,
          ...settingsUpdated,
        }));
      }

      return onSubmit(fileName);
    };

    return (
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="lg"
        title={t("modal.export.filename.title")}
      >
        <TextInput
          label={t("modal.export.filename.label")}
          value={fileName}
          onChange={(event) => setFileName(event.target.value)}
        />
        <Flex gap={8} justify="flex-end" mt="xl">
          <Button onClick={handleSubmit}>
            {t("settings.data.export.button.submit")}
          </Button>
        </Flex>
      </Modal>
    );
  },
);
