import * as i18n from "i18next";
import type { Callback, InitOptions } from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { setLocale } from 'yup';
import translationENG from "../locales/en.json";
import translationVI from "../locales/vi.json";

export const supportedLngs = {
  vi: "Tiếng việt",
  en: "English",
};

const resources = {
  vi: {
    translation: translationVI,
  },
  en: {
    translation: translationENG,
  },
};

class I18nTranslation {
  public async initialize(
    initOptions?: InitOptions,
    callback?: Callback
  ): Promise<void> {
    setLocale({
      mixed: {
        required: "validate.mixed.required",
        notType: "validate.mixed.required",
        default: "validate.mixed.required",
      },
      string: {
        max: (value: any) => {
          return { key: "validate.string.max", value: value.max };
        },
      },
    });
    await i18n
      .use(detector)
      .use(initReactI18next) // passes i18n down to react-i18next
      .init(
        initOptions ?? {
          resources,
          lng: localStorage.getItem("I18N_LANGUAGE") || "vi",
          supportedLngs: Object.keys(supportedLngs),
          fallbackLng: "vi",
          keySeparator: false,
          interpolation: {
            escapeValue: false,
          },
        },
        callback
      );
  }
}

const i18nTranslation = new I18nTranslation();

export default i18nTranslation;
export function translate(keyTranslate: string): string {
  return keyTranslate;
}
