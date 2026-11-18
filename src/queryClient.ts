import { QueryClient } from "react-query";

const FIVE_MINUTES = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Most queries here are read-only video/channel/playlist browsing data
      // that can't have changed in the last few minutes — without this,
      // every query was immediately stale (react-query v3's default is 0),
      // so navigating back to a page refetched from the Invidious instance
      // every single time. `useRemotePlay`'s polling query is unaffected
      // (refetchInterval refetches on its own schedule regardless of
      // staleness); the two one-off "action behind a static query key"
      // queries (ModalSyncData, SaveData) opt out explicitly with
      // staleTime: 0.
      staleTime: FIVE_MINUTES,
    },
  },
});
