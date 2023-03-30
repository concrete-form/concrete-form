import { Translator } from '../types'
import en from './defaultLocales/en'
import fr from './defaultLocales/fr'

const locales = { en, fr }
type Language = keyof typeof locales
const defaultLanguage = Object.keys(locales)[0]

export const translator = (language: string = defaultLanguage): Translator => {
  if (!Object.keys(locales).includes(language)) {
    language = defaultLanguage
  }
  return item => {
    if (typeof item === 'string') {
      return item
    }

    const translations = locales[language as Language]
    const translatedString: string|undefined = translations[item.key as keyof typeof translations]

    if (typeof translatedString === 'string') {
      return applyValues(translatedString, item.values)
    }

    return translatedString ?? item.key
  }
}

const applyValues = (string: string, values = {}) => {
  let translatedString = string

  Object.entries(values).forEach(([key, value]) => {
    translatedString = translatedString.replace(new RegExp(`{{ *${key} *}}`, 'g'), String(value))
  })

  translatedString = translatedString.replace(/{{.*}}/, '')

  return translatedString
}

export default translator
