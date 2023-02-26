import { createStyles } from "@mantine/core";
import { PlayerSpace } from "./Player";

const useStyles = createStyles(() => ({
  main: {
    flex: 1,
    padding: "16px 28px 24px",
  },
}));

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  const { cx, classes } = useStyles();

  return (
    <main className={cx(classes.main)}>
      {children}
      <PlayerSpace />
    </main>
  );
};
