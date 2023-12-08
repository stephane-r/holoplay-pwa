import { Box, Button, Divider, Popover, Space } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import { type FC, type ReactNode } from "react";

import { getSearchHistory } from "../database/utils";

interface SearcHistoryMenuProps {
  opened: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
}

export const SearcHistoryMenu: FC<SearcHistoryMenuProps> = ({
  opened,
  onSelect,
  children,
}) => {
  const data = getSearchHistory();

  if (!data.length) {
    return <>{children}</>;
  }

  return (
    <Popover opened={opened} width="target">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        data-testid="Search history submenu"
        aria-label="Search history submenu"
        p={4}
      >
        {data.map((item, index) => (
          <Box key={item.term}>
            <Button
              size="sm"
              variant="subtle"
              fullWidth
              onClick={() => onSelect(item.term)}
              styles={() => ({
                inner: {
                  justifyContent: "flex-start",
                },
              })}
              leftSection={<IconHistory size={16} />}
            >
              {item.term}
            </Button>
            {index + 1 < data.length ? (
              <>
                <Space h={4} />
                <Divider />
                <Space h={4} />
              </>
            ) : null}
          </Box>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};
