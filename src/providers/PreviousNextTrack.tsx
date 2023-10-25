import {
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

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
  Dispatch<
    SetStateAction<{
      videosIds: VideosIds;
    }>
  >
>(() => {});

export const PreviousNextTrackProvider: FC<PropsWithChildren> = ({
  children,
}) => {
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
