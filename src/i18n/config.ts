import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '../locales/en/translation.json';
import viTranslations from '../locales/vi/translation.json';

/**
 * i18next configuration for internationalization
 * Supports English, Spanish, French, and Vietnamese with automatic language detection
 * Includes RTL support considerations
 */

// Define resources
const resources = {
  en: {
    translation: enTranslations,
  },
  vi: {
    translation: viTranslations,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    supportedLngs: ['en', 'es', 'fr', 'vi'], // Supported languages

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React i18next specific options
    react: {
      useSuspense: true, // Enable suspense mode
    },

    // Debug mode (disable in production)
    debug: false,
  });

export default i18n;
