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
