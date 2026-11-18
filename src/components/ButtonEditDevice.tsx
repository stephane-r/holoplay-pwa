import { Button, Flex, Modal, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";
import type { RemoteDevice } from "../types/interfaces/Settings";
import { notifySuccess } from "../utils/notify";
import { Form } from "./Form";

interface ButtonEditDeviceProps {
  device: RemoteDevice;
}

export const ButtonEditDevice: FC<ButtonEditDeviceProps> = memo(
  ({ device: remoteDevice }) => {
    const [opened, setOpened] = useState(false);
    const { t } = useTranslation("translation");
    const form = useForm({
      initialValues: {
        id: remoteDevice.id,
        name: remoteDevice.name,
      },
      validate: {
        id: (value) => !value.length,
        name: (value) => !value.length,
      },
    });
    const settings = useSettings();

    const handleSubmit = async (formData: { id: string; name: string }) => {
      const device = {
        ...formData,
        createdAt: new Date().toISOString(),
      } as RemoteDevice;

      await database.updateSettings({
        devices: [device, ...(settings.devices ?? [])],
      });

      notifySuccess({
        message: t("modal.device.add.notification.message"),
      });

      form.reset();
      setOpened(false);
    };

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          size="lg"
          title={t("modal.device.add.title")}
        >
          <Form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              data-autofocus
              placeholder={t("modal.device.add.input.id.placeholder")}
              label={t("modal.device.add.input.id.label")}
              description={t("modal.device.add.input.id.description")}
              {...form.getInputProps("id")}
            />
            <Space h="sm" />
            <TextInput
              data-autofocus
              placeholder={t("modal.device.add.input.name.placeholder")}
              label={t("modal.device.add.input.name.label")}
              {...form.getInputProps("name")}
            />
            <Flex gap={8} justify="flex-end" mt="xl">
              <Button onClick={() => setOpened(false)} color="gray">
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={!form.isValid()}>
                {t("add")}
              </Button>
            </Flex>
          </Form>
        </Modal>
        <Button onClick={() => setOpened(true)} leftSection={<IconEdit />}>
          {t("modal.device.add.title")}
        </Button>
      </>
    );
  },
);
