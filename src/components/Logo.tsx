import { UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { IconBrandGooglePlay } from "@tabler/icons-react";

export const Logo = memo(() => {
  return (
    <UnstyledButton style={{ marginTop: 8 }}>
      <IconBrandGooglePlay />
    </UnstyledButton>
  );
});
