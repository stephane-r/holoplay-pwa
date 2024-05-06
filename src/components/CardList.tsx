import { Box, Grid } from "@mantine/core";
import { type FC, memo } from "react";

import { useSettings } from "../providers/Settings";
import type { Card as CardType } from "../types/interfaces/Card";
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

    if (!data.length) {
      return null;
    }

    const ListComponent = scrollable ? Box : Grid;
    const ItemComponent = scrollable ? Box : Grid.Col;

    return (
      <ListComponent
        aria-label={label}
        role="list"
        className={scrollable ? classes.flexGrid : undefined}
      >
        {data.map((card, index) => (
          <ItemComponent
            key={`${document.location.pathname}—${getCardTitle(card)}-${index}`}
            role="listitem"
            span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            className={scrollable ? classes.flexColumn : undefined}
          >
            {(() => {
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
                    />
                  );
              }
            })()}
          </ItemComponent>
        ))}
      </ListComponent>
    );
  },
);
