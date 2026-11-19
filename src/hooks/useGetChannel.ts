import { useEffect, useState } from "react";

import { queryClient } from "../queryClient";
import { getChannel } from "../services/channel";
import type { Channel } from "../types/interfaces/Channel";

export const useGetChannel = (authorId: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Reset synchronously during render (rather than in the effect below)
  // when navigating to a different channel, so stale data/errors from the
  // previous one can't flash before the new fetch settles.
  const [previousAuthorId, setPreviousAuthorId] = useState(authorId);
  if (authorId !== previousAuthorId) {
    setPreviousAuthorId(authorId);
    setChannel(null);
    setError(null);
  }

  useEffect(() => {
    // A missing dependency array here used to mean this ran on every
    // render — as long as the request kept failing, `channel` never
    // stopped being null, so it refetched (and renotified) on every
    // single re-render instead of once per channel.
    queryClient
      .fetchQuery(`channel-${authorId}`, () => getChannel(authorId), {
        // An invalid/unavailable channel id won't become valid by
        // retrying — see useInfiniteList for the same reasoning, including
        // the "No current instance" exception.
        retry: (failureCount, error) =>
          (error as Error).message === "No current instance" &&
          failureCount < 5,
        retryDelay: 200,
      })
      .then(setChannel)
      .catch(setError);
  }, [authorId]);

  return { channel, error };
};
