import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationHomeEnglish from "./Translation/English/translationHome.json";
import translationHomeItalian from "./Translation/Italian/translationHome.json";

import translationBtnsEnglish from "./Translation/English/translationBtns.json";
import translationBtnsItalian from "./Translation/Italian/translationBtns.json";

import translationLabelsEnglish from "./Translation/English/translationLabels.json";
import translationLabelsItalian from "./Translation/Italian/translationLabels.json";

import translationTableEnglish from "./Translation/English/translationTable.json";
import translationTableItalian from "./Translation/Italian/translationTable.json";

//---Use different namespaces
const resources = {
  en: {
    home: translationHomeEnglish,
    btns: translationBtnsEnglish,
    labels: translationLabelsEnglish,
    table: translationTableEnglish,
  },
  it: {
    home: translationHomeItalian,
    btns: translationBtnsItalian,
    labels: translationLabelsItalian,
    table: translationTableItalian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "it", //default language
});

export default i18next;
