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
}

export const ButtonFavorite: React.FC<ButtonFavoriteProps> = memo(
  ({ video: parentVideo, iconSize = 18, variant = "default" }) => {
    const favorite = useFavorite();
    const setFavorite = useSetFavorite();
    const { video: currentVideo } = usePlayerVideo();
    const { t } = useTranslation();

    const video = parentVideo ?? (currentVideo as Video);

    const isFavorite = favorite.videos.find(
      (favVideo) => favVideo.videoId === video.videoId
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
        videos: [video, ...favorite.videos],
      });

      notifications.show({
        title: video.title,
        message: t("favorite.add.success.message"),
      });
    };

    const handleDelete = () => {
      updateAndCommit({
        ...favorite,
        videos: favorite.videos.filter(
          (favVideo) => favVideo.videoId !== video.videoId
        ),
      });

      notifications.show({
        title: video.title,
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
        size={36}
        onClick={onClick}
      >
        <IconHeart color="pink" size={iconSize} stroke={1.5} />
      </ActionIcon>
    );
  }
);
