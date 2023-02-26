import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { Popular } from "../components/Popular";

export const PopularPage = memo(() => {
  return (
    <div>
      <PageHeader title="Most populars" />
      <Popular />
    </div>
  );
});
