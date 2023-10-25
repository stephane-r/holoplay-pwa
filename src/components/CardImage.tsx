import { Flex } from "@mantine/core";
import type { FC, ReactNode } from "react";

import classes from "./CardImage.module.css";
import { Image } from "./Image";

interface CardImageProps {
  src: string;
  title: string;
  domain?: string;
  children?: ReactNode;
}

export const CardImage: FC<CardImageProps> = ({
  src,
  title,
  domain = "",
  children,
}) => {
  const domainUrl =
    src.startsWith("https") || src.startsWith("//") ? "" : domain;

  return (
    <Flex
      className={classes.imageContainer}
      align="flex-end"
      justify="flex-end"
    >
      <Image
        src={`${domainUrl}${src}`}
        alt={title}
        className={classes.image}
        loading="lazy"
      />
      {children ?? null}
    </Flex>
  );
};
