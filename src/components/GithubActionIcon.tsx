import { ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { memo } from "react";

export const GithubActionIcon = memo(() => {
  return (
    <ActionIcon radius="md" variant="filled" style={{ height: 36, width: 36 }}>
      <IconBrandGithub size={20} />
    </ActionIcon>
  );
});
