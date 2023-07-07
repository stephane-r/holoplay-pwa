import { Select } from "@mantine/core";
// @ts-ignore
import { getName, getCode } from "country-list";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { countriesCode } from "../utils/countriesCode";
import {
  useSetTrendingFiltersValues,
  useTrendingFiltersValues,
} from "../providers/TrendingFilters";

export type TrendingFilterType = "music" | "gaming" | "news" | "movies";

export const TrendingFilters = memo(() => {
  const { t } = useTranslation();
  const trendingFiltersValues = useTrendingFiltersValues();
  const setTrendingFiltersValues = useSetTrendingFiltersValues();

  return (
    <>
      <Select
        value={trendingFiltersValues.type}
        onChange={(value) =>
          setTrendingFiltersValues({
            ...trendingFiltersValues,
            type: value as TrendingFilterType,
          })
        }
        data={[
          { value: "music", label: t("search.filter.type.musics") },
          { value: "gaming", label: t("search.filter.type.gaming") },
          { value: "news", label: t("search.filter.type.news") },
          { value: "movies", label: t("search.filter.type.movies") },
        ]}
      />
      <Select
        searchable
        value={
          trendingFiltersValues.region
            ? getCode(getName(trendingFiltersValues.region))
            : null
        }
        onChange={(value) =>
          setTrendingFiltersValues({
            ...trendingFiltersValues,
            region: value as string,
          })
        }
        data={countriesCode}
      />
    </>
  );
});
