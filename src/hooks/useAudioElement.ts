import { usePlayerAudio } from "../providers/Player";

// The single place that knows `playerAudio.current` (a react-audio-player
// instance) holds the real `<audio>` element at `.audioEl.current`. Every
// call site used to re-derive this with its own `// @ts-ignore` cast
// (PlayerAudioContext was typed as always-null) — one typo or ref-shape
// change would have silently broken all of them.
export const useAudioElement = (): HTMLAudioElement | null => {
  const playerAudio = usePlayerAudio();
  return playerAudio?.current?.audioEl.current ?? null;
};

// The exact same "if paused, play; else pause" toggle was duplicated
// verbatim in 3 different components.
export const useToggleAudioPlayPause = () => {
  const audioElement = useAudioElement();

  return () => {
    if (!audioElement) return;
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };
};
