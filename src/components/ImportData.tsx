import {
  Alert,
  Box,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import {
  IconFileBarcode,
  IconFileX,
  IconInfoCircle,
  IconUpload,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useImportPlaylistsFile } from "../hooks/useImportPlaylistsFile";
import { useImportSelectedPlaylists } from "../hooks/useImportSelectedPlaylists";
import type { Playlist } from "../types/interfaces/Playlist";
import { TransferList } from "./TransferList";

export const ImportData = memo(() => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { importedFileData, handleDrop, handleReject, clear } =
    useImportPlaylistsFile();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.import",
  });

  return (
    <Box mt="lg">
      <AlertImportInfos />
      {importedFileData ? (
        <TransferListContainer data={importedFileData} onClear={clear} />
      ) : (
        <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          maxSize={10 * 1024 ** 2}
          accept={["application/document", "application/json"]}
        >
          <Group
            style={{
              minHeight: 220,
              pointerEvents: "none",
              justifyContent: "center",
            }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconFileX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileBarcode size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline>
                {t("text")}
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </Box>
  );
});

const AlertImportInfos = memo(() => {
  const { t } = useTranslation();

  return (
    <Alert title="Information" mb="lg">
      <Flex gap="xs">
        <IconInfoCircle />
        <Text size="md">{t("settings.data.import.alert")}</Text>
      </Flex>
    </Alert>
  );
});

interface TransferListContainerProps {
  data: Playlist[];
  onClear(): void;
}

const TransferListContainer: FC<TransferListContainerProps> = memo(
  ({ data: importedFileData }) => {
    const { loading, importSelected } =
      useImportSelectedPlaylists(importedFileData);
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.data.import",
    });

    return (
      <Box mt="lg" pos="relative">
        <LoadingOverlay visible={loading} />
        <TransferList
          data={importedFileData.map((p) => p.title)}
          handleSubmit={importSelected}
          buttonSubmitLabel={t("button.submit")}
        />
      </Box>
    );
  },
);