import { defineRouting } from "next-intl/routing";
import { cookieName, fallbackLng, languages } from "./settings";

export const routing = defineRouting({
  locales: languages,
  localeDetection: true,
  localePrefix: {
    mode: "never",
  },
  localeCookie: {
    name: cookieName,
  },
  alternateLinks: true,
  // Used when no locale matches
  defaultLocale: fallbackLng,
});
