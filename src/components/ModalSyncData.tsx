import {
  Box,
  Button,
  Flex,
  MediaQuery,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import useDigitInput from "react-digit-input";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import {
  getFavoritePlaylist,
  importPlaylist,
  importVideosToFavorites,
} from "../database/utils";
import { getPlaylists } from "../database/utils";
import { useSetFavorite } from "../providers/Favorite";
import { useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ModalSyncDataProps {
  opened: boolean;
  onClose: () => void;
}

const syncData = async (code: string): Promise<Playlist[]> => {
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/sync/${code}`,
  );
  const { data } = await request.json();
  return data;
};

export const ModalSyncData: React.FC<ModalSyncDataProps> = memo(
  ({ opened, onClose }) => {
    const [value, onChange] = useState("");
    const { t } = useTranslation();
    const digits = useDigitInput({
      acceptedCharacters: /^[0-9]$/,
      length: 6,
      value,
      onChange,
    });
    const [enabled, setEnabled] = useState(false);
    const setFavorite = useSetFavorite();
    const setPlaylists = useSetPlaylists();
    const theme = useMantineTheme();

    const { isLoading } = useQuery("sync", async () => syncData(value), {
      enabled,
      onSuccess: (data) => {
        setEnabled(false);
        importData(data);
      },
      retry: false,
      onError: () => {
        notifications.show({
          title: t("modal.sync.notification.error.title"),
          message: t("modal.sync.notification.error.message"),
          color: "red",
        });
        setEnabled(false);
      },
    });

    const importData = async (data: Playlist[]) => {
      const favoritesPlaylist = data.find(
        (playlist) => playlist.title === "Favorites",
      );
      const playlists = data.filter(
        (playlist) => playlist.title !== "Favorites",
      );

      if (favoritesPlaylist) {
        importVideosToFavorites(favoritesPlaylist.videos);
        setFavorite(getFavoritePlaylist());
      }

      if (playlists.length > 0) {
        playlists.map(async (playlist) => {
          importPlaylist(playlist);
          setPlaylists(getPlaylists());
        });
      }

      notifications.show({
        title: t("modal.sync.notification.success.title"),
        message: t("modal.sync.notification.success.message"),
        color: "green",
      });

      onClose();
    };

    const handleSubmit = () => {
      setEnabled(true);
    };

    return (
      <Modal
        opened={opened}
        onClose={() => onClose()}
        centered
        size="lg"
        title={t("modal.sync.title")}
        overlayProps={{
          blur: 3,
        }}
      >
        <Form onSubmit={() => handleSubmit()}>
          <Text mb="lg">{t("modal.sync.text")}</Text>
          <Flex gap={12} justify="center" align="center" pt="xl" pb="xl">
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[0]}
                inputMode="decimal"
              />
            </Box>
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[1]}
                inputMode="decimal"
              />
            </Box>
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[2]}
                inputMode="decimal"
              />
            </Box>
            <Box>-</Box>
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[3]}
                inputMode="decimal"
              />
            </Box>
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[4]}
                inputMode="decimal"
              />
            </Box>
            <Box style={{ maxWidth: 46, textAlign: "center" }}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[5]}
                inputMode="decimal"
              />
            </Box>
          </Flex>
          <Flex gap={8} justify="flex-end" mt="xl">
            <MediaQuery
              query={`(max-width: ${theme.breakpoints.xs})`}
              styles={{ display: "none" }}
            >
              <Box>
                <Button onClick={() => onClose()} color="gray">
                  {t("button.cancel")}
                </Button>
              </Box>
            </MediaQuery>
            <Button
              type="submit"
              loading={isLoading}
              disabled={digits.some(({ value }) => value === "")}
            >
              {t("modal.sync.button.submit")}
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  },
);
