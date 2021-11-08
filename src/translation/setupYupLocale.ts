import { setLocale } from 'yup'
import TranslationKeys from './TranslationKeys.enum'

type YupParams = Record<string, any>

const setupYupLocale = () => {
  const yupLocale = {
    mixed: {
      default: () => ({ key: TranslationKeys.DEFAULT }),
      required: ({ key: TranslationKeys.REQUIRED }),
      oneOf: ({ values }: YupParams) => ({ key: TranslationKeys.ONE_OF, values: { values } }),
      notOneOf: ({ values }: YupParams) => ({ key: TranslationKeys.NOT_ONE_OF, values: { values } }),
      notType: ({ key: TranslationKeys.DEFAULT }),
    },
    string: {
      length: ({ length }: YupParams) => ({ key: TranslationKeys.STRING_LENGTH, values: { length } }),
      min: ({ min }: YupParams) => ({ key: TranslationKeys.STRING_MIN, values: { min } }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.STRING_MAX, values: { max } }),
      matches: ({ regex }: YupParams) => ({ key: TranslationKeys.DEFAULT, values: { regex } }),
      email: ({ regex }: YupParams) => ({ key: TranslationKeys.STRING_EMAIL, values: { regex } }),
      url: ({ regex }: YupParams) => ({ key: TranslationKeys.STRING_URL, values: { regex } }),
      trim: ({ key: TranslationKeys.DEFAULT }),
      lowercase: ({ key: TranslationKeys.STRING_LOWERCASE }),
      uppercase: ({ key: TranslationKeys.STRING_UPPERCASE }),
    },
    number: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.NUMBER_MIN, values: { min } }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.NUMBER_MAX, values: { max } }),
      lessThan: ({ less }: YupParams) => ({ key: TranslationKeys.NUMBER_LESS_THAN, values: { less } }),
      moreThan: ({ more }: YupParams) => ({ key: TranslationKeys.NUMBER_MORE_THAN, values: { more } }),
      positive: ({ more }: YupParams) => ({ key: TranslationKeys.NUMBER_POSITIVE, values: { more } }),
      negative: ({ less }: YupParams) => ({ key: TranslationKeys.NUMBER_NEGATIVE, values: { less } }),
      integer: ({ key: TranslationKeys.NUMBER_INTEGER }),
    },
    date: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.DATE_MIN, values: { min } }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.DATE_MAX, values: { max } }),
    },
    object: {
      noUnknown: ({ key: TranslationKeys.DEFAULT }),
    },
    array: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.ARRAY_MIN, values: { min } }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.ARRAY_MAX, values: { max } }),
    },
  }

  setLocale(yupLocale)
}

export default setupYupLocale()
