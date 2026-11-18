import {
  type Dispatch,
  type FC,
  type MutableRefObject,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRemotePlay } from "../hooks/useRemotePlay";
import { initialPlayerVideoState } from "../services/playback";
import { usePlaybackService } from "../services/playback/usePlaybackService";

interface PlayerState {
  paused: boolean;
  muted: boolean;
  repeat: boolean;
  audioDuration: number | null;
  duration: string | null;
  currentTime: number | null;
  formatedCurrentTime: string | null;
  percentage: number | null;
  volume: number;
  loading: boolean;
}

export const initialPlayerState: PlayerState = {
  paused: false,
  muted: false,
  repeat: false,
  audioDuration: null,
  duration: null,
  currentTime: null,
  formatedCurrentTime: null,
  percentage: null,
  volume: 1,
  loading: true,
};

const PlayerAudioContext = createContext<MutableRefObject<null> | null>(null);
const PlayerStateContext = createContext<PlayerState>(initialPlayerState);
const SetPlayerStateContext = createContext<
  Dispatch<SetStateAction<PlayerState>>
>(() => {});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playerStatus, setPlayerStatus] =
    useState<PlayerState>(initialPlayerState);
  const playerAudioRef = useRef(null);

  const playerState = useMemo(
    () => ({
      playerStatus,
      setPlayerStatus,
    }),
    [playerStatus],
  );

  return (
    <PlayerAudioContext.Provider value={playerAudioRef}>
      <PlayerStateContext.Provider value={playerState.playerStatus}>
        <SetPlayerStateContext.Provider value={playerState.setPlayerStatus}>
          {children}
          <RemotePlayHook />
        </SetPlayerStateContext.Provider>
      </PlayerStateContext.Provider>
    </PlayerAudioContext.Provider>
  );
};

const RemotePlayHook = () => {
  useRemotePlay();
  return null;
};

export const usePlayerUrl = () => usePlaybackService().url;
export const usePlayerVideo = () =>
  usePlaybackService().video ?? initialPlayerVideoState;
export const usePlayerAudio = () => useContext(PlayerAudioContext);
export const usePlayerState = () => useContext(PlayerStateContext);
export const useSetPlayerState = () => useContext(SetPlayerStateContext);
