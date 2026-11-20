import type { Chapter } from "../types/interfaces/Chapter";

// YouTube chapters have no structured API field (Invidious doesn't expose
// any either — see github.com/iv-org/invidious/pull/4111, still unmerged).
// Creators encode them as timestamped lines in the description instead
// (the convention YouTube itself parses to render native chapters), so we
// do the same: one line per chapter, a leading `h:mm:ss`/`m:ss` timestamp
// followed by a title.
// The leading minutes segment gets up to 3 digits: a long video's later
// chapters are commonly written as plain `mm:ss` past the 60-minute mark
// (e.g. "101:01") rather than switching to `h:mm:ss`.
const CHAPTER_LINE = /^\s*(?:[-•*▶]\s*)?\(?(\d{1,3}(?::\d{2}){1,2})\)?\s*[-:–]?\s*(.+?)\s*$/;

const parseTimestamp = (value: string): number =>
  value.split(":").reduce((seconds, part) => seconds * 60 + Number(part), 0);

// YouTube itself requires at least 3 chapters starting at 0:00 to treat a
// description as having "real" chapters; we're more lenient (>= 2, no 0:00
// requirement) since this only gates whether we show anything, not whether
// we write to the description.
const MIN_CHAPTERS = 2;

// Some instances leave the plain-text `description` empty while still
// populating `descriptionHtml` (chapter timestamps there are wrapped in
// `<a data-jump-time=...>mm:ss</a>` links) — DOMParser both strips the tags
// and decodes entities (`&#39;`, `&amp;`, ...) in one pass, which a hand-
// rolled regex wouldn't handle correctly, while leaving the `\n` separators
// already embedded in the text nodes untouched.
const stripHtml = (html: string): string =>
  new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";

export const parseChapters = (
  description: string | undefined | null,
  descriptionHtml: string | undefined | null,
  durationSeconds: number,
): Chapter[] => {
  const source = description || (descriptionHtml && stripHtml(descriptionHtml));
  if (!source || !durationSeconds) return [];

  const matches = source
    .split("\n")
    .map((line) => line.match(CHAPTER_LINE))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => ({
      startTime: parseTimestamp(match[1]),
      title: match[2].trim(),
    }))
    .filter(({ startTime, title }) => title && startTime < durationSeconds)
    .sort((a, b) => a.startTime - b.startTime)
    .filter(
      (chapter, index, all) =>
        index === 0 || chapter.startTime !== all[index - 1].startTime,
    );

  if (matches.length < MIN_CHAPTERS) return [];

  return matches.map((chapter, index) => ({
    ...chapter,
    endTime: matches[index + 1]?.startTime ?? durationSeconds,
  }));
};
