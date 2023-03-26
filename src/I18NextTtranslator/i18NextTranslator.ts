import { Translator } from '../types'
import i18n from 'i18next'

type II18NextTranslatorOptions = {
  prefix?: string
}

const iI18NextTranslator = ({ prefix = 'formValidation' }: II18NextTranslatorOptions = {}): Translator => (item) => {
  if (typeof item === 'string') {
    return item
  }
  return i18n.t(`${prefix}.${item.key}`, item.values ?? {})
}

export default iI18NextTranslator
