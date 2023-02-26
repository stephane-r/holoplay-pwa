import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { memo } from "react";
import { showNotification } from "@mantine/notifications";
import { db } from "../database";
import { getFavoritePlaylist } from "../database/utils";
import { useFavorite, useSetFavorite } from "../providers/Favorite";
import { Playlist } from "../types/interfaces/Playlist";
import { Video } from "../types/interfaces/Video";

interface ButtonFavoriteProps {
  video: Video;
}

export const ButtonFavorite: React.FC<ButtonFavoriteProps> = memo(
  ({ video }) => {
    const favorite = useFavorite();
    const setFavorite = useSetFavorite();

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

      showNotification({
        title: video.title,
        message: "Added to favorites",
      });
    };

    const handleDelete = () => {
      updateAndCommit({
        ...favorite,
        videos: favorite.videos.filter(
          (favVideo) => favVideo.videoId !== video.videoId
        ),
      });

      showNotification({
        title: video.title,
        message: "Removed from favorites",
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
        variant={isFavorite ? "filled" : "default"}
        color={isFavorite ? "pink" : "gray"}
        radius="md"
        size={36}
        onClick={onClick}
      >
        <IconHeart color="pink" size={18} stroke={1.5} />
      </ActionIcon>
    );
  }
);
