type SponsorBlockCategory =
  | "sponsor"
  | "intro"
  | "outro"
  | "interaction"
  | "selfpromo"
  | "music_offtopic"
  | "preview"
  | "filler";

export interface SponsorBlockSegment {
  UUID: string;
  startTime: number;
  endTime: number;
  category: SponsorBlockCategory;
  videoDuration: number;
}
