import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getTrendings } from "../services/trending";
import { CardList } from "./CardList";

export const Trending = memo(() => {
  const query = useQuery("trending", () => getTrendings());
  const { t } = useTranslation();

  if (!query.data) {
    return <LoadingOverlay visible />;
  }

  if (query.error) {
    return <div>{t("error")}</div>;
  }

  return <CardList data={query.data} />;
});
