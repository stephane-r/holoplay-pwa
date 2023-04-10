import { Box, Button, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { memo, useState } from "react";
import { getAllPlaylists } from "../database/utils";
import { useQuery } from "react-query";
import { showNotification } from "@mantine/notifications";

export const SaveData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.sync",
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
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: getAllPlaylists() }),
  });
  const response = await request.json();
  return response;
};

const ButtonSaveData = memo(() => {
  const { t } = useTranslation("translation", {
    keyPrefix: "settings.data.sync",
  });
  const [code, setCode] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useQuery("save-data", async () => saveData(), {
    enabled,
    onSuccess: (data) => {
      setCode(data.code);
      showNotification({
        title: t("notification.title"),
        message: t("notification.message"),
        color: "green",
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
        <Text>
          {t("notification.backupcode")} : <strong>{code}</strong>
        </Text>
      ) : null}
      <Button mt="md" onClick={handleClick}>
        {t("button.save")}
      </Button>
    </>
  );
});
