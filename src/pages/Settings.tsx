import {
  Group,
  Text,
  Accordion,
  Divider,
  Alert,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SwitchColorScheme } from "../components/ColorScheme";
import { PageHeader } from "../components/PageHeader";
import { useSettings } from "../providers/Settings";
import { ImportData } from "../components/ImportData";
import { ExportData } from "../components/ExportData";

export const SettingsPage = memo(() => {
  return (
    <div>
      <PageHeader title="Settings" />
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
        <Select
          label={t("language")}
          defaultValue="en"
          disabled
          data={[
            {
              value: "en",
              label: "English",
            },
            {
              value: " fr",
              label: "French",
            },
          ]}
        />
        <Alert title={t("language.alert.title")} mt="lg">
          <Text>{t("language.alert")}</Text>
        </Alert>
        <Divider mt="md" mb="lg" />
        <SwitchColorScheme />
      </Accordion.Panel>
    </Accordion.Item>
  );
});

const ImportExportDataItem = memo(() => {
  const [type, setType] = useState<"import" | "export">("import");
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
          ]}
          onChange={(type: "import" | "export") => setType(type)}
        />
        {type === "import" ? <ImportData /> : <ExportData />}
      </Accordion.Panel>
    </Accordion.Item>
  );
});
