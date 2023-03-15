import { ActionIcon, Box, Menu, SegmentedControl, Select } from "@mantine/core";
import { memo } from "react";
import { IconFilter } from "@tabler/icons-react";
import { useSearchValues, useSetSearchValues } from "../providers/Search";
import {
  SearchDate,
  SearchDuration,
  SearchSortBy,
  SearchTypes,
} from "../types/interfaces/Search";
import { useTranslation } from "react-i18next";

export const SearchFilters = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const { t } = useTranslation();

  return (
    <Menu width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="filled" radius="md" size={36}>
          <IconFilter size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t("search.filter.type.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <SegmentedControl
            fullWidth
            value={searchValues.type}
            data={[
              { value: "video", label: t("search.filter.type.videos") },
              { value: "playlist", label: t("search.filter.type.videos") },
            ]}
            onChange={(value) => {
              setSearchValues({
                ...searchValues,
                type: value as SearchTypes,
              });
            }}
          />
        </Box>
        <Menu.Label>{t("search.filter.sort.label")}</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            value={searchValues.sortBy}
            data={[
              {
                value: "relevance",
                label: t("search.filter.sort.relevance") as string,
              },
              {
                value: "rating",
                label: t("search.filter.sort.rating") as string,
              },
              {
                value: "upload_date",
                label: t("search.filter.sort.upload-date") as string,
              },
              {
                value: "view_count",
                label: t("search.filter.sort.view-count") as string,
              },
            ]}
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
            value={searchValues.time}
            data={[
              { value: "all", label: t("search.filter.time.all") as string },
              { value: "hour", label: t("search.filter.time.hour") as string },
              {
                value: "today",
                label: t("search.filter.time.today") as string,
              },
              { value: "week", label: t("search.filter.time.week") as string },
              {
                value: "month",
                label: t("search.filter.time.month") as string,
              },
              { value: "year", label: t("search.filter.time.year") as string },
            ]}
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
            value={searchValues.duration}
            data={[
              {
                value: "all",
                label: t("search.filter.duration.all") as string,
              },
              {
                value: "short",
                label: t("search.filter.duration.short") as string,
              },
              {
                value: "long",
                label: t("search.filter.duration.long") as string,
              },
              {
                value: "medium",
                label: t("search.filter.duration.medium") as string,
              },
            ]}
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
