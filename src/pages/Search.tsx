import { Alert, LoadingOverlay } from "@mantine/core";
import { memo, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { SearchResult } from "../components/SearchResult";
import {
  useSearchLoading,
  useSearchValues,
  useSearchResult,
} from "../providers/Search";

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
  const { loading } = useSearchLoading();
  const searchResult = useSearchResult();
  const focusSearchInput = useSearchInputFocus();

  const searchResultIsEmpty = searchResult.length === 0 && !loading;

  useEffect(() => {
    if (searchResultIsEmpty) {
      focusSearchInput();
    }
  }, [searchResultIsEmpty, focusSearchInput]);

  if (searchResultIsEmpty) {
    return (
      <Alert title="Oh, wait" color="blue" radius="md">
        For show result, you need to add keys in search bar
      </Alert>
    );
  }

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <SearchResult />
    </div>
  );
});
