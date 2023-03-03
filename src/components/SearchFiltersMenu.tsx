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

export const SearchFilters = memo(() => {
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();

  return (
    <Menu width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="filled" radius="md" size={36}>
          <IconFilter size={20} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Type</Menu.Label>
        <Box p="xs" pt={4}>
          <SegmentedControl
            fullWidth
            value={searchValues.type}
            data={[
              { label: "Videos", value: "video" },
              { label: "Playlists", value: "playlist" },
            ]}
            onChange={(value) => {
              setSearchValues({
                ...searchValues,
                type: value as SearchTypes,
              });
            }}
          />
        </Box>
        <Menu.Label>Sort by</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            value={searchValues.sortBy}
            data={[
              { value: "relevance", label: "Most relevant" },
              { value: "rating", label: "Rating" },
              { value: "upload_date", label: "Upload date" },
              { value: "view_count", label: "View count" },
            ]}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                sortBy: value as SearchSortBy,
              })
            }
          />
        </Box>
        <Menu.Label>Time</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            value={searchValues.time}
            data={[
              { value: "all", label: "Any time" },
              { value: "hour", label: "Last hour" },
              { value: "today", label: "Today" },
              { value: "week", label: "This week" },
              { value: "month", label: "This month" },
              { value: "year", label: "This year" },
            ]}
            onChange={(value) =>
              setSearchValues({
                ...searchValues,
                time: value as SearchDate,
              })
            }
          />
        </Box>
        <Menu.Label>Duration</Menu.Label>
        <Box p="xs" pt={4}>
          <Select
            value={searchValues.duration}
            data={[
              { value: "all", label: "All durations" },
              { value: "short", label: "Short" },
              { value: "long", label: "Long" },
              { value: "medium", label: "Medium" },
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
