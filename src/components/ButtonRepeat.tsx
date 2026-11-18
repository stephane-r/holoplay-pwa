import { ActionIcon } from "@mantine/core";
import { IconRepeat, IconRepeatOnce } from "@tabler/icons-react";
import { type FC, memo } from "react";

import { useAudioElement } from "../hooks/useAudioElement";
import { usePlayerState, useSetPlayerState } from "../providers/Player";

interface ButtonRepeatProps {
  iconSize?: number;
}

export const ButtonRepeat: FC<ButtonRepeatProps> = memo(({ iconSize }) => {
  const playerState = usePlayerState();
  const audioElement = useAudioElement();
  const setPlayerState = useSetPlayerState();

  const handleClick = () => {
    if (audioElement) {
      audioElement.loop = !playerState.repeat;
    }

    setPlayerState((previousState) => ({
      ...previousState,
      repeat: !previousState.repeat,
    }));
  };

  return (
    <ActionIcon color="transparent" onClick={handleClick} title="Repeat">
      {playerState.repeat ? (
        <IconRepeatOnce size={iconSize ?? undefined} />
      ) : (
        <IconRepeat size={iconSize ?? undefined} />
      )}
    </ActionIcon>
  );
});
