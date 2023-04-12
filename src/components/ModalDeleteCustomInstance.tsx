import { Button, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../database";
import { Modal } from "./Modal";
import { CustomInstance } from "../types/interfaces/Instance";
import { ButtonDeleteCustomInstance } from "./ButtonDeleteustomInstance";
import { Settings } from "../types/interfaces/Settings";
import { useSetSettings, useSettings } from "../providers/Settings";

export const ModalDeleteCustomInstance = memo(
  ({ disabled, instance }: { disabled: boolean; instance: CustomInstance }) => {
    const [opened, setOpened] = useState(false);
    const { t } = useTranslation("translation", {
      keyPrefix: "modal.instance.delete",
    });
    const settings = useSettings();
    const setSettings = useSetSettings();

    const handleDeletePlaylist = () => {
      const customInstances = settings.customInstances.filter(
        (customInstance) => customInstance.domain !== instance.domain
      );
      db.update("settings", { ID: 1 }, (data: Settings) => ({
        customInstances,
      }));
      db.commit();
      setSettings((previousState) => ({
        ...previousState,
        customInstances,
      }));

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
  }
);
