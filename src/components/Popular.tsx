import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { useQuery } from "react-query";
import { getPopuplars } from "../services/popular";
import { CardList } from "./CardList";

export const Popular = memo(() => {
  const query = useQuery("most-popular", () => getPopuplars());

  if (!query.data) {
    return <LoadingOverlay visible />;
  }

  if (query.error) {
    return <div>Error</div>;
  }

  return <CardList data={query.data} />;
});
