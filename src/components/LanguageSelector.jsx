import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n/index.js';

const LANGUAGE_LABELS = {
  en: 'English',
  hi: 'Hindi (हिंदी)',
  mr: 'Marathi (मराठी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  bn: 'Bengali (বাংলা)',
  gu: 'Gujarati (ગુજરાતી)'
};

export default function LanguageSelector() {
  const { i18n, t } = useTranslation('common');

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('medicare_language', lang);
    // Update html lang attribute for accessibility
    document.documentElement.lang = lang;
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      aria-label={t('language.select')}
      className="bg-slate-50 dark:bg-slate-800 border border-slate-200
                 dark:border-slate-700 text-slate-900 dark:text-white
                 rounded-lg px-3 py-1.5 outline-none
                 focus:ring-2 focus:ring-emerald-500 text-sm cursor-pointer"
    >
      {SUPPORTED_LANGUAGES.map(lang => (
        <option key={lang} value={lang}>
          {LANGUAGE_LABELS[lang]}
        </option>
      ))}
    </select>
  );
}
