import type {
  Search,
  SearchDate,
  SearchDuration,
  SearchService,
  SearchSortBy,
  SearchTypes,
} from "../types/interfaces/Search";

// Single source of truth for every filter's options (value + i18n key),
// shared between the filters menu (SearchFiltersMenu) and the active-filter
// recap (ActiveSearchFilters) so they can never drift out of sync with
// each other.
export const SEARCH_TYPE_OPTIONS: {
  value: SearchTypes | "all";
  labelKey: string;
}[] = [
  { value: "video", labelKey: "search.filter.type.videos" },
  { value: "playlist", labelKey: "search.filter.type.playlists" },
  { value: "channel", labelKey: "search.filter.type.channel" },
  { value: "all", labelKey: "search.filter.type.all" },
];

export const SEARCH_SORT_OPTIONS: { value: SearchSortBy; labelKey: string }[] =
  [
    { value: "relevance", labelKey: "search.filter.sort.relevance" },
    { value: "rating", labelKey: "search.filter.sort.rating" },
    { value: "upload_date", labelKey: "search.filter.sort.upload-date" },
    { value: "view_count", labelKey: "search.filter.sort.view-count" },
  ];

export const SEARCH_TIME_OPTIONS: { value: SearchDate; labelKey: string }[] = [
  { value: "all", labelKey: "search.filter.time.all" },
  { value: "hour", labelKey: "search.filter.time.hour" },
  { value: "today", labelKey: "search.filter.time.today" },
  { value: "week", labelKey: "search.filter.time.week" },
  { value: "month", labelKey: "search.filter.time.month" },
  { value: "year", labelKey: "search.filter.time.year" },
];

export const SEARCH_DURATION_OPTIONS: {
  value: SearchDuration;
  labelKey: string;
}[] = [
  { value: "all", labelKey: "search.filter.duration.all" },
  { value: "short", labelKey: "search.filter.duration.short" },
  { value: "long", labelKey: "search.filter.duration.long" },
  { value: "medium", labelKey: "search.filter.duration.medium" },
];

export const SEARCH_SERVICE_OPTIONS: {
  value: SearchService;
  labelKey: string;
}[] = [
  { value: "invidious", labelKey: "search.filter.service.invidious" },
  { value: "youtube_music", labelKey: "search.filter.service.youtubeMusic" },
];

export const SEARCH_FILTER_GROUPS = {
  type: SEARCH_TYPE_OPTIONS,
  sortBy: SEARCH_SORT_OPTIONS,
  time: SEARCH_TIME_OPTIONS,
  duration: SEARCH_DURATION_OPTIONS,
  service: SEARCH_SERVICE_OPTIONS,
} as const;

export const DEFAULT_SEARCH_FILTERS: Omit<Search, "q"> = {
  type: "video",
  sortBy: "relevance",
  time: "all",
  duration: "all",
  service: "invidious",
};
