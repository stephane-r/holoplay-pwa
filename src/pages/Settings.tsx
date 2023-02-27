import { Alert, Text } from "@mantine/core";
import { memo } from "react";
import { PageHeader } from "../components/PageHeader";

export const SettingsPage = memo(() => {
  return (
    <div>
      <PageHeader title="Settings" />
      <Alert title="Oops">
        <Text>This page is in working progress</Text>
      </Alert>
    </div>
  );
});
