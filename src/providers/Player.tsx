import { createContext, useContext, useMemo, useRef, useState } from "react";
import { Video } from "../types/interfaces/Video";
import { ColorInfo } from "../utils/colorExtractor";

interface PlayerVideo {
  video: Video | null;
  thumbnailUrl: string | null;
  primaryColor: ColorInfo | null;
}

const initialPlayerVideoState = {
  video: null,
  thumbnailUrl: null,
  primaryColor: null,
};

interface PlayerState {
  paused: boolean;
  muted: boolean;
  repeat: boolean;
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
  duration: null,
  currentTime: null,
  formatedCurrentTime: null,
  percentage: null,
  volume: 1,
  loading: true,
};

const PlayerAudioContext = createContext<React.MutableRefObject<null> | null>(
  null
);
const PlayerUrlContext = createContext<string | null>(null);
const SetPlayerUrlContext = createContext<
  React.Dispatch<React.SetStateAction<string | null>>
>(() => {});
const PlayerVideoContext = createContext<PlayerVideo>(initialPlayerVideoState);
const SetPlayerVideoContext = createContext<
  React.Dispatch<React.SetStateAction<PlayerVideo>>
>(() => {});
const PlayerStateContext = createContext<PlayerState>(initialPlayerState);
const SetPlayerStateContext = createContext<
  React.Dispatch<React.SetStateAction<PlayerState>>
>(() => {});

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
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
    [video]
  );

  const urlState = useMemo(
    () => ({
      url,
      setUrl,
    }),
    [url]
  );

  const playerState = useMemo(
    () => ({
      playerStatus,
      setPlayerStatus,
    }),
    [playerStatus]
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
                </SetPlayerStateContext.Provider>
              </PlayerStateContext.Provider>
            </SetPlayerVideoContext.Provider>
          </PlayerVideoContext.Provider>
        </SetPlayerUrlContext.Provider>
      </PlayerUrlContext.Provider>
    </PlayerAudioContext.Provider>
  );
};

export const usePlayerUrl = () => useContext(PlayerUrlContext);
export const useSetPlayerUrl = () => useContext(SetPlayerUrlContext);
export const usePlayerVideo = () => useContext(PlayerVideoContext);
export const useSetPlayerVideo = () => useContext(SetPlayerVideoContext);
export const usePlayerAudio = () => useContext(PlayerAudioContext);
export const usePlayerState = () => useContext(PlayerStateContext);
export const useSetPlayerState = () => useContext(SetPlayerStateContext);
