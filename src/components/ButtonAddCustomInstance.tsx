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
        leftSection={<IconPlus size={14} />}
        onClick={onClick}
      >
        <Text size="xs">
          <strong>{t("invidious.button.add")}</strong>
        </Text>
      </Button>
    );
  },
);
