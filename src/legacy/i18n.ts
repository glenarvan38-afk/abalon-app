"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/legacy/locales/en";
import ru from "@/legacy/locales/ru";
import de from "@/legacy/locales/de";
import fr from "@/legacy/locales/fr";
import es from "@/legacy/locales/es";

// ВАЖНО: эти файлы уже имеют формат { translation: {...} }
// поэтому НЕ заворачиваем их ещё раз.
const resources = {
  en,
  ru,
  de,
  fr,
  es,
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
