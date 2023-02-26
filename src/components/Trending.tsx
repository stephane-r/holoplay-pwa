import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { useQuery } from "react-query";
import { getTrendings } from "../services/trending";
import { CardList } from "./CardList";

export const Trending = memo(() => {
  const query = useQuery("trending", () => getTrendings());

  if (!query.data) {
    return <LoadingOverlay visible />;
  }

  if (query.error) {
    return <div>Error</div>;
  }

  return <CardList data={query.data} />;
});
