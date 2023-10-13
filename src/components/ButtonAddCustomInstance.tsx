import { Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const ButtonAddCustomInstance = memo(
  ({ onClick }: { onClick: () => void }) => {
    const { t } = useTranslation("translation", {
      keyPrefix: "settings.general",
    });

    return (
      <Button
        size="xs"
        variant="subtle"
        ml="xs"
        color="blue"
        leftIcon={<IconPlus size={14} />}
        onClick={onClick}
      >
        <Text>{t("invidious.button.add")}</Text>
      </Button>
    );
  },
);
