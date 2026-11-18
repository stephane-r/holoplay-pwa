import { useEffect, useState } from "react";

import { queryClient } from "../queryClient";
import { getChannel } from "../services/channel";
import type { Channel } from "../types/interfaces/Channel";
import { notifyError } from "../utils/notify";

export const useGetChannel = (authorId: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const getRemoteChannel = () => {
      queryClient
        .fetchQuery(`channel-${authorId}`, () => getChannel(authorId))
        .then((playlist) => setChannel(playlist))
        .catch((error) => {
          notifyError({ title: "Error", message: error.message });
        });
    };

    if (!channel) {
      getRemoteChannel();
    }
  });

  return { channel };
};
