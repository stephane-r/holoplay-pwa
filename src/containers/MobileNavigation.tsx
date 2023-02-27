import { Burger, Space, useMantineTheme } from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import { memo } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

export const MobileNavigationContainer = memo(() => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [value, setValue] = useToggle([false, true]);

  if (!matches) return null;

  return (
    <>
      <div style={{ marginRight: "auto" }}>
        <Burger
          opened={value}
          size="sm"
          aria-label="Open navigation"
          onClick={() => setValue()}
        />
      </div>
      <Space w={16} />
      {value ? <MobileNavigation onClose={() => setValue()} /> : null}
    </>
  );
});
