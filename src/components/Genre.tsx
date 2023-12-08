import { Box, Flex, Space, Text, Title, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useSearchValues, useSetSearchValues } from "../providers/Search";
import { genres } from "../utils/genres";
import classes from "./Genre.module.css";

export const GenreList = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Title order={2}>{t("genre.title")}</Title>
      <Space h="lg" />
      <Flex role="list" aria-label={t("genre.title")} gap={20} wrap="wrap">
        {genres.map((genre) => (
          <Genre key={genre.name} genre={genre} />
        ))}
      </Flex>
    </>
  );
});

const Genre = memo(
  ({
    genre,
  }: {
    genre: {
      name: string;
      color: string;
      colorHover: string;
    };
  }) => {
    const { hovered, ref } = useHover();
    const setSearchValues = useSetSearchValues();
    const searchValues = useSearchValues();

    const handleClick = () => {
      setSearchValues({ ...searchValues, q: genre.name });
    };

    return (
      <Box role="listitem">
        <UnstyledButton
          onClick={handleClick}
          // @ts-ignore
          ref={ref}
          className={classes.item}
          style={{
            border: `solid 4px ${genre.color}`,
            backgroundColor: hovered ? genre.color : undefined,
          }}
        >
          <Text className={classes.text}>{genre.name}</Text>
        </UnstyledButton>
      </Box>
    );
  },
);
