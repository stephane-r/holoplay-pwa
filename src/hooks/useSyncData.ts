import { notifications } from "@mantine/notifications";
import { useState } from "react";
import useDigitInput from "react-digit-input";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { database } from "../services/database";
import type { Card, CardPlaylist } from "../types/interfaces/Card";

const syncData = async (code: string): Promise<CardPlaylist[]> => {
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/sync/${code}`,
  );
  const { data } = await request.json();
  return data;
};

// Looking up a backup code and importing the playlists/favorites it
// resolves to — split out of ModalSyncData.tsx so that component only
// renders the digit-input form.
export const useSyncData = (onClose: () => void) => {
  const [value, onChange] = useState("");
  const { t } = useTranslation();
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value,
    onChange,
  });
  const [enabled, setEnabled] = useState(false);

  const importData = async (data: CardPlaylist[]) => {
    const favoritesPlaylist = data.find(
      (playlist) => playlist.title === "Favorites",
    );
    const playlists = data.filter((playlist) => playlist.title !== "Favorites");

    if (favoritesPlaylist) {
      await database.importVideosToFavorites(favoritesPlaylist.videos as Card[]);
    }

    if (playlists.length > 0) {
      await Promise.all(
        playlists.map((playlist) => database.importPlaylist(playlist)),
      );
    }

    notifications.show({
      title: t("modal.sync.notification.success.title"),
      message: t("modal.sync.notification.success.message"),
      color: "green",
    });

    onClose();
  };

  const { isLoading } = useQuery("sync", async () => syncData(value), {
    enabled,
    // Always re-run with the current `value`: this query key never
    // changes even though the code being looked up does, so the global
    // default staleTime would otherwise let a resubmission return a
    // cached result for a different code.
    staleTime: 0,
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

  const handleSubmit = () => {
    setEnabled(true);
  };

  return { digits, isLoading, handleSubmit };
};
