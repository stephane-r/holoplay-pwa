import { Button, Flex, TextInput, Select, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../database";
import { Form } from "./Form";
import { Modal } from "./Modal";
import { ButtonAddCustomInstance } from "./ButtonAddCustomInstance";
import { useForm } from "@mantine/form";
import { Settings } from "../types/interfaces/Settings";
import { useSetSettings } from "../providers/Settings";
import { Instance } from "../types/interfaces/Instance";

const DOMAIN_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

export const ModalAddCustomInstance = memo(() => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "modal.instance.add",
  });
  const form = useForm({
    initialValues: {
      domain: "",
      type: "https",
    },
    validate: {
      domain: (value) => !value.match(DOMAIN_REGEX),
    },
  });
  const setSettings = useSetSettings();

  const handleSubmit = (instance: { domain: string; type: string }) => {
    const customInstance = {
      ...instance,
      uri: `${instance.type}://${instance.domain}`,
      custom: true,
    };
    db.update("settings", { ID: 1 }, (data: Settings) => ({
      currentInstance: customInstance,
      customInstances: [...(data.customInstances ?? []), customInstance],
    }));
    db.commit();
    setSettings((previousState) => ({
      ...previousState,
      currentInstance: customInstance as Instance,
      customInstances: [
        ...(previousState.customInstances ?? []),
        customInstance as Instance,
      ],
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
        <Form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            data-autofocus
            placeholder={t("input.placeholder") as string}
            label={t("input.label")}
            description={t("input.description")}
            {...form.getInputProps("domain")}
          />
          <Space h="sm" />
          <Select
            label="Type"
            {...form.getInputProps("type")}
            data={[{ label: "https", value: "https" }]}
          />
          <Flex gap={8} justify="flex-end" mt="xl">
            <Button onClick={() => setOpened(false)} color="gray">
              {t("button.cancel")}
            </Button>
            <Button type="submit" disabled={!form.isValid()}>
              {t("button.submit")}
            </Button>
          </Flex>
        </Form>
      </Modal>
      <ButtonAddCustomInstance onClick={() => setOpened(true)} />
    </>
  );
});
