import {
  Box,
  Button,
  Flex,
  Group,
  Text,
  TransferList as MTransferList,
  TransferListData,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconFileBarcode, IconFileX, IconUpload } from "@tabler/icons-react";
import { memo, useState } from "react";
import {
  getFavoritePlaylist,
  importVideosToFavorites,
} from "../database/utils";
import { Dropzone } from "@mantine/dropzone";
import { useSetFavorite } from "../providers/Favorite";
import { getVideo } from "../services/video";
import { Video } from "../types/interfaces/Video";

export const formateToTransferList = (data: ImportDataType[]) => {
  return data
    .filter((item) => item.videos.length > 0)
    .map((item) =>
      item.videos.map((video) => ({
        value: video.videoId,
        label: video.title,
        group: item.playlistName,
      }))
    )
    .flat();
};

interface ImportDataType {
  playlistName: string;
  protected: boolean;
  videos: Video[];
}

export const ImportData = memo(() => {
  const theme = useMantineTheme();
  const [importedFileData, setImportedFileData] = useState<
    ImportDataType[] | null
  >(null);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const fileData = JSON.parse(event.target?.result as string);
      setImportedFileData(fileData);
    });
    reader.readAsText(file);
  };

  return (
    <Box mt="lg">
      {importedFileData ? (
        <TransferList
          importedFileData={importedFileData}
          onClear={() => setImportedFileData(null)}
        />
      ) : (
        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={["application/document", "application/json"]}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconFileX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileBarcode size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline>
                Drag you JSON file here or click to select files
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </Box>
  );
});

const TransferList = memo(
  ({
    importedFileData,
    onClear,
  }: {
    importedFileData: ImportDataType[];
    onClear: () => void;
  }) => {
    const setFavorite = useSetFavorite();
    const [loading, setLoading] = useState(false);
    const [importData, setImportData] = useState<TransferListData>([
      formateToTransferList(importedFileData),
      [],
    ]);

    const handleImportData = async () => {
      setLoading(true);
      const importedVideos = importedFileData
        ?.map((item) => item.videos)
        .flat();
      const selectedVideoIds = importData[1].map((item) => item.value);
      const videos = importedVideos?.filter((item) =>
        selectedVideoIds.includes(item.videoId)
      ) as Video[];

      const promises = [];
      for (const video of videos) {
        promises.push(getVideo(video.videoId));
      }

      const videosData = await Promise.all(promises);

      importVideosToFavorites(videosData.map(({ video }) => video));
      setFavorite(getFavoritePlaylist());
      setLoading(false);

      showNotification({
        title: "Import data",
        message: "Data imported successfully",
      });

      onClear();
      setImportData([[], []]);
    };

    return (
      <Box mt="lg">
        <MTransferList
          value={importData}
          onChange={setImportData}
          titles={["File data", "Imported data"]}
          breakpoint="sm"
          searchPlaceholder="Search..."
          nothingFound="Nothing here"
          listHeight={300}
        />
        <Flex justify="flex-end">
          <Button
            mt="lg"
            loading={loading}
            disabled={!importData[1].length}
            onClick={handleImportData}
          >
            Import data
          </Button>
        </Flex>
      </Box>
    );
  }
);
