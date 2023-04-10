import { memo, useState } from "react";
import { NavbarLink } from "./NavbarLink";
import { IconCloudDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ModalSyncData } from "./ModalSyncData";

export const ButtonSyncData = memo(() => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened((state) => !state);
  };

  return (
    <>
      <NavbarLink
        icon={IconCloudDownload}
        label={t("navigation.sync")}
        onClick={handleClose}
      />
      <ModalSyncData opened={opened} onClose={handleClose} />
    </>
  );
});
