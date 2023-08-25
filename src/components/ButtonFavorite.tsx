import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { memo } from "react";
import { notifications } from "@mantine/notifications";
import { db } from "../database";
import { getFavoritePlaylist } from "../database/utils";
import { useFavorite, useSetFavorite } from "../providers/Favorite";
import { Playlist } from "../types/interfaces/Playlist";
import { Video } from "../types/interfaces/Video";
import { usePlayerVideo } from "../providers/Player";
import { useTranslation } from "react-i18next";

interface ButtonFavoriteProps extends ActionIconProps {
  video?: Video;
  iconSize?: number;
  buttonSize?: number;
}

const getItemId = (item: Video) => {
  switch (item.type) {
    case "channel":
      return item.authorId;
    case "playlist":
      // @ts-ignore
      return item.playlistId;
    default:
      return item.videoId;
  }
};

export const ButtonFavorite: React.FC<ButtonFavoriteProps> = memo(
  ({
    video: parentVideo,
    iconSize = 18,
    variant = "default",
    buttonSize = 36,
  }) => {
    const favorite = useFavorite();
    const setFavorite = useSetFavorite();
    const { video: currentVideo } = usePlayerVideo();
    const { t } = useTranslation();

    const video = parentVideo ?? (currentVideo as Video);

    const isFavorite = favorite.videos.find(
      (favVideo) => getItemId(favVideo) === getItemId(video)
    );

    const updateAndCommit = (updatedFavoritePlaylist: Playlist) => {
      db.update(
        "playlists",
        { title: "Favorites" },
        () => updatedFavoritePlaylist
      );
      db.commit();
      setFavorite(getFavoritePlaylist());
    };

    const handleAdd = () => {
      updateAndCommit({
        ...favorite,
        videos: [{ ...video, videoId: getItemId(video) }, ...favorite.videos],
      });

      notifications.show({
        title: video.title ?? video.author,
        message: t("favorite.add.success.message"),
      });
    };

    const handleDelete = () => {
      updateAndCommit({
        ...favorite,
        videos: favorite.videos.filter(
          (favVideo) => getItemId(favVideo) !== getItemId(video)
        ),
      });

      notifications.show({
        title: video.title ?? video.author,
        message: t("favorite.remove.success.message"),
      });
    };

    const onClick = () => {
      if (isFavorite) {
        return handleDelete();
      }
      return handleAdd();
    };

    return (
      <ActionIcon
        variant={isFavorite ? "filled" : variant}
        color={isFavorite ? "pink" : "gray"}
        radius="md"
        size={buttonSize}
        onClick={onClick}
      >
        <IconHeart color="pink" size={iconSize} stroke={1.5} />
      </ActionIcon>
    );
  }
);
