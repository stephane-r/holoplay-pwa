import {
  ActionIcon,
  Button,
  Flex,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { type FC, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { database } from "../services/database";
import { useSettings } from "../providers/Settings";
import type {
  RemoteDevice,
  RemoteDeviceType,
} from "../types/interfaces/Settings";
import { notifySuccess } from "../utils/notify";
import { Form } from "./Form";
import { Modal } from "./Modal";

interface ButtonAddOrEditDeviceProps {
  initialValues?: {
    id: string;
    name: string;
    type: RemoteDeviceType;
  };
}

interface FormData {
  id: string;
  name: string;
  type: RemoteDeviceType;
}

const INITIAL_VALUES = {
  id: "",
  name: "",
  type: "desktop",
} as FormData;

const REMOTE_DEVICES_ICONS_LABEL = ["desktop", "tablet", "mobile"];

export const ButtonAddOrEditDevice: FC<ButtonAddOrEditDeviceProps> = memo(
  ({ initialValues }) => {
    const [opened, setOpened] = useState(false);
    const { t } = useTranslation("translation");
    const form = useForm({
      initialValues: initialValues ?? INITIAL_VALUES,
      validate: {
        id: (value) => !value.length,
        name: (value) => !value.length,
      },
    });
    const settings = useSettings();

    const devices = useMemo(() => settings.devices, [settings.devices]);
    const isNewDevice = useMemo(() => !initialValues, [initialValues]);

    const handleSubmit = (formData: FormData) => {
      if (isNewDevice) {
        return handleAdd(formData);
      }
      return handleEdit(formData);
    };

    const handleEdit = async (formData: FormData) => {
      const device = {
        ...formData,
        updatedAt: new Date().toISOString(),
      } as RemoteDevice;

      const updatedDevices = devices.map((d) => {
        if (d.id === initialValues?.id) {
          return device;
        }
        return d;
      });

      await database.updateSettings({ devices: updatedDevices });

      notifySuccess({
        message: t("modal.device.edit.notification.message"),
      });

      setOpened(false);
    };

    const handleAdd = async (formData: FormData) => {
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
          title={t(
            isNewDevice ? "modal.device.add.title" : "modal.device.edit.title",
          )}
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
            <Space h="sm" />
            <Select
              label={t("modal.device.add.select.type.label")}
              data={REMOTE_DEVICES_ICONS_LABEL}
              {...form.getInputProps("type")}
            />
            <Flex gap={8} justify="flex-end" mt="xl">
              <Button onClick={() => setOpened(false)} color="gray">
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={!form.isValid()}>
                {t(isNewDevice ? "add" : "edit")}
              </Button>
            </Flex>
          </Form>
        </Modal>
        {isNewDevice ? (
          <Button onClick={() => setOpened(true)} leftSection={<IconPlus />}>
            {t("modal.device.add.title")}
          </Button>
        ) : (
          <ActionIcon onClick={() => setOpened(true)} title={t("edit")}>
            <IconEdit size={18} />
          </ActionIcon>
        )}
      </>
    );
  },
);
