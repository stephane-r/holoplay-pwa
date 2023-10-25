import { MultiSelect, Space, Switch } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings, useSettings } from "../providers/Settings";
import type { Settings } from "../types/interfaces/Settings";

export const sponsorBlockCategoriesValues = [
  {
    value: "sponsor",
    label: "Sponsor",
  },
  {
    value: "intro",
    label: "Intro",
  },
  {
    value: "outro",
    label: "Outro",
  },
  {
    value: "interaction",
    label: "Interaction",
  },
  {
    value: "selfpromo",
    label: "Self Promotion",
  },
  {
    value: "music_offtopic",
    label: "Music/Offtopic",
  },
  {
    value: "preview",
    label: "Preview",
  },
  {
    value: "filler",
    label: "Filler",
  },
];

export const SponsorBlockSettings = memo(() => {
  const settings = useSettings();
  const setSettings = useSetSettings();
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.player",
  });

  const handleChangeSponsorBlock = () => {
    const sponsorBlock = !settings.sponsorBlock;
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      sponsorBlock,
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      sponsorBlock,
    }));
  };

  const handleChangeCategories = (sponsorBlockCategories: string[]) => {
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      sponsorBlockCategories,
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      sponsorBlockCategories,
    }));
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
