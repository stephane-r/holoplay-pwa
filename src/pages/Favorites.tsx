import { memo } from "react";
import { useTranslation } from "next-i18next";

import { FavoritePlaylist } from "../components/FavoritePlaylist";
import { PageHeader } from "../components/PageHeader";

export const FavoritesPage = memo(() => {
  const { t } = useTranslation("common");

  return (
    <div>
      <PageHeader title={t("page.favorites.title")} />
      <FavoritePlaylist />
    </div>
  );
});
