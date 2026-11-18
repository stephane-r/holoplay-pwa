import { MultiSelect, Space, Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";
import { sponsorBlockCategoriesValues } from "../utils/sponsorBlockCategories";

export const SponsorBlockSettings = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.player",
  });

  const handleChangeSponsorBlock = async () => {
    await database.updateSettings({ sponsorBlock: !settings.sponsorBlock });
  };

  const handleChangeCategories = async (sponsorBlockCategories: string[]) => {
    await database.updateSettings({ sponsorBlockCategories });
  };

  return (
    <>
      <Switch
        checked={settings.sponsorBlock}
        label={t("sponsorBlock.label")}
        onChange={handleChangeSponsorBlock}
      />
      <Space h="md" />
      <MultiSelect
        label={t("sponsorBlock.select.label")}
        description={t("sponsorBlock.select.description")}
        disabled={!settings.sponsorBlock}
        multiple
        value={settings.sponsorBlockCategories}
        onChange={handleChangeCategories}
        data={sponsorBlockCategoriesValues}
      />
    </>
  );
});
