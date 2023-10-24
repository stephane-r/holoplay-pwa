import { db } from ".";
import type { Migration } from "../types/interfaces/Migration";

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
      require("./05092023_migrate_custom_instance").default();
      saveMigration("05092023_migrate_custom_instance");
    } catch {}
  }

  if (
    !migrationsName.includes("13102023_migrate_remove_card_image_url_domain")
  ) {
    try {
      require("./13102023_migrate_remove_card_image_url_domain").default();
      saveMigration("13102023_migrate_remove_card_image_url_domain");
    } catch {}
  }

  if (
    !migrationsName.includes(
      "13102023_migrate_remove_recommended_videos_image_url_domain",
    )
  ) {
    try {
      require("./13102023_migrate_remove_recommended_videos_image_url_domain").default();
      saveMigration(
        "13102023_migrate_remove_recommended_videos_image_url_domain",
      );
    } catch {}
  }

  if (!migrationsName.includes("18102023_migrate_formate_storage_data")) {
    try {
      require("./18102023_migrate_formate_storage_data").default();
      saveMigration("18102023_migrate_formate_storage_data");
    } catch {}
  }

  if (
    !migrationsName.includes("19102023_migrate_playlist_favorite_cards_key")
  ) {
    try {
      require("./19102023_migrate_playlist_favorite_cards_key").default();
      saveMigration("19102023_migrate_playlist_favorite_cards_key");
    } catch {}
  }
})();
