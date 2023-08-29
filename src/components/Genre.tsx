import {
  Box,
  Flex,
  Space,
  Text,
  Title,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { memo } from "react";
import { genres } from "../utils/genres";
import { useHover } from "@mantine/hooks";
import { useSearchValues, useSetSearchValues } from "../providers/Search";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  item: {
    width: 90,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing.xs,
    transition: "background-color 0.2s",
  },
  text: {
    fontSize: theme.fontSizes.sm,
  },
}));

export const GenreList = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Title order={2}>{t("genre.title")}</Title>
      <Space h="lg" />
      <Flex gap={20} wrap="wrap">
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
    const { classes } = useStyles();
    const { hovered, ref } = useHover();
    const setSearchValues = useSetSearchValues();
    const searchValues = useSearchValues();

    const handleClick = () => {
      setSearchValues({ ...searchValues, q: genre.name });
    };

    return (
      <UnstyledButton onClick={handleClick}>
        <Box
          ref={ref}
          className={classes.item}
          style={{
            border: `solid 4px ${genre.color}`,
            backgroundColor: hovered ? genre.color : undefined,
          }}
        >
          <Text className={classes.text}>{genre.name}</Text>
        </Box>
      </UnstyledButton>
    );
  }
);
