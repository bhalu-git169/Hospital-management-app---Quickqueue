import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'QuickQueue',
      tagline: 'Smart hospital token system',
      getToken: 'Get Token',
      liveDisplay: 'Live Queue Display',
      adminPanel: 'Admin Panel',
      nowServing: 'Now Serving',
      upcoming: 'Upcoming',
      generateToken: 'Generate Token',
      patientName: 'Name',
      department: 'Department',
      loginToContinue: 'Sign in to generate a token',
      adminLogin: 'Admin Login',
      adminPin: 'Admin PIN',
      nextButton: 'Next',
      resetQueue: 'Reset Queue'
    }
  },
  hi: {
    translation: {
      appName: 'क्विकक्यू',
      tagline: 'स्मार्ट अस्पताल टोकन प्रणाली',
      getToken: 'टोकन लें',
      liveDisplay: 'लाइव कतार डिस्प्ले',
      adminPanel: 'एडमिन पैनल',
      nowServing: 'अब बुलाया जा रहा है',
      upcoming: 'आगे के टोकन',
      generateToken: 'टोकन बनाएं',
      patientName: 'नाम',
      department: 'विभाग',
      loginToContinue: 'टोकन के लिए साइन इन करें',
      adminLogin: 'एडमिन लॉगिन',
      adminPin: 'एडमिन पिन',
      nextButton: 'अगला',
      resetQueue: 'कतार रीसेट करें'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
