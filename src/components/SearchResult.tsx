import { memo } from "react";
import { useSearchResult } from "../providers/Search";
import { CardList } from "./CardList";

export const SearchResult = memo(() => {
  const searchResult = useSearchResult();
  return <CardList data={searchResult} />;
});
