export const fallbackLng = "en";
export const languageLists = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
];
export const languages = languageLists.flatMap((language) => language.code);
export const cookieName = "navigation-hub-current-language";
export const headerName = "x-navigation-hub-current-language";
