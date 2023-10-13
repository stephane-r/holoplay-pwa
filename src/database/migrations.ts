import { db } from ".";
import { Migration } from "../types/interfaces/Migration";

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
})();
