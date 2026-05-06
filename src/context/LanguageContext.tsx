"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export type Language = "en" | "tr";
type Dictionary = typeof en;
type Params = Record<string, string | number>;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Params) => string;
  dictionary: Dictionary;
}

const dictionaries: Record<Language, Dictionary> = { en, tr };

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}

function resolveInitialLang(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language") as Language;
  if (saved === "en" || saved === "tr") return saved;
  return navigator.language.startsWith("tr") ? "tr" : "en";
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(resolveInitialLang);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.cookie = `lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  const t = useCallback((keyString: string, params?: Params): string => {
    const keys = keyString.split(".");
    let current: unknown = dictionaries[language];

    for (const key of keys) {
      if (typeof current !== "object" || current === null || !(key in current)) {
        return keyString;
      }
      current = (current as Record<string, unknown>)[key];
    }

    if (typeof current !== "string") return keyString;
    if (!params) return current;

    return current.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      k in params ? String(params[k]) : `{{${k}}}`
    );
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t, dictionary: dictionaries[language] }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
