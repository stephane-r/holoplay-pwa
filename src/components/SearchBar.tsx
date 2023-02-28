import {
  Box,
  createStyles,
  Flex,
  Kbd,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { memo, useRef, useState } from "react";
import { IconAdjustmentsAlt, IconSearch } from "@tabler/icons-react";
import {
  useSearchData,
  useSearchValues,
  useSetSearchValues,
} from "../providers/Search";
import { useNavigate } from "react-router-dom";
import { Search, SearchTypes } from "../types/interfaces/Search";
import { Form } from "./Form";
import { useMediaQuery } from "@mantine/hooks";

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
  const { search } = useSearchData();
  const searchValues = useSearchValues() as Search;
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchValues);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = () => {
    inputRef.current?.blur();
    setSearchValues(query);
    search(query);
    navigate(`/search?query=${query.query}&type=${query.type}`);
  };

  const handleChange = (value: string, key: "query" | "type") => {
    setQuery((previousState) => ({
      ...previousState,
      [key]: value,
    }));
  };

  return (
    <Flex align="center" gap={16} className={classes.container}>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          ref={inputRef}
          icon={<IconSearch size={15} />}
          placeholder="What do you want hear today ?"
          onChange={(event) => handleChange(event.target.value, "query")}
          radius="md"
          value={query.query}
          rightSectionWidth={matches ? 185 : 132}
          rightSection={
            <TextInputRight
              value={query.type}
              onChange={(type: SearchTypes) => handleChange(type, "type")}
              matches={matches}
            />
          }
        />
        <button type="submit" style={{ display: "none" }} />
      </Form>
    </Flex>
  );
});

const TextInputRight = memo(
  ({
    value,
    onChange,
    matches,
  }: {
    value: SearchTypes;
    onChange: (searchType: SearchTypes) => void;
    matches: boolean;
  }) => {
    const { classes } = useStyles();

    return (
      <>
        {matches ? <Kbd className={classes.kbd}>⌘ + K</Kbd> : null}
        <Box w={125} ml={6}>
          <Select
            placeholder="Type"
            icon={<IconAdjustmentsAlt size={16} />}
            defaultValue="video"
            value={value}
            data={[
              { value: "video", label: "Videos" },
              { value: "channel", label: "Channels" },
              { value: "playlist", label: "Playlists" },
            ]}
            onChange={onChange}
            styles={(theme) => ({
              input: {
                minHeight: 20,
                height: 20,
                border: 0,
                paddingRight: 10,
              },
            })}
          />
        </Box>
      </>
    );
  }
);
