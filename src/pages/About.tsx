import { Alert, Text } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";

export const AboutPage = () => {
  return (
    <div>
      <PageHeader title="About" />
      <Alert title="Oops">
        <Text>This page is in working progress</Text>
      </Alert>
    </div>
  );
};
