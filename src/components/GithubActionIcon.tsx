import { ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { memo } from "react";

export const GithubActionIcon = memo(() => {
  return (
    <ActionIcon
      component="a"
      color="gray"
      href="https://github.com/stephane-r/holoplay-pwa"
      target="_blank"
      style={{
        width: 36,
        height: 36,
      }}
      radius="md"
      variant="filled"
    >
      <IconBrandGithub size={20} />
    </ActionIcon>
  );
});
