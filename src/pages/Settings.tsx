import {
  Group,
  Text,
  Accordion,
  Divider,
  SegmentedControl,
} from "@mantine/core";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SwitchColorScheme } from "../components/ColorScheme";
import { PageHeader } from "../components/PageHeader";
import { ImportData } from "../components/ImportData";
import { ExportData } from "../components/ExportData";
import { ChangeLanguage } from "../components/ChangeLanguage";
import { SaveData } from "../components/SaveData";
import { SelectInvidiousInstance } from "../components/SelectInvidiousInstance";

export const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.settings.title")} />
      <Accordion variant="contained">
        <GeneralItem />
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
    <Accordion.Item value="general">
      <Accordion.Control>
        <Group noWrap>
          <div>
            <Text>{t("title")}</Text>
            <Text size="sm" color="dimmed" weight={400}>
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

type ImportExportTab = "import" | "export" | "save";

const ImportExportDataItem = memo(() => {
  const [type, setType] = useState<ImportExportTab>("import");
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data",
  });

  return (
    <Accordion.Item value="data">
      <Accordion.Control>
        <Group noWrap>
          <div>
            <Text>{t("title")}</Text>
            <Text size="sm" color="dimmed" weight={400}>
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
