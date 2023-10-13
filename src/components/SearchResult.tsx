import { Alert, LoadingOverlay, Paper } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

import { useSearchValues } from "../providers/Search";
import { search } from "../services/search";
import { Video } from "../types/interfaces/Video";
import { CardList } from "./CardList";

export const SearchResult = memo(() => {
  const currentSearchValues = useSearchValues();
  const [searchValues, setSearchValues] = useState(currentSearchValues);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(searchValues.q.length > 0);
  const [videos, setVideos] = useState<Video[]>([]);
  const { t } = useTranslation();

  const { isFetching } = useQuery(
    `search-${currentSearchValues.q}-${currentSearchValues.type}-${page}`,
    async () => search({ ...currentSearchValues, page }),
    {
      onSuccess: (data) => {
        setVideos((previousVideos) => [
          ...previousVideos,
          ...(data as Video[]),
        ]);
        setPage((page) => page + 1);
        setEnabled(false);
      },
      enabled,
    },
  );

  useEffect(() => {
    if (JSON.stringify(searchValues) !== JSON.stringify(currentSearchValues)) {
      setSearchValues(currentSearchValues);
      setVideos([]);
      setPage(1);
      setEnabled(true);
    }
    if (inView) {
      setEnabled(true);
    }
  }, [inView, currentSearchValues, searchValues]);

  if (searchValues.q.length === 0) {
    return (
      <Alert title={t("search.result.alert.title")} color="blue" radius="md">
        {t("search.result.alert.message")}
      </Alert>
    );
  }

  return (
    <Paper>
      {videos.length > 0 ? (
        <CardList data={videos} />
      ) : (
        <LoadingOverlay visible />
      )}
      <button ref={ref} style={{ opacity: 0 }} />
      {isFetching && page > 1 ? (
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
