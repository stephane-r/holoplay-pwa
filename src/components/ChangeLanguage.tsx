import { Select } from "@mantine/core";
import i18next from "i18next";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Languages, languagesValues } from "../translations";

export const ChangeLanguage = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.general",
  });

  const handleChange = (lang: Languages) => {
    i18next.changeLanguage(lang);
  };

  return (
    <Select
      label={t("language")}
      description={t("language.description")}
      value={i18next.language}
      onChange={handleChange}
      data={languagesValues}
    />
  );
});
