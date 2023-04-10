import {
  Box,
  Button,
  Flex,
  TransferList,
  TransferListData,
  TransferListItem,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { memo, useState } from "react";
import { getAllPlaylists } from "../database/utils";
import { Playlist } from "../types/interfaces/Playlist";
import { generateAndDownloadFile } from "../utils/generateAndDownloadFile";

const loadPlaylistData = (data: TransferListItem[]) => {
  const playlists = getAllPlaylists();
  return data.map((playlist) =>
    playlists.find((p) => p.playlistId ?? String(p.ID) === playlist.value)
  );
};

const formateToTransferList = (data: Playlist[]) => {
  return data
    .filter((item) => item.videos.length > 0)
    .map((item) => ({
      value: item.playlistId ?? String(item.ID),
      label: `${item.title} (${item.videos.length} videos)`,
    }))
    .flat();
};

export const ExportData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.export",
  });
  const [data, setData] = useState<TransferListData>([
    // @ts-ignore
    formateToTransferList(
      getAllPlaylists().map((p) => ({
        ...p,
        playlistName: p.title,
      }))
    ),
    [],
  ]);

  const handleClick = () => {
    generateAndDownloadFile(loadPlaylistData(data[1]));
    showNotification({
      title: t("notification.title"),
      message: t("notification.message"),
    });
  };

  return (
    <Box mt="lg">
      <TransferList
        value={data}
        onChange={setData}
        titles={[t("left"), t("right")]}
        breakpoint="sm"
        searchPlaceholder={t("search.placeholder") as string}
        nothingFound={t("search.nothing.found")}
      />
      <Flex justify="flex-end" mt="lg">
        <Button onClick={handleClick} disabled={!data[1].length}>
          {t("button.submit")}
        </Button>
      </Flex>
    </Box>
  );
});
