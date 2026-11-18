import {
  ActionIcon,
  type ActionIconProps,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useFavorite } from "../providers/Favorite";
import { usePlayerVideo } from "../providers/Player";
import type {
  Card,
  CardChannel,
  CardPlaylist,
  CardVideo,
} from "../types/interfaces/Card";
import type { Channel } from "../types/interfaces/Channel";
import type { Playlist } from "../types/interfaces/Playlist";
import type { Video } from "../types/interfaces/Video";
import {
  formatedCardChannel,
  formatedCardPlaylist,
  formatedCardVideo,
} from "../utils/formatData";

type ButtonFavoriteCard = Card | Video | Playlist | Channel;
type FavoriteChannel = CardChannel | Channel;
type FavoritePlaylist = CardPlaylist | Playlist;
type FavoriteVideo = CardVideo | Video;

interface ButtonFavoriteProps extends ActionIconProps {
  card?: ButtonFavoriteCard;
  iconSize?: number;
  buttonSize?: number;
  render?: "menu";
}

export const getCardId = (item: ButtonFavoriteCard) => {
  if ((item as FavoritePlaylist)?.playlistId) {
    return (item as FavoritePlaylist).playlistId;
  }
  if (
    (item as FavoriteChannel)?.authorId &&
    (item as FavoriteChannel).type === "channel"
  ) {
    return (item as FavoriteChannel).authorId;
  }
  return (item as FavoriteVideo)?.videoId;
};

export const getCardTitle = (item: ButtonFavoriteCard) => {
  switch (item.type) {
    case "channel":
      return item.author;
    default:
      return item.title;
  }
};

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

    const card = parentCard ?? (currentVideo as Video);

    if (!card) {
      return null;
    }

    const isFavorite = favorite.cards.find(
      (favCard) => getCardId(favCard) === getCardId(card),
    );

    const handleAdd = async () => {
      const formatedCard = (() => {
        switch (card.type) {
          case "channel":
            return formatedCardChannel(card as FavoriteChannel);
          case "playlist":
            return formatedCardPlaylist(card as FavoritePlaylist);
          default:
            return formatedCardVideo(card);
        }
      })();

      await database.setFavoriteCards([formatedCard, ...favorite.cards]);

      notifications.show({
        title: getCardTitle(card),
        message: t("favorite.add.success.message"),
      });
    };

    const handleDelete = async () => {
      await database.setFavoriteCards(
        favorite.cards.filter(
          (favCard) => getCardId(favCard) !== getCardId(card),
        ),
      );

      notifications.show({
        title: getCardTitle(card),
        message: t("favorite.remove.success.message"),
      });
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
