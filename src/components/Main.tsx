import { createStyles, rem } from "@mantine/core";

import { PlayerSpace } from "./Player";

const useStyles = createStyles((theme) => ({
  main: {
    flex: 1,
    padding: `${rem(80)} ${rem(20)} ${rem(80)}`,

    [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: `${rem(16)} ${rem(28)} ${rem(24)} ${rem(28)}`,
      paddingRight: rem(28),
      paddingLeft: rem(28),
      paddingBottom: rem(24),
    },
  },
}));

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <main className={classes.main}>
      {children}
      <PlayerSpace />
    </main>
  );
};
