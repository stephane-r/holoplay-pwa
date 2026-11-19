import { ActionIcon, Box, Menu, SegmentedControl, Select } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useSearchValues, useSetSearchValues } from "../providers/Search";
import type {
  SearchDate,
  SearchDuration,
  SearchService,
  SearchSortBy,
  SearchTypes,
} from "../types/interfaces/Search";
import {
  SEARCH_DURATION_OPTIONS,
  SEARCH_SERVICE_OPTIONS,
  SEARCH_SORT_OPTIONS,
  SEARCH_TIME_OPTIONS,
  SEARCH_TYPE_OPTIONS,
} from "../utils/searchFilters";

export const SearchFilters = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const { t } = useTranslation();

  return (
    <Menu
      width={250}
      position="bottom-end"
      // Mantine's z-index scale puts LoadingOverlay above Menu/Popover by
      // default, so the search results' loader covered this dropdown
      // whenever they overlapped (e.g. right after changing a filter).
      zIndex="var(--mantine-z-index-max)"
    >
      <Menu.Target>
        <ActionIcon
          aria-label="Open search filters"
          variant="filled"
          radius="md"
          size={36}
          color="gray"
        >
          <IconFilter size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown aria-label="Search filters">
        <Menu.Label>{t("search.filter.source.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <SegmentedControl
            fullWidth
            value={searchValues.service}
            data={SEARCH_SERVICE_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(value) => {
              setSearchValues({
                ...searchValues,
                service: value as SearchService,
              });
            }}
          />
        </Box>
        <Menu.Label>{t("search.filter.type.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            aria-label="Type filter"
            comboboxProps={{ withinPortal: false }}
            value={searchValues.type}
            data={SEARCH_TYPE_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                type: value as SearchTypes,
              })
            }
          />
        </Box>
        <Menu.Label>{t("search.filter.sort.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            comboboxProps={{ withinPortal: false }}
            value={searchValues.sortBy}
            data={SEARCH_SORT_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                sortBy: value as SearchSortBy,
              })
            }
          />
        </Box>
        <Menu.Label>{t("search.filter.time.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            comboboxProps={{ withinPortal: false }}
            value={searchValues.time}
            data={SEARCH_TIME_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                time: value as SearchDate,
              })
            }
          />
        </Box>
        <Menu.Label>{t("search.filter.duration.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            comboboxProps={{ withinPortal: false }}
            value={searchValues.duration}
            data={SEARCH_DURATION_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                duration: value as SearchDuration,
              })
            }
          />
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
});
