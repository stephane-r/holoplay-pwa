import { IconPlayerPlay } from "@tabler/icons-react";
import {
  Card as MCard,
  Text,
  Group,
  ActionIcon,
  createStyles,
  LoadingOverlay,
} from "@mantine/core";
import { memo } from "react";
import { Video, VideoThumbnail } from "../types/interfaces/Video";
import { CardMenu } from "./CardMenu";
import { ButtonFavorite } from "./ButtonFavorite";
import { usePlayVideo } from "../hooks/usePlayVideo";

const useStyles = createStyles((theme) => ({
  card: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  section: {
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
  },
  imageContainer: {
    overflow: "hidden",
    position: "relative",
    background: "grey",
    minHeight: 152,
    borderRadius: theme.radius.md,
  },
  image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxHeight: "110%",
    borderRadius: theme.radius.md,
    transform: "translate3d(-50%, -50%, 0)",
  },
}));

interface CardProps {
  video: Video;
}

export const Card: React.FC<CardProps> = memo(({ video }) => {
  const { handlePlay, loading } = usePlayVideo();
  const { classes } = useStyles();

  const image = video.videoThumbnails.find(
    (thumbnail) => thumbnail.quality === "maxresdefault"
  ) as VideoThumbnail;

  return (
    <MCard withBorder radius="md" p="sm" className={classes.card}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <CardImage image={image} title={video.title} />
      <MCard.Section className={classes.section} mt="sm">
        <Group position="apart">
          <Text lineClamp={2} style={{ height: 50 }} title={video.title}>
            {video.title}
          </Text>
        </Group>
      </MCard.Section>
      <Group mt="xs" style={{ marginTop: 14, justifyContent: "flex-end" }}>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          style={{ marginRight: "auto" }}
          onClick={() => handlePlay(video.videoId)}
        >
          <IconPlayerPlay size={18} stroke={1.5} />
        </ActionIcon>
        <ButtonFavorite video={video} />
        <CardMenu video={video} />
      </Group>
    </MCard>
  );
});

interface CardImageProps {
  image: VideoThumbnail;
  title: string;
}

const CardImage: React.FC<CardImageProps> = memo(({ image, title }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.imageContainer}>
      <img
        src={image?.url as string}
        alt={title}
        className={classes.image}
        loading="lazy"
      />
    </div>
  );
});
