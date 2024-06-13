import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";

// 引入翻译文件
import translationEN from "./locales/en/translation.json";
import translationZH from "./locales/zh/translation.json";

// 资源文件
const resources = {
  en: {
    translation: translationEN,
  },
  zh: {
    translation: translationZH,
  },
};

// 初始化 i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en-gb",
    detection: {
      order: [
        "localStorage",
        // "customLanguageDetector",
        // "querystring",
        // "cookie",
        // "sessionStorage",
        // "navigator",
        // "htmlTag",
        // "path",
        // "subdomain",
      ],
      caches: ["localStorage"],
      lookupLocalStorage: "defaultLanguage",
    },
    interpolation: {
      escapeValue: false,
    },
  });

// 处理语言代码映射
// const momentLocaleMap = {
//   en: "en-gb",
//   zh: "zh-cn",
// };

// 设置语言改变时的处理
i18n.on("languageChanged", (lng) => {
  // moment.locale(momentLocaleMap[lng] || lng);
  moment.locale(lng);
});

export default i18n;
