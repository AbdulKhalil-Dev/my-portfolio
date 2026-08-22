// "use client";

// import { createContext, useContext, useMemo } from "react";
// import type { Locale } from "@/lib/i18n";
// import { parseMarkdown } from "@/lib/markdown";
// import { deepMerge } from "@/lib/utils";
// import type {
//   DictionaryType,
//   ContentLanguageType,
//   SharedDataType,
// } from "@/lib/loaders";

// export type ContentType = SharedDataType & ContentLanguageType;

// interface LanguageContextType {
//   language: Locale;
//   dict: DictionaryType;
//   content: ContentType;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(
//   undefined,
// );

// interface LanguageProviderProps {
//   children: React.ReactNode;
//   lang: Locale;
//   dictionary: DictionaryType;
//   contents: ContentLanguageType;
//   shared: SharedDataType;
// }



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

export function LanguageProvider({
  children,
  lang,
  dictionary,
  contents,
  shared,
}: LanguageProviderProps) {
  const value = useMemo<LanguageContextType>(() => {
    // Merge shared (language-agnostic) data with the locale-specific content
    const mergedContent = deepMerge(shared, contents) as ContentType;

    return {
      language: lang,
      dict: dictionary,
      content: mergedContent,
    };
  }, [lang, dictionary, contents, shared]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

// Re-exported so consumers that need to render markdown-flavoured strings
// from dictionary/content values don't need a separate import.
export { parseMarkdown };