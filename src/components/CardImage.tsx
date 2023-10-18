import { Flex } from "@mantine/core";

import { VideoThumbnail } from "../types/interfaces/Video";
import classes from "./CardImage.module.css";
import { Image } from "./Image";

interface CardImageProps {
  image: VideoThumbnail;
  title: string;
  domain?: string;
  children?: React.ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({
  image,
  title,
  domain = "",
  children,
}) => {
  const domainUrl = image.url.startsWith("https") ? "" : domain;

  return (
    <Flex
      className={classes.imageContainer}
      align="flex-end"
      justify="flex-end"
    >
      <Image
        src={`${domainUrl}${image.url}`}
        alt={title}
        className={classes.image}
        loading="lazy"
      />
      {children ?? null}
    </Flex>
  );
};
