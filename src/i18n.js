import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import ruJSON from "./locale/ru.json";
import azJSON from "./locale/az.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      ru: { translation: ruJSON },
      az: { translation: azJSON },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
