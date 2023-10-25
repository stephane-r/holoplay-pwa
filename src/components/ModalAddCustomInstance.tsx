import {
  Button,
  Checkbox,
  Flex,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { db } from "../database";
import { useSetSettings } from "../providers/Settings";
import type { Instance } from "../types/interfaces/Instance";
import type { Settings } from "../types/interfaces/Settings";
import { ButtonAddCustomInstance } from "./ButtonAddCustomInstance";
import { Form } from "./Form";
import { Modal } from "./Modal";

const URL_REGEX = new RegExp(
  "^(https?:\\/\\/)?" + // Protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // Ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
    "(\\#[-a-z\\d_]*)?$",
  "i",
);

export const ModalAddCustomInstance = memo(() => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation("translation");
  const form = useForm({
    initialValues: {
      domain: "",
      type: "https",
      isDefault: false,
    },
    validate: {
      domain: (value) => !value.match(URL_REGEX),
    },
  });
  const setSettings = useSetSettings();

  const handleSubmit = (instance: {
    domain: string;
    type: string;
    isDefault: boolean;
  }) => {
    const customInstance = {
      domain: instance.domain,
      type: instance.type,
      uri: `${instance.type}://${instance.domain}`,
      custom: true,
    };
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      defaultInstance: instance.isDefault
        ? customInstance
        : data.defaultInstance,
      currentInstance: customInstance,
      customInstances: [customInstance, ...(data.customInstances ?? [])],
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      defaultInstance: instance.isDefault
        ? (customInstance as Instance)
        : previousState.defaultInstance,
      currentInstance: customInstance as Instance,
      customInstances: [
        customInstance as Instance,
        ...(previousState.customInstances ?? []),
      ],
    }));

    notifications.show({
      title: t("modal.instance.add.notification.title"),
      message: `${instance.domain} ${t(
        "modal.instance.add.notification.message",
      )}`,
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
        title={t("modal.instance.add.title")}
      >
        <Form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            data-autofocus
            placeholder={t("modal.instance.add.input.placeholder") as string}
            label={t("modal.instance.add.input.label")}
            description={t("modal.instance.add.input.description")}
            {...form.getInputProps("domain")}
          />
          <Space h="sm" />
          <Select
            label={t("settings.general.invidious.type")}
            {...form.getInputProps("type")}
            data={[
              { label: "https", value: "https" },
              { label: "http", value: "http" },
            ]}
          />
          <Space h="lg" />
          <Checkbox
            label={t("modal.instance.add.default")}
            {...form.getInputProps("isDefault")}
          />
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => setOpened(false)} color="gray">
              {t("modal.instance.add.button.cancel")}
            </Button>
            <Button type="submit" disabled={!form.isValid()}>
              {t("modal.instance.add.button.submit")}
            </Button>
          </Flex>
        </Form>
      </Modal>
      <ButtonAddCustomInstance onClick={() => setOpened(true)} />
    </>
  );
});
