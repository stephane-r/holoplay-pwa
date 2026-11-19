import { ActionIcon, Badge, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useSearchValues, useSetSearchValues } from "../providers/Search";
import {
  DEFAULT_SEARCH_FILTERS,
  SEARCH_FILTER_GROUPS,
} from "../utils/searchFilters";

// Filters live behind a menu, hidden by default — this recaps whichever
// ones aren't at their default value, right under the search bar, so
// there's no need to open that menu just to see what's currently applied.
export const ActiveSearchFilters = memo(() => {
  const searchValues = useSearchValues();
  const setSearchValues = useSetSearchValues();
  const { t } = useTranslation();

  const activeFilters = (
    Object.keys(SEARCH_FILTER_GROUPS) as (keyof typeof SEARCH_FILTER_GROUPS)[]
  )
    .filter((key) => searchValues[key] !== DEFAULT_SEARCH_FILTERS[key])
    .map((key) => {
      const option = SEARCH_FILTER_GROUPS[key].find(
        (option) => option.value === searchValues[key],
      );

      return { key, label: option ? t(option.labelKey) : searchValues[key] };
    });

  if (!activeFilters.length) {
    return null;
  }

  return (
    <Group gap="xs" mb="sm" role="list" aria-label="Active search filters">
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          role="listitem"
          variant="light"
          size="lg"
          rightSection={
            <ActionIcon
              size="xs"
              variant="transparent"
              color="inherit"
              aria-label={`Remove ${filter.label} filter`}
              onClick={() =>
                setSearchValues({
                  ...searchValues,
                  [filter.key]: DEFAULT_SEARCH_FILTERS[filter.key],
                })
              }
            >
              <IconX size={12} />
            </ActionIcon>
          }
        >
          {filter.label}
        </Badge>
      ))}
    </Group>
  );
});
