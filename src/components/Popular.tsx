import { LoadingOverlay } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getPopuplars } from "../services/popular";
import { CardList } from "./CardList";

export const Popular = memo(() => {
  const query = useQuery("most-popular", () => getPopuplars());
  const { t } = useTranslation();

  if (!query.data) {
    return <LoadingOverlay visible />;
  }

  if (query.error) {
    return <div>{t("error")}</div>;
  }

  return <CardList data={query.data} />;
});
