import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { Trending } from "../components/Trending";

export const TrendingPage = memo(() => {
  return (
    <div>
      <PageHeader title="Trending" />
      <Trending />
    </div>
  );
});
