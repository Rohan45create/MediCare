import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all namespaces for all languages
import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enReport from './locales/en/report.json';
import enScanner from './locales/en/scanner.json';
import enHelp from './locales/en/help.json';
import enScanResult from './locales/en/scanResult.json';
import enProfile from './locales/en/profile.json';
import enSettings from './locales/en/settings.json';
import enLanding from './locales/en/landing.json';

import hiCommon from './locales/hi/common.json';
import hiDashboard from './locales/hi/dashboard.json';
import hiReport from './locales/hi/report.json';
import hiScanner from './locales/hi/scanner.json';
import hiHelp from './locales/hi/help.json';
import hiScanResult from './locales/hi/scanResult.json';
import hiProfile from './locales/hi/profile.json';
import hiSettings from './locales/hi/settings.json';  
import hiLanding from './locales/hi/landing.json';

import mrCommon from './locales/mr/common.json';
import mrDashboard from './locales/mr/dashboard.json';
import mrReport from './locales/mr/report.json';
import mrScanner from './locales/mr/scanner.json';
import mrHelp from './locales/mr/help.json';
import mrScanResult from './locales/mr/scanResult.json';
import mrProfile from './locales/mr/profile.json';  
import mrSettings from './locales/mr/settings.json';
import mrLanding from './locales/mr/landing.json'

import taCommon from './locales/ta/common.json';
import taDashboard from './locales/ta/dashboard.json';
import taReport from './locales/ta/report.json';
import taScanner from './locales/ta/scanner.json';
import taHelp from './locales/ta/help.json';
import taScanResult from './locales/ta/scanResult.json';
import taProfile from './locales/ta/profile.json';
import taSettings from './locales/ta/settings.json'
import taLanding from './locales/ta/landing.json'

import teCommon from './locales/te/common.json';
import teDashboard from './locales/te/dashboard.json';
import teReport from './locales/te/report.json';
import teScanner from './locales/te/scanner.json';
import teHelp from './locales/te/help.json';
import teScanResult from './locales/te/scanResult.json';
import teProfile from './locales/te/profile.json';
import teSettings from './locales/te/settings.json'
import teLanding from './locales/te/landing.json'

import bnCommon from './locales/bn/common.json';
import bnDashboard from './locales/bn/dashboard.json';
import bnReport from './locales/bn/report.json';
import bnScanner from './locales/bn/scanner.json';
import bnHelp from './locales/bn/help.json';
import bnScanResult from './locales/bn/scanResult.json';
import bnProfile from './locales/bn/profile.json';
import bnSettings from './locales/bn/settings.json'
import bnLanding from './locales/bn/landing.json'

import guCommon from './locales/gu/common.json';
import guDashboard from './locales/gu/dashboard.json';
import guReport from './locales/gu/report.json';
import guScanner from './locales/gu/scanner.json';
import guHelp from './locales/gu/help.json';
import guScanResult from './locales/gu/scanResult.json';
import guProfile from './locales/gu/profile.json';
import guSettings from './locales/gu/settings.json'
import guLanding from './locales/gu/landing.json'

const SUPPORTED_LANGUAGES = ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'gu'];

// Detect language: localStorage -> browser -> fallback English
const detectLanguage = () => {
  const saved = localStorage.getItem('medicare_language');
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
  
  const browser = navigator.language?.split('-')[0];
  if (browser && SUPPORTED_LANGUAGES.includes(browser)) return browser;
  
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, dashboard: enDashboard, report: enReport, scanner: enScanner, help: enHelp, scanResult: enScanResult, profile: enProfile, settings: enSettings, landing: enLanding},
      hi: { common: hiCommon, dashboard: hiDashboard, report: hiReport, scanner: hiScanner, help: hiHelp, scanResult: hiScanResult, profile: hiProfile, settings: hiSettings, landing: hiLanding},
      mr: { common: mrCommon, dashboard: mrDashboard, report: mrReport, scanner: mrScanner, help: mrHelp, scanResult: mrScanResult, profile: mrProfile, settings: mrSettings, landing: mrLanding},
      ta: { common: taCommon, dashboard: taDashboard, report: taReport, scanner: taScanner, help: taHelp, scanResult: taScanResult, profile: taProfile, settings: taSettings, landing: taLanding},
      te: { common: teCommon, dashboard: teDashboard, report: teReport, scanner: teScanner, help: teHelp, scanResult: teScanResult, profile: teProfile, settings: teSettings, landing: teLanding},
      bn: { common: bnCommon, dashboard: bnDashboard, report: bnReport, scanner: bnScanner, help: bnHelp, scanResult: bnScanResult, profile: bnProfile, settings: bnSettings, landing: bnLanding},
      gu: { common: guCommon, dashboard: guDashboard, report: guReport, scanner: guScanner, help: guHelp, scanResult: guScanResult, profile: guProfile, settings: guSettings, landing: guLanding},
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'dashboard', 'report', 'scanner', 'help', 'scanResult', 'profile', 'settings', 'landing'],
    interpolation: {
      escapeValue: false  // React already escapes
    }
  });

export default i18n;
export { SUPPORTED_LANGUAGES };
