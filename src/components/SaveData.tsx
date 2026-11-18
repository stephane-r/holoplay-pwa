import { Alert, Box, Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import { database } from "../services/database";

export const SaveData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.save",
  });

  return (
    <Box mt="lg">
      <Text>{t("text")}</Text>
      <ButtonSaveData />
    </Box>
  );
});

const saveData = async () => {
  const request = await fetch(`${process.env.REACT_APP_API_URL}/api/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: await database.getAllPlaylists() }),
  });
  const response = await request.json();
  return response;
};

const ButtonSaveData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.save",
  });
  const [code, setCode] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  const { isLoading } = useQuery("save-data", async () => saveData(), {
    enabled,
    // This is really a one-off "upload and get a backup code" action behind
    // a static query key — always re-run it, don't let the global default
    // staleTime return a cached code from a previous click.
    staleTime: 0,
    onSuccess: (data) => {
      setCode(data.code);
      notifications.show({
        title: t("notification.title"),
        message: t("notification.message"),
        color: "green",
      });
      setEnabled(false);
    },
    retry: false,
    onError: () => {
      notifications.show({
        title: t("notification.error.title"),
        message: t("notification.error.message"),
        color: "red",
      });
      setEnabled(false);
    },
  });

  const handleClick = () => {
    setEnabled(true);
  };

  return (
    <>
      {code ? (
        <Alert mt="sm" title="Code">
          <Text>
            {t("backupcode")} : <strong>{code}</strong>. {t("backupcode2")}
          </Text>
        </Alert>
      ) : null}
      <Button loading={isLoading} mt="md" onClick={handleClick}>
        {t("button.save")}
      </Button>
    </>
  );
});
