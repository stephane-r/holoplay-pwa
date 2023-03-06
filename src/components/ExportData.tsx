import {
  Box,
  Button,
  Flex,
  TransferList,
  TransferListData,
  TransferListItem,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
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
  const [data, setData] = useState<TransferListData>([
    // @ts-ignore
    formateToTransferList(getAllPlaylists()),
    [],
  ]);

  const handleClick = () => {
    generateAndDownloadFile(loadPlaylistData(data[1]));
    showNotification({
      title: "Export data",
      message: "Your data has been exported",
    });
  };

  return (
    <Box mt="lg">
      <TransferList
        value={data}
        onChange={setData}
        searchPlaceholder="Search..."
        nothingFound="Nothing here"
        titles={["Your playlist", "Export playlists"]}
        breakpoint="sm"
      />
      <Flex justify="flex-end" mt="lg">
        <Button onClick={handleClick}>Export my data</Button>
      </Flex>
    </Box>
  );
});
