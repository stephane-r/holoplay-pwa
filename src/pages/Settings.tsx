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
import { SwitchColorScheme } from "../components/ColorScheme";
import { PageHeader } from "../components/PageHeader";
import { useSettings } from "../providers/Settings";
import { ImportData } from "../components/ImportData";
import { ExportData } from "../components/ExportData";

export const SettingsPage = memo(() => {
  return (
    <div>
      <PageHeader title="Settings" />
      <Accordion multiple variant="contained">
        <GeneralItem />
        <ImportExportDataItem />
      </Accordion>
    </div>
  );
});

const GeneralItem = memo(() => {
  const settings = useSettings();

  return (
    <Accordion.Item value="general">
      <Accordion.Control>
        <Group noWrap>
          <div>
            <Text>General</Text>
            <Text size="sm" color="dimmed" weight={400}>
              Invidious instance, locale and dark mode
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text>
          Current Invidious Instance :{" "}
          <strong>{settings.currentInstance?.domain}</strong>
        </Text>
        <Alert title="Information" mt="xs">
          <Text>
            For now, you can not set default Invidious instance. This feature
            will be coming soon !
          </Text>
        </Alert>
        <Divider mt="md" mb="lg" />
        <Select
          label="Choose language"
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
        <Alert title="Information" mt="lg">
          <Text>
            For now, HoloPlay is only available in English language. French
            translation is comming soon. Also, you can contribute to new
            language.
          </Text>
        </Alert>
        <Divider mt="md" mb="lg" />
        <SwitchColorScheme />
      </Accordion.Panel>
    </Accordion.Item>
  );
});

const ImportExportDataItem = memo(() => {
  const [type, setType] = useState<"import" | "export">("import");

  return (
    <Accordion.Item value="data">
      <Accordion.Control>
        <Group noWrap>
          <div>
            <Text>Import or export your data</Text>
            <Text size="sm" color="dimmed" weight={400}>
              Import your favorites and history from Invidious instance or
              Freetube, etc and export your data
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <SegmentedControl
          w={300}
          data={[
            { label: "Import", value: "import" },
            { label: "Export", value: "export" },
          ]}
          onChange={(type: "import" | "export") => setType(type)}
        />
        {type === "import" ? <ImportData /> : <ExportData />}
      </Accordion.Panel>
    </Accordion.Item>
  );
});
