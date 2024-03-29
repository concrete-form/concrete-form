import i18n from 'i18next'

import { Translator } from '../types'

type I18NextTranslatorOptions = {
  prefix?: string
}

const iI18NextTranslator = ({ prefix = 'formValidation' }: I18NextTranslatorOptions = {}): Translator => (item) => {
  if (typeof item === 'string') {
    return item
  }
  return i18n.t(`${prefix}.${item.key}`, item.values ?? {})
}

export default iI18NextTranslator
