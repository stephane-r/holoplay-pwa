import { Alert, LoadingOverlay, Text } from "@mantine/core";
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

  if (searchResult.length === 0 && !loading) {
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
