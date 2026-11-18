import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useFavorite } from "../providers/Favorite";
import { usePlaylists } from "../providers/Playlist";
import { database } from "../services/database";
import type { CardVideo } from "../types/interfaces/Card";
import type { FavoritePlaylist, Playlist } from "../types/interfaces/Playlist";
import {
  getArrayDifference,
  getPlaylistId,
  getUpdatedPlaylists,
} from "../utils/getArrayDifference";
import { notifyError } from "../utils/notify";

const loadPlaylistsFromFileData = (
  playlists: Playlist[],
  playlistsTitle: string[],
) => playlists.filter((p) => playlistsTitle.includes(p.title));

// Diffing the imported file's playlists/favorites against what's already in
// the user's library and writing only what's new/changed — split out of
// ImportData.tsx's TransferListContainer so that component only renders the
// transfer-list UI.
export const useImportSelectedPlaylists = (importedFileData: Playlist[]) => {
  const currentFavoritePlaylist = useFavorite();
  const currentPlaylists = usePlaylists();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.import",
  });

  const importSelected = async (importData: string[]) => {
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
          await database.importVideosToFavorites(newCards);
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
          await Promise.all(
            newPlaylists.map((playlist) =>
              database.importPlaylist({
                type: "playlist",
                playlistId: playlist.playlistId ?? undefined,
                ID: playlist.ID ?? undefined,
                title: playlist.title,
                videos: playlist.videos as CardVideo[],
                videoCount: playlist.videos.length,
              }),
            ),
          );
        }

        if (updatedPlaylists.length > 0) {
          await Promise.all(
            updatedPlaylists.map((playlist) =>
              database.updatePlaylistVideos(
                playlist.title,
                playlist.videos as CardVideo[],
              ),
            ),
          );
        }
      }

      notifications.show({
        title: t("notification.title"),
        message: t("notification.message"),
      });
    } catch (error) {
      console.log(error);
      notifyError({
        title: t("notification.error.title"),
        message: t("notification.error.message"),
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, importSelected };
};
