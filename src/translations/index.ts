import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import ja from "./ja.json";

export type Languages = "en-EN" | "fr-FR" | "ja-JP";

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
];

export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ja: {
    translation: ja,
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
