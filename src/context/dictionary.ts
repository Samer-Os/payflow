import en from "../locales/en.json";
import tr from "../locales/tr.json";

export type Language = "en" | "tr";
export type Dictionary = typeof en;

const dictionaries: Record<Language, Dictionary> = { en, tr };

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}

export { dictionaries };
