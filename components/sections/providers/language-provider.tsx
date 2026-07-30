"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n";
import { parseMarkdown } from "@/lib/markdown";
import { deepMerge } from "@/lib/utils";
import type {
  DictionaryType,
  ContentLanguageType,
  SharedDataType,
} from "@/lib/loaders";

export type ContentType = SharedDataType & ContentLanguageType;

interface LanguageContextType {
  language: Locale;
  dict: DictionaryType;
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: React.ReactNode;
  lang: Locale;
  dictionary: DictionaryType;
  contents: ContentLanguageType;
  shared: SharedDataType;
}
