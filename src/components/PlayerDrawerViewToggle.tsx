import { SegmentedControl } from "@mantine/core";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

export type PlayerDrawerView = "queue" | "chapters";

interface PlayerDrawerViewToggleProps {
  value: PlayerDrawerView;
  onChange: (value: PlayerDrawerView) => void;
}

export const PlayerDrawerViewToggle: FC<PlayerDrawerViewToggleProps> = memo(
  ({ value, onChange }) => {
    const { t } = useTranslation();

    return (
      <SegmentedControl
        fullWidth
        value={value}
        onChange={(next) => onChange(next as PlayerDrawerView)}
        data={[
          { label: t("player.queue"), value: "queue" },
          { label: t("player.chapters"), value: "chapters" },
        ]}
      />
    );
  },
);
