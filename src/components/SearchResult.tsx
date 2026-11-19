import { Alert, LoadingOverlay, Paper } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useInfiniteList } from "../hooks/useInfiniteList";
import { useSearchValues } from "../providers/Search";
import { search } from "../services/search";
import type { Card } from "../types/interfaces/Card";
import { CardList } from "./CardList";

export const SearchResult = memo(() => {
  const searchValues = useSearchValues();
  const { t } = useTranslation();
  const resetKey = JSON.stringify(searchValues);

  const {
    items: cards,
    isLoadingMore,
    sentinelRef,
  } = useInfiniteList<Card, number>({
    queryKey: `search-${resetKey}`,
    resetKey,
    enabled: searchValues.q.length > 0,
    fetchPage: async (cursor) => {
      const page = cursor ?? 1;
      const items = await search({ ...searchValues, page });
      return { items, nextCursor: page + 1 };
    },
  });

  if (searchValues.q.length === 0) {
    return (
      <Alert title={t("search.result.alert.title")} color="blue" radius="md">
        {t("search.result.alert.message")}
      </Alert>
    );
  }

  return (
    <Paper
      pos="relative"
      mih={cards.length === 0 ? 300 : undefined}
      radius="md"
      style={{ overflow: "hidden" }}
    >
      {cards.length > 0 ? (
        <CardList label={`Search result list ${searchValues.q}`} data={cards} />
      ) : (
        <LoadingOverlay visible />
      )}
      <button ref={sentinelRef} style={{ opacity: 0 }} />
      {isLoadingMore ? (
        <Paper
          h={100}
          pos="relative"
          radius="md"
          style={{ overflow: "hidden" }}
        >
          <LoadingOverlay visible />
        </Paper>
      ) : null}
    </Paper>
  );
});
