import {
  Accordion,
  Divider,
  Group,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ChangeLanguage } from "../components/ChangeLanguage";
import { SwitchColorScheme } from "../components/ColorScheme";
import { ExportData } from "../components/ExportData";
import { ImportData } from "../components/ImportData";
import { PageHeader } from "../components/PageHeader";
import { SaveData } from "../components/SaveData";
import { SelectInvidiousInstance } from "../components/SelectInvidiousInstance";
import { SponsorBlockSettings } from "../components/SponsorBlockSettings";
import { SwitchVideoMode } from "../components/SwitchVideoMode";

export const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.settings.title")} />
      <Accordion variant="contained">
        <GeneralItem />
        <PlayerItem />
        <ImportExportDataItem />
      </Accordion>
    </div>
  );
});

const GeneralItem = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.general",
  });

  return (
    <Accordion.Item value="general" p={6}>
      <Accordion.Control>
        <Group>
          <div>
            <Text>{t("title")}</Text>
            <Text size="sm" c="dimmed">
              {t("description")}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text mb="md">{t("invidious.description")}</Text>
        <SelectInvidiousInstance />
        <Divider mt="md" mb="lg" />
        <ChangeLanguage />
        <Divider mt="md" mb="lg" />
        <SwitchColorScheme />
      </Accordion.Panel>
    </Accordion.Item>
  );
});

const PlayerItem = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.player",
  });

  return (
    <Accordion.Item value="player" p={6}>
      <Accordion.Control>
        <Group>
          <div>
            <Text>{t("title")}</Text>
            <Text size="sm" c="dimmed">
              {t("description")}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text mb="md">{t("video.mode.title")}</Text>
        <SwitchVideoMode />
        <Divider mt="xl" mb="lg" />
        <Text mb="md">{t("sponsorBlock.title")}</Text>
        <SponsorBlockSettings />
      </Accordion.Panel>
    </Accordion.Item>
  );
});

type ImportExportTab = "import" | "export" | "save";

const ImportExportDataItem = memo(() => {
  const [type, setType] = useState<ImportExportTab>("import");
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data",
  });

  return (
    <Accordion.Item value="data" p={6}>
      <Accordion.Control>
        <Group>
          <div>
            <Text>{t("title")}</Text>
            <Text size="sm" c="dimmed">
              {t("description")}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <SegmentedControl
          w={300}
          data={[
            { label: t("import"), value: "import" },
            { label: t("export"), value: "export" },
            { label: t("save"), value: "save" },
          ]}
          onChange={(type: ImportExportTab) => setType(type)}
        />
        {(() => {
          switch (type) {
            case "import":
              return <ImportData />;
            case "export":
              return <ExportData />;
            case "save":
              return <SaveData />;
            default:
              return null;
          }
        })()}
      </Accordion.Panel>
    </Accordion.Item>
  );
});
