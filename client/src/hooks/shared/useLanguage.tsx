import { createContext, useContext } from "react";

export type LanguageContextType = {
  languageCodeFrom: string;
  languageCodeTo: string;
};

const defaultValues: LanguageContextType = {
  languageCodeFrom: "fi-FI",
  languageCodeTo: "en-US",
};

const LanguageContext = createContext<LanguageContextType>(defaultValues);

export const LanguageProvider = ({
  children,
  languageCodeFrom,
  languageCodeTo,
}: React.PropsWithChildren<{
  languageCodeFrom: string;
  languageCodeTo: string;
}>) => {
  return (
    <LanguageContext.Provider
      value={{
        languageCodeFrom: languageCodeFrom,
        languageCodeTo: languageCodeTo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default function useLanguage() {
  return useContext(LanguageContext);
}
