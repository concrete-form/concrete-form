import { Translator } from '../types'
import en from '../locales/en'
import fr from '../locales/fr'

type Language = keyof typeof locales

const locales = { en, fr }
const defaultLanguage = Object.keys(locales)[0] as Language

export const translator = (language: string = defaultLanguage): Translator => {
  if (!Object.keys(locales).includes(language)) {
    language = defaultLanguage
  }
  return item => {
    if (typeof item === 'string') {
      return item
    }

    const translations = locales[language as Language] as unknown as Record<string, string>
    const translatedString: string|undefined = translations[item.key]

    if (typeof translatedString === 'string') {
      return applyValues(translatedString, item.values)
    }

    return translatedString ?? item.key
  }
}

const applyValues = (string: string, values: Record<string, string> = {}) => {
  let translatedString = string

  Object.entries(values).forEach(([key, value]) => {
    translatedString = translatedString.replace(new RegExp(`{{ *${key} *}}`, 'g'), value)
  })

  translatedString = translatedString.replace(/{{.*}}/, '')

  return translatedString
}

export default translator
