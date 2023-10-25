import type { FC, PropsWithChildren } from "react";

import classes from "./Main.module.css";
import { PlayerSpace } from "./Player";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={classes.main}>
      {children}
      <PlayerSpace />
    </main>
  );
};
