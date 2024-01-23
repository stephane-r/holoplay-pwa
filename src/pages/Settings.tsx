import {
  Accordion,
  Box,
  Divider,
  Group,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ChangeLanguage } from "../components/ChangeLanguage";
import { SwitchColorScheme } from "../components/ColorScheme";
import { DevicesList } from "../components/DeviceList";
import { ExportData } from "../components/ExportData";
import { ImportData } from "../components/ImportData";
import { PageHeader } from "../components/PageHeader";
import { SaveData } from "../components/SaveData";
import { SelectInvidiousInstance } from "../components/SelectInvidiousInstance";
import { SponsorBlockSettings } from "../components/SponsorBlockSettings";
import { SwitchPlausibleAnalytics } from "../components/SwitchPlausibleAnalytics";
import { SwitchVideoMode } from "../components/SwitchVideoMode";
import { useStorage } from "../hooks/useStorage";
import { useSettings } from "../providers/Settings";

export const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.settings.title")} />
      <Accordion variant="contained">
        <GeneralItem />
        <PlayerItem />
        <ImportExportDataItem />
        <DevicesItem />
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
        <DeviceUuid />
        <Divider mt="md" mb="lg" />
        <Text mb="md">{t("invidious.description")}</Text>
        <SelectInvidiousInstance />
        <Divider mt="md" mb="lg" />
        <ChangeLanguage />
        <Divider mt="md" mb="lg" />
        <SwitchColorScheme />
        <AnalyticsItem />
        <Divider mt="md" mb="lg" />
        <StorageEstimate />
      </Accordion.Panel>
    </Accordion.Item>
  );
});

const DeviceUuid = memo(() => {
  const settings = useSettings();
  const { t } = useTranslation();

  return (
    <>
      <Text>{t("settings.general.device.uuid")}</Text>
      <Text>
        <strong>{settings.deviceId}</strong>
      </Text>
    </>
  );
});

const AnalyticsItem = memo(() => {
  if (process.env.REACT_APP_PLAUSIBLE_ANALYTICS !== "true") {
    return null;
  }

  return (
    <>
      <Divider mt="md" mb="lg" />
      <SwitchPlausibleAnalytics />
    </>
  );
});

const StorageEstimate = memo(() => {
  const storage = useStorage();
  const hasUsage = useMemo(
    () => storage?.usage && storage?.usage > 0,
    [storage],
  );
  const { t } = useTranslation();

  if (!storage) {
    return null;
  }

  return (
    <Box>
      <Text>
        {t("settings.general.storage.available.storage")} :{" "}
        <strong>{storage.formatedQuota}</strong>
      </Text>
      <Text>
        <div
          dangerouslySetInnerHTML={{
            __html: t("settings.general.storage.usage", {
              percentage: `<strong>${storage.percentageUsed}%</strong> ${
                hasUsage ? `(${storage.formatedUsage})` : ""
              }`,
            }),
          }}
        />
      </Text>
    </Box>
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
          onChange={(type: string) => setType(type as ImportExportTab)}
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

const DevicesItem = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.devices",
  });

  return (
    <Accordion.Item value="devices" p={6}>
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
        <DevicesList />
      </Accordion.Panel>
    </Accordion.Item>
  );
});
