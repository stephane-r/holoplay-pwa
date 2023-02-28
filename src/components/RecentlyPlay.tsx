// @ts-ignore
import HScrollGrid from "react-horizontal-scroll-grid";
import { memo } from "react";
import { useHistory } from "../providers/History";
import { HorizontalGridList } from "./HorizontalGridList";

export const RecentlyPlay = memo(() => {
  const videos = useHistory();
  const data = videos.slice(0, 10);

  return <HorizontalGridList data={data} keyPrefix="recently-play" />;
});
