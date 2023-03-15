import { ActionIcon, createStyles } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { memo } from "react";

const useStyles = createStyles((theme) => ({
  button: {
    height: 36,
    width: 36,

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: "none",
    },
  },
}));

export const GithubActionIcon = memo(() => {
  const { classes } = useStyles();

  return (
    <ActionIcon
      component="a"
      href="https://github.com/stephane-r/holoplay-pwa"
      target="_blank"
      className={classes.button}
      radius="md"
      variant="filled"
    >
      <IconBrandGithub size={20} />
    </ActionIcon>
  );
});
