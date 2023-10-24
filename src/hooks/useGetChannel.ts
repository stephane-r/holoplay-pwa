import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

import { queryClient } from "../queryClient";
import { getChannel } from "../services/channel";
import type { Channel } from "../types/interfaces/Channel";

export const useGetChannel = (authorId: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const getRemoteChannel = () => {
      queryClient
        .fetchQuery(`channel-${authorId}`, () => getChannel(authorId))
        .then((playlist) => setChannel(playlist))
        .catch((error) => {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        });
    };

    if (!channel) {
      getRemoteChannel();
    }
  });

  return { channel };
};
