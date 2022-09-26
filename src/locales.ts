import esLocale from 'date-fns/locale/es'
import enGbLocale from 'date-fns/locale/en-GB'
import enUsLocale from 'date-fns/locale/en-US'

export type AllowedLocales = 'es' | 'en-GB' | 'en-US';

type LocaleMap = { [key in AllowedLocales]: Locale };
const locales:LocaleMap = {
    "es": esLocale,
    "en-GB": enGbLocale,
    "en-US": enUsLocale,
};

export const findLocaleOrDefault = (locale?:string) => {
    const found = locales[locale as AllowedLocales];
    return found ? found : locales["es"];
}

