import { Modal as MModal, ModalProps, useMantineTheme } from "@mantine/core";

interface AppModalProps extends ModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<AppModalProps> = ({ children, ...props }) => {
  const theme = useMantineTheme();

  return (
    <MModal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      radius="md"
      {...props}
    >
      {children}
    </MModal>
  );
};
