import { Flex, Kbd, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery, useOs } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { getSearchHistory } from "../database/utils";
import { useSearchValues, useSetSearchValues } from "../providers/Search";
import { Form } from "./Form";
import classes from "./SearchBar.module.css";
import { SearcHistoryMenu } from "./SearchHistoryMenu";

export const SearchBar = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const os = useOs();
  const theme = useMantineTheme();
  const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const { t } = useTranslation();
  const [menuOpened, setMenuOpened] = useState(false);

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
    saveToSearchHistory(values.q);
  };

  const saveToSearchHistory = (term: string) => {
    const searchHistory = getSearchHistory();

    if (searchHistory[0]?.term === term) {
      return;
    }

    db.insert("searchHistory", {
      term,
      createdAt: new Date().toISOString(),
    });
    db.commit();
  };

  const handleSelect = (value: string) => {
    form.setFieldValue("q", value);
    handleSubmit({ q: value });
  };

  return (
    <Flex align="center" gap={16} className={classes.container}>
      <Form
        label="Search bar form"
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <SearcHistoryMenu opened={menuOpened} onSelect={handleSelect}>
          <div
            onFocusCapture={() => setMenuOpened(true)}
            onBlurCapture={() => setMenuOpened(false)}
          >
            <TextInput
              id="js-search-bar-input"
              ref={inputRef}
              leftSection={<IconSearch size={15} />}
              placeholder={t("search.bar.placeholder") as string}
              radius="md"
              {...form.getInputProps("q")}
              autoComplete="off"
              rightSectionWidth={isMacos ? 63 : 83}
              rightSection={
                isLg ? (
                  <Kbd className={classes.kbd}>
                    {isMacos ? "⌘" : "CTRL"} + K
                  </Kbd>
                ) : undefined
              }
            />
          </div>
        </SearcHistoryMenu>
        <button type="submit" style={{ display: "none" }} />
      </Form>
    </Flex>
  );
});
