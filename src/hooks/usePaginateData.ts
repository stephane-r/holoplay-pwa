import chunk from "lodash/chunk";
import { Video } from "../types/interfaces/Video";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export const usePaginateData = (videos: Video[]) => {
  const chunkedData = chunk(videos, 10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(chunkedData[page]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (chunkedData[page + 1]) {
        setPage((page) => page + 1);
        setData((data) => [...data, ...chunkedData[page + 1]]);
      }
    }
  }, [inView, page, chunkedData]);

  return {
    ref,
    data,
  };
};
