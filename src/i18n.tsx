import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import homeEnglish from "./translation/english/home.json";
import homeItalian from "./translation/italian/home.json";

import btnsEnglish from "./translation/english/btns.json";
import btnsItalian from "./translation/italian/btns.json";

import labelsEnglish from "./translation/english/labels.json";
import labelsItalian from "./translation/italian/labels.json";

import tableEnglish from "./translation/english/table.json";
import tableItalian from "./translation/italian/table.json";

//---Use different namespaces
const resources = {
  en: {
    home: homeEnglish,
    btns: btnsEnglish,
    labels: labelsEnglish,
    table: tableEnglish,
  },
  it: {
    home: homeItalian,
    btns: btnsItalian,
    labels: labelsItalian,
    table: tableItalian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "it", //default language
});

export default i18next;
