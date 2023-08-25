import { createStyles, Flex } from "@mantine/core";
import { VideoThumbnail } from "../types/interfaces/Video";
import { Image } from "./Image";

const useStyles = createStyles((theme) => ({
  imageContainer: {
    overflow: "hidden",
    padding: theme.spacing.sm,
    position: "relative",
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

interface CardImageProps {
  image: VideoThumbnail;
  title: string;
  children?: React.ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({
  image,
  title,
  children,
}) => {
  const { classes } = useStyles();

  return (
    <Flex
      className={classes.imageContainer}
      align="flex-end"
      justify="flex-end"
    >
      <Image
        src={image?.url as string}
        alt={title}
        className={classes.image}
        loading="lazy"
      />
      {children ?? null}
    </Flex>
  );
};
