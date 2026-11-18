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

  // Reset when `resetKey` changes by adjusting state directly during render
  // (React's documented pattern for this) rather than in an effect — it
  // takes effect before the browser paints, with no extra render round-trip.
  const [previousResetKey, setPreviousResetKey] = useState(resetKey);
  if (resetKey !== previousResetKey) {
    setPreviousResetKey(resetKey);
    setItems([]);
    setCursor(null);
    setHasNextPage(true);
    setFetchTrigger(enabled);
  }

  const { data, isFetching } = useQuery(
    [queryKey, cursor],
    () => fetchPage(cursor),
    { enabled: enabled && fetchTrigger },
  );

  // Reacting to `data` (rather than an `onSuccess` callback) also covers
  // react-query serving an already-cached page straight from cache —
  // re-selecting a previous search term reuses the same query key, and
  // `onSuccess` doesn't reliably re-fire for a cache hit with no actual
  // fetch, which left `items` stuck empty after the reset above.
  useEffect(() => {
    if (!data) return;
    // Synchronizing with react-query's own cache, not state derived from
    // React itself — the exact case this rule means to allow.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems((previous) => [...previous, ...data.items]);
    setHasNextPage(data.nextCursor !== null);
    setCursor(data.nextCursor);
    setFetchTrigger(false);
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      // Edge-triggered on the sentinel entering view, not a continuous
      // sync — `fetchTrigger` latches back to false in the effect above
      // once data resolves, so this only fires once per scroll-into-view,
      // not every render while the sentinel stays in view.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
