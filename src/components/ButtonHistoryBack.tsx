import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ButtonHistoryBack = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Tooltip label={t("button.back")} position="right">
      <ActionIcon variant="filled" radius="xl" size="lg" onClick={handleClick}>
        <IconArrowLeft size={20} />
      </ActionIcon>
    </Tooltip>
  );
});
