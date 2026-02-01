import { useTranslation } from 'react-i18next';

/**
 * Custom hook for language management
 * Wraps i18next functionality with additional utilities
 *
 * @returns {object} Object containing translation function, current language, and change function
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  ];

  return {
    t,
    currentLanguage,
    changeLanguage,
    supportedLanguages,
  };
};
