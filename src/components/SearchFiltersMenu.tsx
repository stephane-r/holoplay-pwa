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

export const SearchFilters = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const { t } = useTranslation();

  return (
    <Menu width={250} position="bottom-end">
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
            data={[
              {
                value: "invidious",
                label: t("search.filter.service.invidious"),
              },
              {
                value: "youtube_music",
                label: t("search.filter.service.youtubeMusic"),
              },
            ]}
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
            value={searchValues.type}
            data={[
              { value: "video", label: t("search.filter.type.videos") },
              { value: "playlist", label: t("search.filter.type.playlists") },
              { value: "channel", label: t("search.filter.type.channel") },
              { value: "all", label: t("search.filter.type.all") },
            ]}
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
