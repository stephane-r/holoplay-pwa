import { Flex } from "@mantine/core";
import memoizeOne from "memoize-one";
import { memo } from "react";

import { usePlayerTime, usePlayerVideo } from "../providers/Player";
import { useSettings } from "../providers/Settings";
import type { SponsorBlockSegment } from "../types/interfaces/SponsorBlock";
import classes from "./SponsorBlockBar.module.css";

interface RangeSponsorBlockSegment extends SponsorBlockSegment {
  percent: string;
}

// A plain gap filler inserted between two segments below — not a real
// segment, so it has no UUID of its own (`segment.UUID` renders as falsy).
interface SponsorBlockGap {
  percent: string;
  UUID?: undefined;
}

export const SponsorBlockBar = memo(() => {
  const settings = useSettings();
  const playerVideo = usePlayerVideo();
  const playerTime = usePlayerTime();

  if (
    !settings.sponsorBlock ||
    !playerVideo.sponsorBlockSegments ||
    !playerTime.audioDuration
  ) {
    return null;
  }

  const segments = memoizedRangeSponsorBlockSegments(
    playerVideo.sponsorBlockSegments,
    playerTime.audioDuration as number,
  );

  return (
    <Flex className={classes.container}>
      {segments.map((segment, index) => (
        <div
          key={segment.percent}
          className={segment.UUID ? classes.segment : undefined}
          style={{
            borderRadius:
              index === 0
                ? "4px 0 0 4px"
                : index + 1 === segments.length
                  ? "0 4px 4px 0"
                  : 0,
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
  videoDuration: number,
): (RangeSponsorBlockSegment | SponsorBlockGap)[] =>
  segments
    .map((segment) => {
      const from = getPercent(
        segment.startTime,
        Number(videoDuration.toFixed(2)),
      );
      const to = getPercent(segment.endTime, Number(videoDuration.toFixed(2)));

      return {
        ...segment,
        percent: to - from + "%",
      };
    })
    .reduce((acc: (RangeSponsorBlockSegment | SponsorBlockGap)[], dec) => {
      if (acc.length === 0) {
        return [dec];
      }
      // Always a RangeSponsorBlockSegment: every iteration's spread ends
      // with `dec`, so the last entry is never the gap filler pushed below.
      const previous = acc.at(-1) as RangeSponsorBlockSegment;
      return [
        ...acc,
        {
          percent:
            getPercent(dec.startTime, videoDuration) -
            getPercent(previous.endTime, videoDuration) +
            "%",
        },
        dec,
      ];
    }, []);
const memoizedRangeSponsorBlockSegments = memoizeOne(rangeSponsorBlockSegments);
