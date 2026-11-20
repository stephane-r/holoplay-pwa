import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconDotsVertical,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { usePlayPlaylist } from "../hooks/usePlayPlaylist";
import { useStableNavigate } from "../providers/Navigate";
import { usePlaylists } from "../providers/Playlist";
import { database } from "../services/database";
import type { CardPlaylist, CardVideo } from "../types/interfaces/Card";
import { getThumbnailQuality } from "../utils/formatData";
import { getPlaylistIdentity } from "../utils/playlistIdentity";
import { ButtonFavorite } from "./ButtonFavorite";
import classes from "./PlaylistCard.module.css";
import { PlaylistCardMenu } from "./PlaylistCardMenu";

interface PlaylistCardProps {
  playlist: CardPlaylist;
  currentInstanceUri: string;
}

export const PlaylistCard: FC<PlaylistCardProps> = memo(
  ({ playlist, currentInstanceUri }) => {
    const navigate = useStableNavigate();
    const identity = getPlaylistIdentity(playlist);

    const goToPlaylist = () => {
      navigate(`/playlists/${identity?.id}`);
    };

    const isRemotePlaylist = identity?.origin === "remote";
    const isLocalPlaylist = identity?.origin === "local";
    const hasVideos = Boolean(playlist.videos.length);

    return (
      <Card
        withBorder
        radius="md"
        p="xl"
        pt={hasVideos ? undefined : "xs"}
        className={classes.card}
      >
        <Flex gap={8}>
          {hasVideos ? (
            <VideosThumbnail
              domain={currentInstanceUri}
              videos={playlist.videos}
              videoCount={playlist.videoCount}
            />
          ) : null}
          {isLocalPlaylist ? <PlaylistCardMenu playlist={playlist} /> : null}
        </Flex>
        <Title
          order={3}
          onClick={goToPlaylist}
          className={classes.title}
          mb="md"
          mt="xs"
        >
          <Text
            style={{ fontSize: 22 }}
            lineClamp={1}
            className={classes.titleText}
          >
            <strong>{playlist.title}</strong>
          </Text>
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
          <Text size="xs">
            <strong>{playlist.videoCount} videos</strong>
          </Text>
          <Flex ml="auto" gap="xs">
            {playlist.videos.length && identity ? (
              <ButtonPlay playlistId={identity.id} />
            ) : null}
            {!isLocalPlaylist ? (
              <ButtonSaveToPlaylist playlist={playlist} />
            ) : null}
            <ButtonFavorite card={playlist} buttonSize={28} iconSize={14} />
          </Flex>
        </Flex>
      </Card>
    );
  },
);

interface VideosThumbnailProps {
  domain: string;
  videos: CardVideo[];
  videoCount: number;
}

const VideosThumbnail: FC<VideosThumbnailProps> = memo(
  ({ domain, videos, videoCount }) => {
    const { t } = useTranslation();
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
              className={classes.video}
              style={{
                backgroundImage: `url(${domain}${
                  video.thumbnail ??
                  getThumbnailQuality(video.videoThumbnails ?? [], "medium")
                })`,
              }}
            />
          </Tooltip>
        ))}
        {restOfVideosCount > 0 ? (
          <Box className={classes.more}>
            <Tooltip
              label={t("playlist.card.more_videos", {
                count: restOfVideosCount,
              })}
              position="right"
            >
              <Text size="xs">
                <strong>+{restOfVideosCount}</strong>
              </Text>
            </Tooltip>
          </Box>
        ) : null}
      </>
    );
  },
);

interface ButtonSaveToPlaylistProps {
  playlist: CardPlaylist;
}

const ButtonSaveToPlaylist: FC<ButtonSaveToPlaylistProps> = memo(
  ({ playlist }) => {
    const { t } = useTranslation();
    const playlists = usePlaylists();

    const isSavedPlaylist = playlists.find(
      (p) => p.playlistId === playlist.playlistId,
    );

    const handleClick = async () => {
      if (isSavedPlaylist) {
        await deletePlaylist();
      } else {
        await savePlaylist();
      }
    };

    const savePlaylist = async () => {
      await database.saveRemotePlaylist(playlist);
      notifications.show({
        title: t("playlist.card.save.notification.title"),
        message: t("playlist.card.save.notification.message", {
          title: playlist.title,
        }),
      });
    };

    const deletePlaylist = async () => {
      await database.deleteRemotePlaylist(playlist.playlistId as string);
      notifications.show({
        title: t("playlist.card.delete.notification.title"),
        message: t("playlist.card.delete.notification.message", {
          title: playlist.title,
        }),
      });
    };

    const label = t(
      isSavedPlaylist
        ? "playlist.card.button.delete"
        : "playlist.card.button.save",
    );

    return (
      <Tooltip label={label} position="left" onClick={handleClick}>
        <ActionIcon
          aria-label={label}
          variant={isSavedPlaylist ? "default" : "filled"}
          radius="md"
        >
          {isSavedPlaylist ? (
            <IconCheck size={16} />
          ) : (
            <IconDotsVertical size={16} />
          )}
        </ActionIcon>
      </Tooltip>
    );
  },
);

const ButtonPlay = memo(({ playlistId }: { playlistId: number | string }) => {
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
