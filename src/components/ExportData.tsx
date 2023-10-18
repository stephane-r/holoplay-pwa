import { Box, Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getAllPlaylists } from "../database/utils";
import { generateAndDownloadFile } from "../utils/generateAndDownloadFile";
import { TransferList } from "./TransferList";

const loadPlaylistData = (data: any[]) => {
  const playlists = getAllPlaylists();
  return data.map((playlist) =>
    playlists.find((p) => p.playlistId ?? String(p.ID) === playlist.value),
  );
};

// const formateToTransferList = (data: Playlist[]) => {
//   return data
//     .filter((item) => item.videos.length > 0)
//     .map((item) => ({
//       value: item.playlistId ?? String(item.ID),
//       label: `${item.title} (${item.videos.length} videos)`,
//     }))
//     .flat();
// };

export const ExportData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.export",
  });
  const [data] = useState<any>(getAllPlaylists().map((p) => p.title));

  console.log(data);

  const handleClick = () => {
    generateAndDownloadFile(loadPlaylistData(data[1]));
    notifications.show({
      title: t("notification.title"),
      message: t("notification.message"),
    });
  };

  return (
    <Box mt="lg">
      <TransferList
        data={data}
        // onChange={setData}
        // titles={[t("left"), t("right")]}
        // breakpoint="sm"
        // searchPlaceholder={t("search.placeholder") as string}
        // nothingFound={t("search.nothing.found")}
      />
      <Flex justify="flex-end" mt="lg">
        <Button onClick={handleClick} disabled={!data.length}>
          {t("button.submit")}
        </Button>
      </Flex>
    </Box>
  );
});
