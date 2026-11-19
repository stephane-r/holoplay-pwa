import { de, enUS, fr, ja, ru } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

const DATE_FNS_LOCALES = { en: enUS, fr, de, ja, ru };

const getDateFnsLocale = (locale: string) => {
  const language = locale.slice(0, 2).toLowerCase();
  return DATE_FNS_LOCALES[language as keyof typeof DATE_FNS_LOCALES];
};

export const displayViewCount = (viewCount: number, locale: string) =>
  new Intl.NumberFormat(locale, { notation: "compact" }).format(viewCount);

export const displayPublishedDate = (published: number, locale: string) =>
  formatDistanceToNowStrict(new Date(published * 1000), {
    addSuffix: true,
    locale: getDateFnsLocale(locale),
  });
