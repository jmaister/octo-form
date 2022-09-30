import enUsLocale from 'date-fns/locale/en-US'
import { Locale } from 'date-fns';


export const findLocaleOrDefault = (locale?:Locale) => {
    return locale ? locale : enUsLocale;
}

