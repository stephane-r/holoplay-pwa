import {
  Group,
  Text,
  Accordion,
  Divider,
  Alert,
  SegmentedControl,
} from "@mantine/core";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SwitchColorScheme } from "../components/ColorScheme";
import { PageHeader } from "../components/PageHeader";
import { useSettings } from "../providers/Settings";
import { ImportData } from "../components/ImportData";
import { ExportData } from "../components/ExportData";
import { ChangeLanguage } from "../components/ChangeLanguage";
import { SaveData } from "../components/SaveData";

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
  const settings = useSettings();
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
        <Text>
          {t("invidious.current")} :{" "}
          <strong>{settings.currentInstance?.domain}</strong>
        </Text>
        <Alert title={t("invidious.alert.title")} mt="xs">
          <Text>{t("invidious.alert")}</Text>
        </Alert>
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
