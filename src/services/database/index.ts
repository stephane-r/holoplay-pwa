import Dexie, { type EntityTable } from "dexie";

import { getCardId } from "../../components/ButtonFavorite";
import type { Card, CardPlaylist, CardVideo } from "../../types/interfaces/Card";
import type {
  FavoritePlaylist,
  Playlist,
} from "../../types/interfaces/Playlist";
import type { SearchHistory } from "../../types/interfaces/Search";
import type { Settings } from "../../types/interfaces/Settings";

const SETTINGS_ID = 1;
const HISTORY_LIMIT = 200;
const SEARCH_HISTORY_LIMIT = 20;

type SettingsRow = Settings & { ID: number };
// `videos` is retyped to `unknown[]` here (instead of `Playlist`'s own
// `Card[] | Video[]`) because `Video.recommendedVideos: Video[]` is
// self-referential, which makes Dexie's deep dot-path update typings
// recurse infinitely. Runtime data is unaffected; call sites already type
// `videos` precisely (e.g. `CardVideo[]`) in each method signature below.
type PlaylistRow = Omit<Playlist, "videos"> & {
  ID: number;
  videos: unknown[];
  createdAt: string;
};
type HistoryRow = CardVideo & { ID: number; createdAt: string };
type SearchHistoryRow = SearchHistory & { ID: number };

export const removeDuplicateVideoId = (cards: Card[]): Card[] => {
  return cards.filter(
    (value, index, self) =>
      index === self.findIndex((t) => getCardId(t) === getCardId(value)),
  );
};

class DatabaseService extends Dexie {
  settings!: EntityTable<SettingsRow, "ID">;
  playlists!: EntityTable<PlaylistRow, "ID">;
  history!: EntityTable<HistoryRow, "ID">;
  searchHistory!: EntityTable<SearchHistoryRow, "ID">;

  constructor() {
    super("holoplay");
    this.version(1).stores({
      settings: "ID",
      playlists: "++ID, title, playlistId",
      history: "++ID, videoId",
      searchHistory: "++ID",
    });
  }

  // --- settings ---

  getSettings() {
    return this.settings.get(SETTINGS_ID);
  }

  updateSettings(changes: Partial<Settings>) {
    return this.settings.update(SETTINGS_ID, changes);
  }

  // --- playlists ---

  getFavoritePlaylist() {
    return this.playlists.where("title").equals("Favorites").first() as
      | Promise<(FavoritePlaylist & { ID: number }) | undefined>;
  }

  getPlaylists() {
    return this.playlists.filter((playlist) => playlist.title !== "Favorites").toArray();
  }

  getAllPlaylists() {
    return this.playlists.toArray();
  }

  getPlaylist(ID: number) {
    return this.playlists.get(ID);
  }

  createPlaylist(data: {
    title: string;
    videos: CardVideo[];
    videoCount: number;
    type: "playlist";
  }) {
    return this.playlists.add({
      createdAt: new Date().toISOString(),
      playlistThumbnail: "",
      ...data,
    });
  }

  importPlaylist(playlist: Partial<Playlist> & { title: string }) {
    return this.playlists.put({
      createdAt: new Date().toISOString(),
      type: "playlist",
      ...playlist,
    } as PlaylistRow);
  }

  updatePlaylistTitle(ID: number, title: string) {
    return this.playlists.update(ID, { title });
  }

  updatePlaylistVideos(title: string, videos: CardVideo[]) {
    return this.playlists.where("title").equals(title).modify({ videos });
  }

  async addVideoToPlaylist(title: string, video: CardVideo) {
    const playlist = await this.playlists.where("title").equals(title).first();
    if (!playlist) return;
    const videos = [video, ...(playlist.videos as CardVideo[])];
    await this.playlists.update(playlist.ID, { videos, videoCount: videos.length });
  }

  async removeVideoFromPlaylist(ID: number, videoId: string) {
    const playlist = await this.playlists.get(ID);
    if (!playlist) return;
    const videos = (playlist.videos as CardVideo[]).filter(
      (video) => video.videoId !== videoId,
    );
    await this.playlists.update(ID, { videos });
  }

  deletePlaylist(ID: number) {
    return this.playlists.delete(ID);
  }

  saveRemotePlaylist(playlist: CardPlaylist) {
    return this.playlists.add(playlist as unknown as PlaylistRow);
  }

  deleteRemotePlaylist(playlistId: string) {
    return this.playlists.where("playlistId").equals(playlistId).delete();
  }

  async setFavoriteCards(cards: Card[]) {
    const favorite = await this.getFavoritePlaylist();
    if (!favorite) return;
    await this.playlists.update(favorite.ID, { cards } as Partial<PlaylistRow>);
  }

  async importVideosToFavorites(cards: Card[]) {
    const favorite = await this.getFavoritePlaylist();
    if (!favorite) return;
    await this.setFavoriteCards(
      removeDuplicateVideoId([...cards, ...(favorite.cards ?? [])]),
    );
  }

  // --- history ---

  getVideosHistory() {
    return this.history.orderBy("ID").reverse().toArray();
  }

  async getLastVideoPlayed() {
    return (await this.getVideosHistory())[0];
  }

  async addToHistory(video: CardVideo) {
    await this.history.add({
      ...video,
      createdAt: new Date().toISOString(),
    } as HistoryRow);

    const count = await this.history.count();
    if (count > HISTORY_LIMIT) {
      const toDelete = await this.history
        .orderBy("ID")
        .limit(count - HISTORY_LIMIT)
        .primaryKeys();
      await this.history.bulkDelete(toDelete);
    }
  }

  // --- search history ---

  getSearchHistory() {
    return this.searchHistory.orderBy("ID").reverse().limit(5).toArray();
  }

  async addSearchTerm(term: string) {
    const [lastTerm] = await this.searchHistory.orderBy("ID").reverse().limit(1).toArray();
    if (lastTerm?.term === term) return;

    await this.searchHistory.add({
      term,
      createdAt: new Date().toISOString(),
    } as SearchHistoryRow);

    const count = await this.searchHistory.count();
    if (count > SEARCH_HISTORY_LIMIT) {
      const toDelete = await this.searchHistory
        .orderBy("ID")
        .limit(count - SEARCH_HISTORY_LIMIT)
        .primaryKeys();
      await this.searchHistory.bulkDelete(toDelete);
    }
  }
}

export const database = new DatabaseService();
