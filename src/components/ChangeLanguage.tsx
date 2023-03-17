import { Select } from "@mantine/core";
import i18next from "i18next";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type Languages = "en-EN" | "fr-FR";

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
      value={i18next.language}
      onChange={handleChange}
      data={[
        {
          value: "en-EN",
          label: "English",
        },
        {
          value: "fr-FR",
          label: "French",
        },
      ]}
    />
  );
});
