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
import { Dropzone, type FileRejection } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { notifications } from "@mantine/notifications";
import {
  IconFileBarcode,
  IconFileX,
  IconInfoCircle,
  IconUpload,
} from "@tabler/icons-react";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getFavoritePlaylist,
  importPlaylist,
  importVideosToFavorites,
  updatePlaylistVideos,
} from "../database/utils";
import { getPlaylists } from "../database/utils";
import { useFavorite, useSetFavorite } from "../providers/Favorite";
import { usePlaylists, useSetPlaylists } from "../providers/Playlist";
import type { CardVideo } from "../types/interfaces/Card";
import type { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import {
  getArrayDifference,
  getPlaylistId,
  getUpdatedPlaylists,
} from "../utils/getArrayDifference";
import { TransferList } from "./TransferList";

export const ImportData = memo(() => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [importedFileData, setImportedFileData] = useState<Playlist[] | null>(
    null,
  );
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.import",
  });

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const fileData = JSON.parse(event.target?.result as string);
      setImportedFileData(fileData?.playlists ?? fileData);
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

  return (
    <Box mt="lg">
      <AlertImportInfos />
      {importedFileData ? (
        <TransferListContainer
          data={importedFileData}
          onClear={() => setImportedFileData(null)}
        />
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

const loadPlaylistsFromFileData = (
  playlists: Playlist[],
  playlistsTitle: string[],
) => playlists.filter((p) => playlistsTitle.includes(p.title));

const TransferListContainer: FC<TransferListContainerProps> = memo(
  ({ data: importedFileData, onClear }) => {
    const currentFavoritePlaylist = useFavorite();
    const currentPlaylists = usePlaylists();
    const setFavorite = useSetFavorite();
    const setPlaylists = useSetPlaylists();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.data.import",
    });

    const handleSubmit = async (importData: string[]) => {
      setLoading(true);

      try {
        const playlists = loadPlaylistsFromFileData(
          importedFileData,
          importData,
        );
        const importedFavoritePlaylist = playlists.find(
          (p) => p.title === "Favorites",
        ) as FavoritePlaylist;
        const importedPlaylists = playlists.filter(
          (p) => p.title !== "Favorites",
        );

        if (importedFavoritePlaylist) {
          const newCards = getArrayDifference(
            currentFavoritePlaylist.cards,
            importedFavoritePlaylist.cards,
          );

          if (newCards.length > 0) {
            importVideosToFavorites(newCards);
            setFavorite(getFavoritePlaylist());
          }
        }

        if (importedPlaylists.length > 0) {
          const newPlaylists = getArrayDifference(
            currentPlaylists,
            importedPlaylists,
            getPlaylistId,
          );
          const updatedPlaylists = getUpdatedPlaylists(
            currentPlaylists,
            importedPlaylists,
          ) as Playlist[];

          if (newPlaylists.length > 0) {
            for (const playlist of newPlaylists) {
              importPlaylist({
                type: "playlist",
                playlistId: playlist.playlistId ?? undefined,
                ID: playlist.ID ?? undefined,
                title: playlist.title,
                videos: playlist.videos as CardVideo[],
                videoCount: playlist.videos.length,
              });
            }
          }

          if (updatedPlaylists.length > 0) {
            for (const playlist of updatedPlaylists) {
              updatePlaylistVideos(
                playlist.title,
                playlist.videos as CardVideo[],
              );
            }
          }

          setPlaylists(getPlaylists());
        }

        notifications.show({
          title: t("notification.title"),
          message: t("notification.message"),
        });
      } catch (error) {
        console.log(error);
        notifications.show({
          title: t("notification.error.title"),
          message: t("notification.error.message"),
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <Box mt="lg" pos="relative">
        <LoadingOverlay visible={loading} />
        <TransferList
          data={importedFileData.map((p) => p.title)}
          handleSubmit={handleSubmit}
          buttonSubmitLabel={t("button.submit")}
        />
      </Box>
    );
  },
);
