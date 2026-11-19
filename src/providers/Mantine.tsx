import {
  LoadingOverlay,
  MantineProvider as Provider,
} from "@mantine/core";
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
        components: {
          // Every Card/Paper/Alert in the app uses radius="md" — the
          // overlay that sits on top of them while they load didn't,
          // leaving square corners poking out past the rounded container
          // underneath. Set once here instead of on every call site.
          LoadingOverlay: LoadingOverlay.extend({
            defaultProps: { overlayProps: { radius: "md" } },
          }),
        },
      }}
    >
      {children}
    </Provider>
  );
};
