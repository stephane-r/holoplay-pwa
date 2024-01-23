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
import type { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";
import type { Video } from "../types/interfaces/Video";
import type { ColorInfo } from "../utils/colorExtractor";

interface PlayerVideo {
  video: Video | null;
  sponsorBlockSegments: SponsorBlockSegment[] | null;
  thumbnailUrl: string | null;
  primaryColor: ColorInfo | null;
}

const initialPlayerVideoState = {
  video: null,
  sponsorBlockSegments: null,
  thumbnailUrl: null,
  primaryColor: null,
};

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
const PlayerUrlContext = createContext<string | null>(null);
const SetPlayerUrlContext = createContext<
  Dispatch<SetStateAction<string | null>>
>(() => {});
const PlayerVideoContext = createContext<PlayerVideo>(initialPlayerVideoState);
const SetPlayerVideoContext = createContext<
  Dispatch<SetStateAction<PlayerVideo>>
>(() => {});
const PlayerStateContext = createContext<PlayerState>(initialPlayerState);
const SetPlayerStateContext = createContext<
  Dispatch<SetStateAction<PlayerState>>
>(() => {});

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [video, setVideo] = useState<PlayerVideo>(initialPlayerVideoState);
  const [url, setUrl] = useState<string | null>(null);
  const [playerStatus, setPlayerStatus] =
    useState<PlayerState>(initialPlayerState);
  const playerAudioRef = useRef(null);

  const videoState = useMemo(
    () => ({
      video,
      setVideo,
    }),
    [video],
  );

  const urlState = useMemo(
    () => ({
      url,
      setUrl,
    }),
    [url],
  );

  const playerState = useMemo(
    () => ({
      playerStatus,
      setPlayerStatus,
    }),
    [playerStatus],
  );

  return (
    <PlayerAudioContext.Provider value={playerAudioRef}>
      <PlayerUrlContext.Provider value={urlState.url}>
        <SetPlayerUrlContext.Provider value={urlState.setUrl}>
          <PlayerVideoContext.Provider value={videoState.video}>
            <SetPlayerVideoContext.Provider value={videoState.setVideo}>
              <PlayerStateContext.Provider value={playerState.playerStatus}>
                <SetPlayerStateContext.Provider
                  value={playerState.setPlayerStatus}
                >
                  {children}
                  <RemotePlayHook />
                </SetPlayerStateContext.Provider>
              </PlayerStateContext.Provider>
            </SetPlayerVideoContext.Provider>
          </PlayerVideoContext.Provider>
        </SetPlayerUrlContext.Provider>
      </PlayerUrlContext.Provider>
    </PlayerAudioContext.Provider>
  );
};

const RemotePlayHook = () => {
  useRemotePlay();
  return null;
};

export const usePlayerUrl = () => useContext(PlayerUrlContext);
export const useSetPlayerUrl = () => useContext(SetPlayerUrlContext);
export const usePlayerVideo = () => useContext(PlayerVideoContext);
export const useSetPlayerVideo = () => useContext(SetPlayerVideoContext);
export const usePlayerAudio = () => useContext(PlayerAudioContext);
export const usePlayerState = () => useContext(PlayerStateContext);
export const useSetPlayerState = () => useContext(SetPlayerStateContext);
