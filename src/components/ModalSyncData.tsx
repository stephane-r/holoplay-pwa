import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useSyncData } from "../hooks/useSyncData";
import { Form } from "./Form";
import { Modal } from "./Modal";
import classes from "./ModalSyncData.module.css";

interface ModalSyncDataProps {
  opened: boolean;
  onClose: () => void;
}

export const ModalSyncData: FC<ModalSyncDataProps> = memo(
  ({ opened, onClose }) => {
    const { t } = useTranslation();
    const { digits, isLoading, handleSubmit } = useSyncData(onClose);

    return (
      <Modal
        opened={opened}
        onClose={() => onClose()}
        centered
        size="lg"
        title={t("modal.sync.title")}
      >
        <Form onSubmit={() => handleSubmit()}>
          <Text mb="lg">{t("modal.sync.text")}</Text>
          <Flex gap={12} justify="center" align="center" pt="xl" pb="xl">
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[0]}
                inputMode="decimal"
              />
            </Box>
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[1]}
                inputMode="decimal"
              />
            </Box>
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[2]}
                inputMode="decimal"
              />
            </Box>
            <Box>-</Box>
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[3]}
                inputMode="decimal"
              />
            </Box>
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[4]}
                inputMode="decimal"
              />
            </Box>
            <Box className={classes.column}>
              <TextInput
                size="lg"
                data-autofocus
                {...digits[5]}
                inputMode="decimal"
              />
            </Box>
          </Flex>
          <Flex gap={8} justify="flex-end" mt="xl">
            <Box hiddenFrom="xs">
              <Button onClick={() => onClose()} color="gray">
                {t("button.cancel")}
              </Button>
            </Box>
            <Button
              type="submit"
              loading={isLoading}
              disabled={digits.some(({ value }) => value === "")}
            >
              {t("modal.sync.button.submit")}
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  },
);
