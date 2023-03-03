import { Alert, LoadingOverlay, Paper } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { useSearchValues } from "../providers/Search";
import { CardList } from "./CardList";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { search } from "../services/search";
import { Video } from "../types/interfaces/Video";

export const SearchResult = memo(() => {
  const currentSearchValues = useSearchValues();
  const [searchValues, setSearchValues] = useState(currentSearchValues);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(searchValues.query.length > 0);
  const [videos, setVideos] = useState<Video[]>([]);

  const { isFetching } = useQuery(
    ["search"],
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
    }
  );

  useEffect(() => {
    if (searchValues.query !== currentSearchValues.query) {
      setSearchValues(currentSearchValues);
      setVideos([]);
      setPage(1);
      setEnabled(true);
    }
    if (inView) {
      setEnabled(true);
    }
  }, [inView, currentSearchValues, searchValues]);

  if (searchValues.query.length === 0) {
    return (
      <Alert title="Oh, wait" color="blue" radius="md">
        For show result, you need to add keys in search bar
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
