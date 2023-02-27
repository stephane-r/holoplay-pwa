import {
  ActionIcon,
  Badge,
  Box,
  Card,
  createStyles,
  Flex,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconClearAll,
  IconPlayerPlay,
  IconPlus,
} from "@tabler/icons-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../database";
import { getPlaylists } from "../database/utils";
import { usePlayPlaylist } from "../hooks/usePlayPlaylist";
import { usePlayVideo } from "../hooks/usePlayVideo";
import { usePlaylists, useSetPlaylists } from "../providers/Playlist";
import { Playlist } from "../types/interfaces/Playlist";
import { Video, VideoThumbnail } from "../types/interfaces/Video";
import { PlaylistCardMenu } from "./PlaylistCardMenu";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl,
  },
  video: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    color: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).color,
    width: 28,
    height: 28,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.sm,
  },
  more: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    color: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).color,
    width: 28,
    height: 28,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.sm,
  },
}));

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = memo(
  ({ playlist }) => {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();

    const goToPlaylist = () => {
      navigate(`/playlists/${playlist.playlistId ?? playlist.ID}`);
    };

    const isRemotePlaylist = Boolean(playlist.playlistId);
    const isLocalPlaylist = Boolean(playlist.ID);

    return (
      <Card withBorder radius="md" p="xl" className={cx(classes.card)}>
        <Flex gap={8}>
          <VideosThumbnail
            videos={playlist.videos}
            videoCount={playlist.videoCount}
          />
          <PlaylistCardMenu playlist={playlist} />
        </Flex>
        <Title
          order={3}
          mb="xs"
          mt="md"
          lineClamp={1}
          onClick={goToPlaylist}
          style={{ cursor: "pointer" }}
        >
          {playlist.title}
        </Title>
        <Badge
          color={isRemotePlaylist ? "blue" : "green"}
          variant="light"
          mb="sm"
        >
          {isRemotePlaylist ? "Remote" : "Local"}
        </Badge>
        <Text
          size="xs"
          lineClamp={2}
          onClick={goToPlaylist}
          style={{ cursor: "pointer" }}
        >
          {playlist.videos.map((video) => video.title).join(", ")}
        </Text>
        <Flex align="center" justify="space-between" mt="xs">
          <Text size="xs" weight={600}>
            {playlist.videoCount} videos
          </Text>
          <Flex ml="auto" gap="xs">
            {playlist.videos.length ? (
              <ButtonPlay playlistId={playlist.playlistId as string} />
            ) : null}
            {!isLocalPlaylist ? (
              <ButtonSaveToPlaylist playlist={playlist} />
            ) : null}
          </Flex>
        </Flex>
      </Card>
    );
  }
);

interface VideosThumbnailProps {
  videos: Video[];
  videoCount: number;
}

const VideosThumbnail: React.FC<VideosThumbnailProps> = memo(
  ({ videos, videoCount }) => {
    const { classes, cx } = useStyles();

    const displayVideos = videos.slice(-4);
    const restOfVideosCount = videoCount - displayVideos.length;

    return (
      <>
        {displayVideos.map((video, index) => (
          <Tooltip
            key={`playlist-videos-thumbnail—${video.title}-${index}`}
            label={video.title}
            position="right"
          >
            <Box
              key={video.videoId}
              className={cx(classes.video)}
              style={{
                backgroundImage: `url(${getLowQualityThumbnail(
                  video.videoThumbnails
                )})`,
              }}
            />
          </Tooltip>
        ))}
        {restOfVideosCount > 0 ? (
          <Box className={cx(classes.more)}>
            <Tooltip
              label={`${restOfVideosCount} more videos`}
              position="right"
            >
              <Text size="xs" weight={600}>
                +{restOfVideosCount}
              </Text>
            </Tooltip>
          </Box>
        ) : null}
      </>
    );
  }
);

const getLowQualityThumbnail = (thumbnails: VideoThumbnail[]) => {
  const thumbnail = thumbnails.find(
    (thumbnail) => thumbnail.quality === "medium"
  );

  return thumbnail ? thumbnail.url : "";
};

const ButtonSaveToPlaylist = memo(({ playlist }: { playlist: Playlist }) => {
  const setPlaylists = useSetPlaylists();
  const playlists = usePlaylists();

  const isSavedPlaylist = playlists.find(
    (p) => p.playlistId === playlist.playlistId
  );

  const handleClick = () => {
    if (isSavedPlaylist) {
      deletePlaylist();
    } else {
      savePlaylist();
    }
    db.commit();
    setPlaylists(getPlaylists());
  };

  const savePlaylist = () => {
    db.insert("playlists", playlist);
    showNotification({
      title: "Playlist saved",
      message: `${playlist.title} has been added to your playlists list`,
    });
  };

  const deletePlaylist = () => {
    db.deleteRows("playlists", {
      playlistId: playlist.playlistId,
    });
    showNotification({
      title: "Playlist deleted",
      message: `${playlist.title} has been deleted from your playlists list`,
    });
  };

  return (
    <Tooltip
      label={isSavedPlaylist ? "Delete from playlists" : "Save to playlists"}
      position="left"
      onClick={handleClick}
    >
      <ActionIcon variant={isSavedPlaylist ? "default" : "filled"} radius="md">
        {isSavedPlaylist ? <IconCheck size={16} /> : <IconPlus size={16} />}
      </ActionIcon>
    </Tooltip>
  );
});

const ButtonPlay = memo(({ playlistId }: { playlistId: string }) => {
  const { handlePlay } = usePlayPlaylist();

  return (
    <Tooltip
      label="Run playlist"
      position="left"
      onClick={() => handlePlay(playlistId)}
    >
      <ActionIcon variant="filled" radius="md">
        <IconPlayerPlay size={16} />
      </ActionIcon>
    </Tooltip>
  );
});
