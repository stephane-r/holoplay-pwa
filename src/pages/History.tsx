import { memo } from "react";
import { HistoryList } from "../components/HistoryList";
import { PageHeader } from "../components/PageHeader";

export const HistoryPage = memo(() => {
  return (
    <div>
      <PageHeader title="History" />
      <HistoryList />
    </div>
  );
});
