import { memo, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { SearchResult } from "../components/SearchResult";
import { useSearchValues } from "../providers/Search";

export const SearchPage = memo(() => {
  return (
    <div>
      <PageHeaderContainer />
      <SearchResultContainer />
    </div>
  );
});

const PageHeaderContainer = memo(() => {
  const searchValues = useSearchValues();

  return (
    <PageHeader
      title={`Search results ${
        searchValues.query.length > 0 ? `: ${searchValues.query}` : ""
      }`}
    />
  );
});

const useSearchInputFocus = () => {
  const focusSearchInput = () => {
    const $searchBarInput = document.getElementById("js-search-bar-input");

    if (!$searchBarInput) {
      return;
    }

    $searchBarInput.focus();
  };

  return focusSearchInput;
};

const SearchResultContainer = memo(() => {
  const focusSearchInput = useSearchInputFocus();

  useEffect(() => {
    focusSearchInput();
  }, [focusSearchInput]);

  return (
    <div>
      <SearchResult />
    </div>
  );
});
