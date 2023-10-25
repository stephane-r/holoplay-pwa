import chunk from "lodash/chunk";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import type { Card } from "../types/interfaces/Card";

export const usePaginateData = (cards: Card[]) => {
  const chunkedData = chunk(cards, 10);
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
