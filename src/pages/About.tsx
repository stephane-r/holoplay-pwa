import { Alert, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t("page.about.title")} />
      <Alert title={t("page.wip.alert.title")}>
        <Text>{t("page.wip.alert.message")}</Text>
      </Alert>
    </div>
  );
};
