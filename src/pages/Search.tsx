import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <PageHeader
      title={`${t("page.search.title")} ${
        searchValues.q.length > 0 ? `: ${searchValues.q}` : ""
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
  const searchValues = useSearchValues();
  const focusSearchInput = useSearchInputFocus();

  useEffect(() => {
    // Only grab focus for a fresh, empty search — if a query is already
    // set (e.g. landing here from a genre tile, search history, or a
    // shared link), the user already has something to look at and
    // doesn't need the keyboard focus yanked onto an input they didn't
    // ask to type into.
    if (!searchValues.q) {
      focusSearchInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusSearchInput]);

  return (
    <div>
      <SearchResult />
    </div>
  );
});
