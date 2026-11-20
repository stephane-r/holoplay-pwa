import { useId, useState } from "react";
import useDigitInput from "react-digit-input";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { database } from "../services/database";
import type { CardPlaylist } from "../types/interfaces/Card";
import { notifyError, notifySuccess } from "../utils/notify";

const syncData = async (code: string): Promise<CardPlaylist[]> => {
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/sync/${code}`,
  );
  if (!request.ok) {
    throw new Error(`Sync request failed with status ${request.status}`);
  }
  const { data } = await request.json();
  if (!Array.isArray(data)) {
    throw new Error("Sync request returned no data");
  }
  return data;
};

// Looking up a backup code and importing the playlists/favorites it
// resolves to — split out of ModalSyncData.tsx so that component only
// renders the digit-input form.
export const useSyncData = (onClose: () => void) => {
  // ModalSyncData is mounted twice at once — once behind the desktop navbar
  // trigger (ButtonSyncData), once behind the mobile header trigger
  // (SyncActionIcon, merely CSS-hidden above that breakpoint, not unmounted)
  // — so a shared "sync" query key would let one instance's resolved fetch
  // fire the other's onSuccess too (same react-query cache entry), running
  // importData twice for a single submission.
  const queryKey = useId();
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
      await database.importVideosToFavorites(favoritesPlaylist.cards ?? []);
    }

    if (playlists.length > 0) {
      await Promise.all(
        playlists.map((playlist) => database.importPlaylist(playlist)),
      );
    }

    notifySuccess({
      title: t("modal.sync.notification.success.title"),
      message: t("modal.sync.notification.success.message"),
    });

    onClose();
  };

  const notifySyncError = () => {
    notifyError({
      title: t("modal.sync.notification.error.title"),
      message: t("modal.sync.notification.error.message"),
    });
  };

  const { isLoading } = useQuery([queryKey, "sync"], async () => syncData(value), {
    enabled,
    // Always re-run with the current `value`: this query key never
    // changes even though the code being looked up does, so the global
    // default staleTime would otherwise let a resubmission return a
    // cached result for a different code.
    staleTime: 0,
    onSuccess: async (data) => {
      setEnabled(false);
      try {
        await importData(data);
      } catch {
        notifySyncError();
      }
    },
    retry: false,
    onError: () => {
      notifySyncError();
      setEnabled(false);
    },
  });

  const handleSubmit = () => {
    setEnabled(true);
  };

  return { digits, isLoading, handleSubmit };
};
