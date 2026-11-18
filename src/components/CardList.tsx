import { Box } from "@mantine/core";
import { type FC, memo } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import { useScrollParent } from "../providers/ScrollParent";
import { useSettings } from "../providers/Settings";
import type { Card as CardType } from "../types/interfaces/Card";
import type { Video } from "../types/interfaces/Video";
import { getCardTitle } from "./ButtonFavorite";
import classes from "./CardList.module.css";
import { ChannelCard } from "./ChannelCard";
import { PlaylistCard } from "./PlaylistCard";
import { VideoCard } from "./VideoCard";

interface CardListProps {
  label?: string;
  data: CardType[];
  scrollable?: boolean;
}

export const CardList: FC<CardListProps> = memo(
  ({ label, data, scrollable = false }) => {
    const { currentInstance } = useSettings();
    const scrollParent = useScrollParent();

    if (!data.length) {
      return null;
    }

    const videoQueue = data.filter(
      (card) => card.type !== "playlist" && card.type !== "channel",
    ) as unknown as Video[];

    const renderCard = (card: CardType) => {
      switch (card.type) {
        case "playlist":
          return (
            <PlaylistCard
              playlist={card}
              currentInstanceUri={currentInstance?.uri ?? ""}
            />
          );
        case "channel":
          return (
            <ChannelCard
              channel={card}
              currentInstanceUri={currentInstance?.uri ?? ""}
            />
          );
        default:
          return (
            <VideoCard
              video={card}
              currentInstanceUri={currentInstance?.uri ?? ""}
              queue={videoQueue}
            />
          );
      }
    };

    if (scrollable) {
      return (
        <Box aria-label={label} role="list" className={classes.flexGrid}>
          {data.map((card, index) => (
            <Box
              key={`${document.location.pathname}—${getCardTitle(card)}-${index}`}
              role="listitem"
              className={classes.flexColumn}
            >
              {renderCard(card)}
            </Box>
          ))}
        </Box>
      );
    }

    // Only the cards within the viewport (plus a small overscan margin) are
    // mounted — without this, screens with unbounded infinite-scroll data
    // (search results, a channel's full video list) kept every page ever
    // fetched mounted as real DOM/React nodes, growing without limit the
    // longer the user scrolled.
    //
    // `customScrollParent` (not `useWindowScroll`): this app's `body` has
    // `overflow: hidden` and `.App-Content` is the element that actually
    // scrolls (see App.css) — the window itself never does. With
    // `useWindowScroll`, Virtuoso tracked `window.scrollY`, which never
    // changes here, so it kept rendering the same near-top range of rows
    // forever: scrolling the real container past that range showed a blank
    // gap, which only looked "fixed" when a data refetch forced Virtuoso to
    // recompute. `scrollParent` starts `null` until AppContent's ref fires;
    // Virtuoso's own docs show this exact pattern (render once with no
    // scroll parent, then re-render once the ref resolves).
    return (
      <div role="list" aria-label={label}>
        <VirtuosoGrid
          customScrollParent={scrollParent ?? undefined}
          totalCount={data.length}
          overscan={600}
          listClassName={classes.gridList}
          itemClassName={classes.gridItem}
          itemContent={(index) => renderCard(data[index])}
        />
      </div>
    );
  },
);
