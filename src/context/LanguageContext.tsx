"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

type Language = "en" | "tr";
type Dictionary = typeof en;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dictionary: Dictionary;
}

const dictionaries: Record<Language, Dictionary> = {
  en,
  tr,
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "tr")) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.startsWith("tr") ? "tr" : "en";
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  // Helper to safely access nested object keys
  const t = (keyString: string): string => {
    const keys = keyString.split(".");
    let current: unknown = dictionaries[language];

    for (const key of keys) {
      if (typeof current !== "object" || current === null || !(key in current)) {
        console.warn(`Translation key not found: ${keyString}`);
        return keyString;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return typeof current === "string" ? current : keyString;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dictionary: dictionaries[language] }}>
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
