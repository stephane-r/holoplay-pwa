import { Badge, Space, Text } from "@mantine/core";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import pkg from "../../package.json";

interface AppVersionProps {
  align?: "left" | "center" | "right";
}

export const AppVersion: React.FC<AppVersionProps> = memo(
  ({ align = "left" }) => {
    const { t } = useTranslation();

    return (
      <Text align={align} title={t("app.version")}>
        <Space h={4} />
        <Badge size="xs">{pkg.version}</Badge>
      </Text>
    );
  }
);
