import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const ButtonDeleteCustomInstance = memo(
  ({ disabled, onClick }: { disabled: boolean; onClick: () => void }) => {
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.general",
    });

    return (
      <Button
        disabled={disabled}
        leftSection={<IconTrash size={16} />}
        variant="subtle"
        h={24}
        p={4}
        onClick={onClick}
      >
        {t("invidious.delete")}
      </Button>
    );
  },
);
