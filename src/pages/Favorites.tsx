import { memo } from "react";
import { useTranslation } from "react-i18next";

import { FavoritePlaylist } from "../components/FavoritePlaylist";
import { PageHeader } from "../components/PageHeader";

export const FavoritesPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.favorites.title")} />
      <FavoritePlaylist />
    </div>
  );
});
