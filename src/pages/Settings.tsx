import { Text } from "@mantine/core";
import { memo } from "react";
import { PageHeader } from "../components/PageHeader";
import { useSettings } from "../providers/Settings";

export const SettingsPage = memo(() => {
  const settings = useSettings();

  return (
    <div>
      <PageHeader title="Settings" />
      <Text>{settings.currentInstance?.domain}</Text>
    </div>
  );
});
