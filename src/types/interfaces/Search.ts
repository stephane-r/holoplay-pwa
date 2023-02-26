export type SearchTypes = "video" | "playlist" | "channel";

export interface SearchParams {
  query: String;
  type: SearchTypes;
}

export interface Search {
  query: string;
  type: SearchTypes;
}
