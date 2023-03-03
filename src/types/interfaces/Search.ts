export type SearchTypes = "video" | "playlist" | "channel";
export type SearchSortBy =
  | "relevance"
  | "rating"
  | "upload_date"
  | "view_count";
export type SearchDuration = "all" | "short" | "medium" | "long";
export type SearchDate = "all" | "hour" | "today" | "week" | "month" | "year";

export interface SearchParams {
  q: String;
  type: SearchTypes;
  sortBy: SearchSortBy;
  date: SearchDate;
  duration: SearchDuration;
}

export interface Search {
  q: string;
  type: SearchTypes;
  sortBy: SearchSortBy;
  time: SearchDate;
  duration: SearchDuration;
}
