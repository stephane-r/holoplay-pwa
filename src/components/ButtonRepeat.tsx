import { ActionIcon } from "@mantine/core";
import { IconRepeat, IconRepeatOnce } from "@tabler/icons-react";
import { memo } from "react";

import {
  usePlayerAudio,
  usePlayerState,
  useSetPlayerState,
} from "../providers/Player";

interface ButtonRepeatProps {
  iconSize?: number;
}

export const ButtonRepeat: React.FC<ButtonRepeatProps> = memo(
  ({ iconSize }) => {
    const playerState = usePlayerState();
    const playerAudio = usePlayerAudio();
    const setPlayerState = useSetPlayerState();

    const handleClick = () => {
      // @ts-ignore
      const audio = playerAudio?.current?.audioEl.current as HTMLAudioElement;
      audio.loop = !playerState.repeat;

      setPlayerState((previousState) => ({
        ...previousState,
        repeat: !previousState.repeat,
      }));
    };

    return (
      <ActionIcon onClick={handleClick}>
        {playerState.repeat ? (
          <IconRepeatOnce size={iconSize ?? undefined} />
        ) : (
          <IconRepeat size={iconSize ?? undefined} />
        )}
      </ActionIcon>
    );
  },
);
