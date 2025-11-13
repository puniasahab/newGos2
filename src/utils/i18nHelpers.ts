import i18n from '../i18n';

export const changeLanguageAndSave = async (languageCode: string) => {
  try {
    await i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    
    // Keep consistent LTR layout for all languages
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = languageCode;
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    
    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

export const getCurrentLanguage = () => {
  return i18n.language || 'en';
};

export const getSavedLanguage = () => {
  return localStorage.getItem('selectedLanguage') || 'en';
};

export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' }
  ];
};

export const isRTL = () => {
  // Always return false since we're keeping LTR layout for all languages
  return false;
};
