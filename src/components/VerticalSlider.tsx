import { Group, createStyles, rem } from "@mantine/core";
import { useMove } from "@mantine/hooks";
import { memo, useState } from "react";

const SLIDER_WIDTH = 4;
const SLIDER_HEIGHT = 120;

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    width: rem(SLIDER_WIDTH),
    height: rem(SLIDER_HEIGHT),
    background:
      theme.colorScheme === "dark"
        ? "rgba(255, 255, 255, .1)"
        : "rgba(0, 0, 0, .1)",
    borderRadius: theme.radius.md,
    cursor: "pointer",
  },
  filledBar: {
    position: "absolute",
    bottom: 0,
    width: rem(SLIDER_WIDTH),
    background: theme.colorScheme === "dark" ? "white" : theme.colors.blue[6],
    borderRadius: theme.radius.md,
  },
}));

interface VerticalSliderProps {
  value?: number;
  onChangeEnd: (value: number) => void;
}

export const VerticalSlider: React.FC<VerticalSliderProps> = memo(
  ({ value, onChangeEnd }) => {
    const { classes } = useStyles();
    const [localValue, setLocalValue] = useState(0.2);
    const { ref } = useMove(({ y }) => handleChangeEnd(1 - y));

    const handleChangeEnd = (updatedValue: number) => {
      if (!value) {
        setLocalValue(updatedValue);
      }
      onChangeEnd(Math.trunc(updatedValue * 100));
    };

    return (
      <Group>
        <div ref={ref} className={classes.container}>
          <FilledBar value={value ?? localValue * 100} />
        </div>
      </Group>
    );
  },
);

const FilledBar = memo(({ value }: { value: number }) => {
  const { classes } = useStyles();

  return (
    <div
      className={classes.filledBar}
      style={{
        height: `${value}%`,
      }}
    />
  );
});
