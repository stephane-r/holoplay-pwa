import { createContext, useContext, useMemo, useState } from "react";

type VideosIds = {
  previousVideoId: string | null;
  nextVideoId: string | null;
};

const PreviousNextVideosContext = createContext<{
  videosIds: VideosIds;
}>({
  videosIds: {
    previousVideoId: null,
    nextVideoId: null,
  },
});
const SetPreviousNextVideosContext = createContext<
  React.Dispatch<
    React.SetStateAction<{
      videosIds: VideosIds;
    }>
  >
>(() => {});

interface PreviousNextTrackProviderProps {
  children: React.ReactNode;
}

export const PreviousNextTrackProvider: React.FC<
  PreviousNextTrackProviderProps
> = ({ children }) => {
  const [videosIds, setPreviousVideoId] = useState<{
    videosIds: VideosIds;
  }>({
    videosIds: {
      previousVideoId: null,
      nextVideoId: null,
    },
  });

  const value = useMemo(
    () => ({
      videosIds,
      setPreviousVideoId,
    }),
    [videosIds],
  );

  return (
    <PreviousNextVideosContext.Provider value={value.videosIds}>
      <SetPreviousNextVideosContext.Provider value={value.setPreviousVideoId}>
        {children}
      </SetPreviousNextVideosContext.Provider>
    </PreviousNextVideosContext.Provider>
  );
};

export const usePreviousNextVideos = () =>
  useContext(PreviousNextVideosContext);
export const useSetPreviousNextVideos = () =>
  useContext(SetPreviousNextVideosContext);
