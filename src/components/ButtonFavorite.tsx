import {
  ActionIcon,
  type ActionIconProps,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useFavorite, useIsFavorite } from "../providers/Favorite";
import { usePlayerVideo } from "../providers/Player";
import type { Card } from "../types/interfaces/Card";
import { getCardId } from "../utils/card";
import {
  formatedCardChannel,
  formatedCardPlaylist,
  formatedCardVideo,
} from "../utils/formatData";

interface ButtonFavoriteProps extends ActionIconProps {
  card?: Card;
  iconSize?: number;
  buttonSize?: number;
  render?: "menu";
}

export const ButtonFavorite: FC<ButtonFavoriteProps> = memo(
  ({
    card: parentCard,
    iconSize = 18,
    variant = "default",
    buttonSize = 36,
    render = null,
  }) => {
    const favorite = useFavorite();
    const { video: currentVideo } = usePlayerVideo();
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const card = parentCard ?? (currentVideo && formatedCardVideo(currentVideo));
    const isFavorite = useIsFavorite(card);

    if (!card) {
      return null;
    }

    const handleAdd = async () => {
      const formatedCard = (() => {
        switch (card.type) {
          case "channel":
            return formatedCardChannel(card);
          case "playlist":
            return formatedCardPlaylist(card);
          default:
            return formatedCardVideo(card);
        }
      })();

      await database.setFavoriteCards([formatedCard, ...favorite.cards]);
    };

    const handleDelete = async () => {
      await database.setFavoriteCards(
        favorite.cards.filter(
          (favCard) => getCardId(favCard) !== getCardId(card),
        ),
      );
    };

    const handleClick = () => {
      if (isFavorite) {
        return handleDelete();
      }
      return handleAdd();
    };

    const Icon = isFavorite ? IconHeartFilled : IconHeart;

    if (render === "menu") {
      return (
        <Menu.Item
          onClick={handleClick}
          leftSection={
            <Icon style={isFavorite ? { color: theme.colors.pink[8] } : {}} />
          }
        >
          {t(isFavorite ? "button.favorite.remove" : "button.favorite.add")}
        </Menu.Item>
      );
    }

    return (
      <ActionIcon
        variant={isFavorite ? "filled" : variant}
        color={isFavorite ? "pink" : "gray"}
        radius="md"
        size={buttonSize}
        onClick={handleClick}
        aria-label={t(
          isFavorite ? "button.favorite.remove" : "button.favorite.add",
        )}
      >
        <Icon color="pink" size={iconSize} stroke={1.5} />
      </ActionIcon>
    );
  },
);
