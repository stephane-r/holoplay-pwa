import { db } from ".";
import type { Migration } from "../types/interfaces/Migration";

import migrateCustomInstance from "./05092023_migrate_custom_instance";
import migrateRemoveCardImageUrlDomain from "./13102023_migrate_remove_card_image_url_domain";
import migrateRemoveRecommendedVideosImageUrlDomain from "./13102023_migrate_remove_recommended_videos_image_url_domain";
import migrateFormatStorageData from "./18102023_migrate_formate_storage_data";
import migratePlaylistFavoriteCardsKey from "./19102023_migrate_playlist_favorite_cards_key";

const migrations = db.queryAll("migrations") as Migration[];

const saveMigration = (name: string) => {
  db.insert("migrations", {
    name,
    createdAt: new Date().toISOString(),
  });
  db.commit();
};

export default (() => {
  const migrationsName = migrations.map((migration) => migration.name);

  if (!migrationsName.includes("05092023_migrate_custom_instance")) {
    try {
      migrateCustomInstance();
      saveMigration("05092023_migrate_custom_instance");
    } catch {}
  }

  if (
    !migrationsName.includes("13102023_migrate_remove_card_image_url_domain")
  ) {
    try {
      migrateRemoveCardImageUrlDomain();
      saveMigration("13102023_migrate_remove_card_image_url_domain");
    } catch {}
  }

  if (
    !migrationsName.includes(
      "13102023_migrate_remove_recommended_videos_image_url_domain",
    )
  ) {
    try {
      migrateRemoveRecommendedVideosImageUrlDomain();
      saveMigration(
        "13102023_migrate_remove_recommended_videos_image_url_domain",
      );
    } catch {}
  }

  if (!migrationsName.includes("18102023_migrate_formate_storage_data")) {
    try {
      migrateFormatStorageData();
      saveMigration("18102023_migrate_formate_storage_data");
    } catch {}
  }

  if (
    !migrationsName.includes("19102023_migrate_playlist_favorite_cards_key")
  ) {
    try {
      migratePlaylistFavoriteCardsKey();
      saveMigration("19102023_migrate_playlist_favorite_cards_key");
    } catch {}
  }
})();
