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
// @ts-ignore
import { map as cappedAll } from "awaiting";
import { type FC, memo, useState } from "react";
import { useTranslation } from "next-i18next";

import {
  getFavoritePlaylist,
  importPlaylist,
  importVideosToFavorites,
} from "../database/utils";
import { getPlaylists } from "../database/utils";
import { useSetFavorite } from "../providers/Favorite";
import { useSetPlaylists } from "../providers/Playlist";
import { getVideo } from "../services/video";
import type { Card, CardVideo } from "../types/interfaces/Card";
import type { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import type { Video } from "../types/interfaces/Video";
import { TransferList, type TransferListData } from "./TransferList";

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
  return (
    <Alert mb="lg">
      <Flex gap="xs">
        <IconInfoCircle />
        <Text size="md">
          Only <strong>Invidious</strong> and <strong>HoloPlay</strong> export
          file can be imported for now.
        </Text>
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

type FetchVideosData = {
  video: Card;
  url: string;
}[];

const getVideosData = async (
  videos: Card[],
): Promise<{
  validData: FetchVideosData;
  invalidData: FetchVideosData;
}> => {
  const data = (await cappedAll(videos, 5, (video: Video) =>
    getVideo(video.videoId),
  )) as FetchVideosData;
  const validData = data.filter(
    ({ url }) => url !== undefined,
  ) as FetchVideosData;
  const invalidData = data.filter(
    ({ url }) => url === undefined,
  ) as FetchVideosData;

  return {
    validData,
    invalidData,
  };
};

const TransferListContainer: FC<TransferListContainerProps> = memo(
  ({ data: importedFileData, onClear }) => {
    const setFavorite = useSetFavorite();
    const setPlaylists = useSetPlaylists();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.data.import",
    });

    const handleSubmit = async (transferListData: TransferListData) => {
      setLoading(true);

      try {
        const [, importData] = transferListData;
        const playlists = loadPlaylistsFromFileData(
          importedFileData,
          importData,
        );
        const favoritePlaylist = playlists.find(
          (p) => p.title === "Favorites",
        ) as FavoritePlaylist;
        const userPlaylists = playlists.filter((p) => p.title !== "Favorites");

        if (favoritePlaylist) {
          const { validData } = await getVideosData(favoritePlaylist.cards);
          importVideosToFavorites(validData.map(({ video }) => video));
          setFavorite(getFavoritePlaylist());
        }

        if (userPlaylists.length > 0) {
          userPlaylists.map(async (playlist) => {
            const { validData: videos } = await getVideosData(
              playlist.videos as CardVideo[],
            );
            importPlaylist({
              type: "playlist",
              playlistId: playlist.playlistId,
              ID: playlist.ID,
              title: playlist.title,
              videos: videos.map(({ video }) => video) as CardVideo[],
              videoCount: videos.length,
            });
            setPlaylists(getPlaylists());
          });
        }

        notifications.show({
          title: t("notification.title"),
          message: t("notification.message"),
        });
      } catch (error) {
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
