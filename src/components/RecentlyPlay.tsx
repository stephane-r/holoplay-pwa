import { Alert, Space, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useHistory } from "../providers/History";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentlyPlay = memo(() => {
  const videos = useHistory();
  const data = videos.slice(0, 10);

  return (
    <>
      <Title order={2}>Recently Play</Title>
      <Space h="lg" />
      {!videos.length ? (
        <Alert title="What are you waiting?">
          <Text>You haven't listened to any music yet</Text>
        </Alert>
      ) : (
        <HorizontalGridList data={data} keyPrefix="recently-play" />
      )}
    </>
  );
});
