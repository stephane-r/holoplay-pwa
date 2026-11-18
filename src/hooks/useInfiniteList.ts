import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

interface PageResult<TItem, TCursor> {
  items: TItem[];
  // `null` means "no more pages" — a page-number cursor that never signals
  // this (e.g. a search endpoint with no end-of-results marker) can just
  // always return `cursor + 1` here to keep paginating indefinitely.
  nextCursor: TCursor | null;
}

interface UseInfiniteListOptions<TItem, TCursor> {
  queryKey: string;
  fetchPage: (cursor: TCursor | null) => Promise<PageResult<TItem, TCursor>>;
  enabled?: boolean;
  // Changing this (e.g. a new search query) wipes accumulated items and
  // restarts from the first page.
  resetKey?: string | number;
}

// `SearchResult.tsx` (page-number cursor) and `ChannelDetail.tsx`'s
// video/playlist tabs (continuation-token cursor) each hand-rolled the same
// "accumulate pages behind an IntersectionObserver sentinel" mechanics
// independently — a bug fixed in one never reached the other.
export const useInfiniteList = <TItem, TCursor = number>({
  queryKey,
  fetchPage,
  enabled = true,
  resetKey,
}: UseInfiniteListOptions<TItem, TCursor>) => {
  const { ref: sentinelRef, inView } = useInView();
  const [cursor, setCursor] = useState<TCursor | null>(null);
  const [items, setItems] = useState<TItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(enabled);

  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasNextPage(true);
    setFetchTrigger(enabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const { isFetching } = useQuery(
    [queryKey, cursor],
    () => fetchPage(cursor),
    {
      enabled: enabled && fetchTrigger,
      onSuccess: (result) => {
        setItems((previous) => [...previous, ...result.items]);
        setHasNextPage(result.nextCursor !== null);
        setCursor(result.nextCursor);
        setFetchTrigger(false);
      },
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      setFetchTrigger(true);
    }
  }, [inView, hasNextPage]);

  return {
    items,
    isFetching,
    hasNextPage,
    sentinelRef,
    // True once the first page has loaded — distinguishes "fetching page 1"
    // (show a full loading state) from "fetching the next page" (show a
    // small trailing loader below existing items).
    isLoadingMore: isFetching && items.length > 0,
  };
};
