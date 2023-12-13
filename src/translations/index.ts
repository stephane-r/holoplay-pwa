import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";
import ja from "./ja.json";
import ru from "./ru.json";

export type Languages = "en-EN" | "fr-FR" | "ja-JP" | "ru-RU" | "de-DE";

export const languagesValues = [
  {
    value: "en-EN",
    label: "English",
  },
  {
    value: "fr-FR",
    label: "French",
  },
  {
    value: "ja-JP",
    label: "Japanese",
  },
  {
    value: "ru-RU",
    label: "Russian",
  },
  {
    value: "de-DE",
    label: "German",
  },
];

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ja: {
    translation: ja,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
