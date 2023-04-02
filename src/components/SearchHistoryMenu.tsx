import { Box, Button, Divider, Popover, Space } from "@mantine/core";
import { getSearchHistory } from "../database/utils";
import { IconHistory } from "@tabler/icons-react";

interface SearcHistoryMenuProps {
  opened: boolean;
  onSelect: (value: string) => void;
  children: React.ReactNode;
}

export const SearcHistoryMenu: React.FC<SearcHistoryMenuProps> = ({
  opened,
  onSelect,
  children,
}) => {
  const data = getSearchHistory();

  return (
    <Popover opened={opened} width="target">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown p={4}>
        {data.map((item, index) => (
          <Box key={item.term}>
            <Button
              size="sm"
              variant="subtle"
              fullWidth
              compact
              onClick={() => onSelect(item.term)}
              styles={() => ({
                inner: {
                  justifyContent: "flex-start",
                },
              })}
              leftIcon={<IconHistory size={16} />}
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
