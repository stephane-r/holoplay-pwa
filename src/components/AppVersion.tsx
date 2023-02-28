import { Badge, Space, Text } from "@mantine/core";
import { memo } from "react";
import pkg from "../../package.json";

interface AppVersionProps {
  align?: "left" | "center" | "right";
}

export const AppVersion: React.FC<AppVersionProps> = memo(
  ({ align = "left" }) => {
    return (
      <Text align={align} title="App version">
        <Space h={4} />
        <Badge size="xs">{pkg.version}</Badge>
      </Text>
    );
  }
);
