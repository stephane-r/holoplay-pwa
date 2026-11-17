import { database } from ".";

const MIGRATION_FLAG = "holoplay_dexie_migrated";

export const migrateFromLocalStorageIfNeeded = async (): Promise<void> => {
  if (localStorage.getItem(MIGRATION_FLAG)) {
    return;
  }

  try {
    // Importing the legacy module runs its own synchronous bootstrap
    // (initDb + the numbered migrations), guaranteeing any pending legacy
    // data fixups have already run before anything is copied over.
    const { db } = await import("../../database");

    const settings = db.queryAll("settings");
    const playlists = db.queryAll("playlists");
    const history = db.queryAll("history");
    const searchHistory = db.queryAll("searchHistory");

    await database.transaction(
      "rw",
      [database.settings, database.playlists, database.history, database.searchHistory],
      async () => {
        if (settings.length) await database.settings.bulkPut(settings);
        if (playlists.length) await database.playlists.bulkPut(playlists);
        if (history.length) await database.history.bulkPut(history);
        if (searchHistory.length) {
          await database.searchHistory.bulkPut(searchHistory);
        }
      },
    );
  } catch (error) {
    console.error("Failed to migrate legacy localStorage database", error);
  } finally {
    // Mark done even on failure: this is a one-shot best-effort import of a
    // legacy store that's left untouched either way (see plan), so retrying
    // forever on a persistent error would just repeat the same failure on
    // every future app load.
    localStorage.setItem(MIGRATION_FLAG, "true");
  }
};
