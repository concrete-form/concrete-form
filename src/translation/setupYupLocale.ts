import { setLocale } from 'yup'
import TranslationKeys from './TranslationKeys.enum'

type YupParams = Record<string, any>

const setupYupLocale = () => {
  const meta = { from: 'yup' }
  const yupLocale = {
    mixed: {
      default: () => ({ key: TranslationKeys.DEFAULT, meta }),
      required: ({ key: TranslationKeys.REQUIRED, meta }),
      oneOf: ({ values }: YupParams) => ({ key: TranslationKeys.ONE_OF, values: { values }, meta }),
      notOneOf: ({ values }: YupParams) => ({ key: TranslationKeys.NOT_ONE_OF, values: { values }, meta }),
      notType: ({ key: TranslationKeys.DEFAULT, meta }),
    },
    string: {
      length: ({ length }: YupParams) => ({ key: TranslationKeys.LENGTH, values: { length }, meta }),
      min: ({ min }: YupParams) => ({ key: TranslationKeys.MINLENGTH, values: { min }, meta }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.MAXLENGTH, values: { max }, meta }),
      matches: ({ regex }: YupParams) => ({ key: TranslationKeys.DEFAULT, values: { regex }, meta }),
      email: ({ regex }: YupParams) => ({ key: TranslationKeys.EMAIL, values: { regex }, meta }),
      url: ({ regex }: YupParams) => ({ key: TranslationKeys.URL, values: { regex }, meta }),
      trim: ({ key: TranslationKeys.DEFAULT, meta }),
      lowercase: ({ key: TranslationKeys.LOWERCASE, meta }),
      uppercase: ({ key: TranslationKeys.UPPERCASE, meta }),
    },
    number: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN, values: { min }, meta }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX, values: { max }, meta }),
      lessThan: ({ less }: YupParams) => ({ key: TranslationKeys.LESS_THAN, values: { less }, meta }),
      moreThan: ({ more }: YupParams) => ({ key: TranslationKeys.MORE_THAN, values: { more }, meta }),
      positive: ({ more }: YupParams) => ({ key: TranslationKeys.POSITIVE, values: { more }, meta }),
      negative: ({ less }: YupParams) => ({ key: TranslationKeys.NEGATIVE, values: { less }, meta }),
      integer: ({ key: TranslationKeys.INTEGER, meta }),
    },
    date: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN_DATE, values: { min }, meta }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX_DATE, values: { max }, meta }),
    },
    object: {
      noUnknown: ({ key: TranslationKeys.DEFAULT, meta }),
    },
    array: {
      min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN_ITEMS, values: { min }, meta }),
      max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX_ITEMS, values: { max }, meta }),
    },
  }

  setLocale(yupLocale)
}

export default setupYupLocale()
