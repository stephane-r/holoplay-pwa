import {
  type Dispatch,
  type FC,
  type MutableRefObject,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import type ReactAudioPlayer from "react-audio-player";

import { useRemotePlay } from "../hooks/useRemotePlay";
import { initialPlayerVideoState } from "../services/playback";
import { usePlaybackService } from "../services/playback/usePlaybackService";

// Rarely-changing playback controls — paused/muted/repeat/volume/loading
// only flip on user action or when a new video starts loading.
interface PlayerState {
  paused: boolean;
  muted: boolean;
  repeat: boolean;
  volume: number;
  loading: boolean;
}

export const initialPlayerState: PlayerState = {
  paused: false,
  muted: false,
  repeat: false,
  volume: 1,
  loading: true,
};

// Continuously-updating transport time — rewritten ~10x/second while audio
// plays (PlayerAudio.tsx's handleListen). Kept in its own context so that
// components only caring about controls (paused, volume, repeat...) don't
// re-render on every tick.
interface PlayerTime {
  audioDuration: number | null;
  duration: string | null;
  currentTime: number | null;
  formatedCurrentTime: string | null;
  percentage: number | null;
}

export const initialPlayerTime: PlayerTime = {
  audioDuration: null,
  duration: null,
  currentTime: null,
  formatedCurrentTime: null,
  percentage: null,
};

const PlayerAudioContext = createContext<MutableRefObject<
  ReactAudioPlayer | null
> | null>(null);
const PlayerStateContext = createContext<PlayerState>(initialPlayerState);
const SetPlayerStateContext = createContext<
  Dispatch<SetStateAction<PlayerState>>
>(() => {});
const PlayerTimeContext = createContext<PlayerTime>(initialPlayerTime);
const SetPlayerTimeContext = createContext<
  Dispatch<SetStateAction<PlayerTime>>
>(() => {});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playerStatus, setPlayerStatus] =
    useState<PlayerState>(initialPlayerState);
  const [playerTime, setPlayerTime] = useState<PlayerTime>(initialPlayerTime);
  const playerAudioRef = useRef<ReactAudioPlayer | null>(null);

  return (
    <PlayerAudioContext.Provider value={playerAudioRef}>
      <PlayerStateContext.Provider value={playerStatus}>
        <SetPlayerStateContext.Provider value={setPlayerStatus}>
          <PlayerTimeContext.Provider value={playerTime}>
            <SetPlayerTimeContext.Provider value={setPlayerTime}>
              {children}
              <RemotePlayHook />
            </SetPlayerTimeContext.Provider>
          </PlayerTimeContext.Provider>
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
export const usePlayerTime = () => useContext(PlayerTimeContext);
export const useSetPlayerTime = () => useContext(SetPlayerTimeContext);
