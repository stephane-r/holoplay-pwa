import { Group } from "@mantine/core";
import { useMove } from "@mantine/hooks";
import { type FC, memo, useState } from "react";

import classes from "./VerticalSlider.module.css";

interface VerticalSliderProps {
  value?: number;
  onChangeEnd: (value: number) => void;
}

export const VerticalSlider: FC<VerticalSliderProps> = memo(
  ({ value, onChangeEnd }) => {
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
  return (
    <div
      className={classes.filledBar}
      style={{
        height: `${value}%`,
      }}
    />
  );
});
