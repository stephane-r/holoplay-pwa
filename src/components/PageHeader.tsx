import { Flex, Space, Title } from "@mantine/core";
import { memo } from "react";
import { ButtonHistoryBack } from "./ButtonHistoryBack";

interface PageHeaderProps {
  title: string;
  canGoBack?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = memo(
  ({ title, canGoBack = false }) => {
    return (
      <Flex gap={20} align="center" mb="xl">
        {canGoBack ? <ButtonHistoryBack /> : null}
        <Title order={1}>{title}</Title>
        <Space h={28} />
      </Flex>
    );
  }
);
