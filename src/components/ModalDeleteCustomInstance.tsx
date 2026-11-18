import { Button, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";
import type { CustomInstance } from "../types/interfaces/Instance";
import { ButtonDeleteCustomInstance } from "./ButtonDeleteustomInstance";
import { Modal } from "./Modal";

export const ModalDeleteCustomInstance = memo(
  ({ disabled, instance }: { disabled: boolean; instance: CustomInstance }) => {
    const [opened, setOpened] = useState(false);
    const { t } = useTranslation("translation", {
      keyPrefix: "modal.instance.delete",
    });
    const settings = useSettings();

    const handleDeletePlaylist = async () => {
      const customInstances = settings.customInstances.filter(
        (customInstance) => customInstance.domain !== instance.domain,
      );
      await database.updateSettings({ customInstances });

      notifications.show({
        title: t("notification.title"),
        message: `${instance.domain} ${t("notification.message")}`,
      });

      setOpened(false);
    };

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          size="lg"
          title={t("title")}
        >
          <Text>
            {t("text")} <strong>{instance.domain}</strong> ?
          </Text>
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => setOpened(false)} color="gray">
              {t("button.cancel")}
            </Button>
            <Button onClick={handleDeletePlaylist} color="red">
              {t("button.submit")}
            </Button>
          </Flex>
        </Modal>
        <ButtonDeleteCustomInstance
          disabled={disabled}
          onClick={() => setOpened(true)}
        />
      </>
    );
  },
);
