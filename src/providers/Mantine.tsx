import { MantineProvider as Provider } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider
      defaultColorScheme="auto"
      theme={{
        breakpoints: {
          xs: "30em",
          sm: "50em",
          md: "62em",
          lg: "75em",
          xl: "90em",
        },
      }}
    >
      {children}
    </Provider>
  );
};
