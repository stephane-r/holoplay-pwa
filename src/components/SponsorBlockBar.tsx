import { Flex } from "@mantine/core";
import { memo } from "react";
import { usePlayerState, usePlayerVideo } from "../providers/Player";
import { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";
import { useSettings } from "../providers/Settings";

interface RangeSponsorBlockSegment extends SponsorBlockSegment {
  percent: string;
}

export const SponsorBlockBar = memo(() => {
  const settings = useSettings();
  const playerVideo = usePlayerVideo();
  const playerState = usePlayerState();

  if (
    !settings.sponsorBlock ||
    !playerVideo.sponsorBlockSegments ||
    !playerState.audioDuration
  ) {
    return null;
  }

  const segments = rangeSponsorBlockSegments(
    playerVideo.sponsorBlockSegments,
    playerState.audioDuration as number
  );

  return (
    <Flex
      align="center"
      pos="absolute"
      top={2}
      left={0}
      w="100%"
      style={{ zIndex: 2, pointerEvents: "none", borderRadius: 4 }}
    >
      {segments.map((segment, index) => (
        <div
          key={segment.percent}
          style={{
            borderRadius:
              index === 0
                ? "4px 0 0 4px"
                : index + 1 === segments.length
                ? "0 4px 4px 0"
                : 0,
            background: segment.UUID
              ? "rgba(255, 255, 255, 0.8)"
              : "transparent",
            height: 4,
            width: segment.percent,
          }}
        />
      ))}
    </Flex>
  );
});

const getPercent = (from: number, to: number) => Math.round((100 * from) / to);

const rangeSponsorBlockSegments = (
  segments: SponsorBlockSegment[],
  videoDuration: number
): RangeSponsorBlockSegment[] =>
  segments
    .map((segment) => {
      const from = getPercent(
        segment.startTime,
        Number(videoDuration.toFixed(2))
      );
      const to = getPercent(segment.endTime, Number(videoDuration.toFixed(2)));

      return {
        ...segment,
        percent: to - from + "%",
      };
    })
    .reduce((acc: any[], dec) => {
      if (acc.length === 0) {
        return [dec];
      }
      return [
        ...acc,
        {
          percent:
            getPercent(dec.startTime, videoDuration) -
            getPercent(acc.at(-1).endTime, videoDuration) +
            "%",
        },
        dec,
      ];
    }, []);
