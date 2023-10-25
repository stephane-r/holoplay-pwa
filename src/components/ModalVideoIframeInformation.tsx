import { Text, Title } from "@mantine/core";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { Modal } from "./Modal";

interface ModalVideoIframeInformationProps {
  opened: boolean;
  onClose: () => void;
}

export const ModalVideoIframeInformation: FC<ModalVideoIframeInformationProps> =
  memo(({ opened, onClose }) => {
    const { t } = useTranslation();

    return (
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="lg"
        title={t("modal.video.iframe.information.title")}
      >
        <Title order={4} mb="xs">
          {t("modal.video.iframe.information.subtitle")}
        </Title>
        <Text mb="xs">{t("modal.video.iframe.information.text1")}</Text>
        <Text mb="xs">
          {t("modal.video.iframe.information.text2")} :{" "}
          <strong>youtube-nocookie.com</strong>
        </Text>
        <Text>{t("modal.video.iframe.information.text3")}</Text>
      </Modal>
    );
  });
