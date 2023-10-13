const addHeadingZero = (num: number): string => {
  return num > 9 ? num.toString() : `0${num}`;
};

type TIME_FORMAT = "auto" | "mm:ss" | "hh:mm:ss";

export const displayTimeBySeconds = (
  seconds: number,
  totalSeconds: number = seconds,
  timeFormat: TIME_FORMAT = "auto",
): string | null => {
  if (!isFinite(seconds)) {
    return null;
  }

  const min = Math.floor(seconds / 60);
  const minStr = addHeadingZero(min);
  const secStr = addHeadingZero(Math.floor(seconds % 60));
  const minStrForHour = addHeadingZero(Math.floor(min % 60));
  const hourStr = Math.floor(min / 60);

  const mmSs = `${minStr}:${secStr}`;
  const hhMmSs = `${hourStr}:${minStrForHour}:${secStr}`;

  if (timeFormat === "auto") {
    if (totalSeconds >= 3600) {
      return hhMmSs;
    } else {
      return mmSs;
    }
  } else if (timeFormat === "mm:ss") {
    return mmSs;
  } else if (timeFormat === "hh:mm:ss") {
    return hhMmSs;
  }

  return null;
};
