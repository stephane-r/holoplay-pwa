import { Alert, Text } from "@mantine/core";
import { memo } from "react";
import { useHistory } from "../providers/History";
import { CardList } from "./CardList";

export const HistoryList = memo(() => {
  const videos = useHistory();

  if (!videos.length) {
    return (
      <Alert title="What are you waiting?">
        <Text>You haven't listened to any music yet</Text>
      </Alert>
    );
  }

  return <CardList data={videos} />;
});
