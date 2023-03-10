import {
  createStyles,
  Flex,
  Kbd,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { memo, useRef } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useSearchValues, useSetSearchValues } from "../providers/Search";
import { Form } from "./Form";
import { useMediaQuery, useOs } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: 460,
    },

    [`@media (min-width: 1900px)`]: {
      maxWidth: 540,
    },
  },
  form: {
    flex: 1,
  },
  kbd: {
    height: 22,
    lineHeight: "15px",
  },
}));

export const SearchBar = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const { classes } = useStyles();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const os = useOs();
  const theme = useMantineTheme();
  const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  const isMacos = os === "macos";

  const form = useForm({
    initialValues: { q: searchValues.q },
    validate: {
      q: (value) => value.length === 0,
    },
  });

  const handleSubmit = (values: { q: string }) => {
    inputRef.current?.blur();
    setSearchValues({
      ...searchValues,
      q: values.q,
    });
  };

  return (
    <Flex align="center" gap={16} className={classes.container}>
      <Form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <TextInput
          id="js-search-bar-input"
          ref={inputRef}
          icon={<IconSearch size={15} />}
          placeholder="What do you want hear today ?"
          radius="md"
          {...form.getInputProps("q")}
          rightSectionWidth={isMacos ? 63 : 83}
          rightSection={
            isLg ? (
              <Kbd className={classes.kbd}>{isMacos ? "⌘" : "CTRL"} + K</Kbd>
            ) : undefined
          }
        />
        <button type="submit" style={{ display: "none" }} />
      </Form>
    </Flex>
  );
});
