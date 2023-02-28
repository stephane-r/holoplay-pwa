import { Alert, Space, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useHistory } from "../providers/History";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentlyPlay = memo(() => {
  const videos = useHistory();
  const data = videos.slice(0, 10);

  if (!videos.length) {
    return (
      <Alert title="What are you waiting?">
        <Text>You haven't listened to any music yet</Text>
      </Alert>
    );
  }

  return (
    <>
      <Title order={2}>Recently Play</Title>
      <Space h="lg" />
      <HorizontalGridList data={data} keyPrefix="recently-play" />
    </>
  );
});
