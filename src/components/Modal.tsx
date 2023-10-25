import {
  Modal as MModal,
  type ModalProps,
  useMantineTheme,
} from "@mantine/core";
import { type FC, type ReactNode } from "react";

import { useAppColorScheme } from "../hooks/useAppColorScheme";

interface AppModalProps extends ModalProps {
  children: ReactNode;
}

export const Modal: FC<AppModalProps> = ({ children, ...props }) => {
  const colorScheme = useAppColorScheme();
  const theme = useMantineTheme();

  return (
    <MModal
      overlayProps={{
        color:
          colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        blur: 5,
      }}
      radius="md"
      {...props}
    >
      {children}
    </MModal>
  );
};
