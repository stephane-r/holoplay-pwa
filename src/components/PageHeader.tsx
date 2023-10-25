import { Flex, Space, Title } from "@mantine/core";
import type { FC, ReactNode } from "react";

import { ButtonHistoryBack } from "./ButtonHistoryBack";

interface PageHeaderProps {
  title: string;
  canGoBack?: boolean;
  children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  canGoBack = false,
  children,
}) => {
  return (
    <Flex gap={20} align="center" mb="xl">
      {canGoBack ? <ButtonHistoryBack /> : null}
      <Title order={1}>{title}</Title>
      <Space h={28} />
      {children ?? null}
    </Flex>
  );
};
