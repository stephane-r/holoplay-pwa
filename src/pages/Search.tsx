import { LoadingOverlay, Text } from "@mantine/core";
import { memo } from "react";
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

  return <PageHeader title={`Search results : ${searchValues.query}`} />;
});

const SearchResultContainer = memo(() => {
  const { loading } = useSearchLoading();
  const searchResult = useSearchResult();

  if (searchResult.length === 0) {
    return <Text>No data</Text>;
  }

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <SearchResult />
    </div>
  );
});
