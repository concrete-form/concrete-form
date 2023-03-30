import { setLocale } from 'yup'

import TranslationKeys from '../translation/TranslationKeys.enum'

type YupParams = Record<string, any>

const addMeta = (type: string, validation: string, translation: Record<string, any>) => {
  return {
    ...translation,
    meta: { from: 'yup', type, validation },
  }
}

const setupYupGenericLocale = () => {
  const getDefault = (type: string, validation: string) => () => (addMeta(type, validation, { key: TranslationKeys.DEFAULT }))

  setLocale({
    mixed: {
      default: getDefault('mixed', 'default'),
      required: () => (addMeta('mixed', 'required', { key: TranslationKeys.REQUIRED })),
      oneOf: ({ values }: YupParams) => (addMeta('mixed', 'oneOf', { key: TranslationKeys.ONE_OF, values: { values } })),
      notOneOf: ({ values }: YupParams) => (addMeta('mixed', 'notOneOf', { key: TranslationKeys.NOT_ONE_OF, values: { values } })),
      notType: getDefault('mixed', 'notType'),
      defined: getDefault('mixed', 'defined'),
    },
    string: {
      length: ({ length }: YupParams) => (addMeta('string', 'length', { key: TranslationKeys.LENGTH, values: { length } })),
      min: ({ min }: YupParams) => (addMeta('string', 'min', { key: TranslationKeys.MINLENGTH, values: { min } })),
      max: ({ max, less }: YupParams) => (addMeta('string', 'max', { key: TranslationKeys.MAXLENGTH, values: { max } })),
      email: () => (addMeta('string', 'email', { key: TranslationKeys.EMAIL })),
      url: () => (addMeta('string', 'url', { key: TranslationKeys.URL })),
      matches: getDefault('string', 'matches'),
      uuid: getDefault('string', 'uuid'),
      trim: getDefault('string', 'trim'),
      lowercase: getDefault('string', 'lowercase'),
      uppercase: getDefault('string', 'uppercase'),
    },
    number: {
      min: ({ min }: YupParams) => (addMeta('number', 'min', { key: TranslationKeys.MIN, values: { min } })),
      max: ({ max }: YupParams) => (addMeta('number', 'max', { key: TranslationKeys.MAX, values: { max } })),
      lessThan: ({ less }: YupParams) => (addMeta('number', 'lessThan', { key: TranslationKeys.LESS_THAN, values: { less } })),
      moreThan: ({ more }: YupParams) => (addMeta('number', 'moreThan', { key: TranslationKeys.MORE_THAN, values: { more } })),
      positive: () => (addMeta('number', 'positive', { key: TranslationKeys.POSITIVE })),
      negative: () => (addMeta('number', 'negative', { key: TranslationKeys.NEGATIVE })),
      integer: () => (addMeta('number', 'integer', { key: TranslationKeys.INTEGER })),
    },
    date: {
      min: ({ min }: YupParams) => (addMeta('date', 'min', { key: TranslationKeys.MIN_DATE, values: { min } })),
      max: ({ max }: YupParams) => (addMeta('date', 'max', { key: TranslationKeys.MAX_DATE, values: { max } })),
    },
    boolean: {
      isValue: getDefault('boolean', 'isValue'),
    },
    object: {
      noUnknown: getDefault('object', 'noUnknown'),
    },
    array: {
      length: ({ length }: YupParams) => (addMeta('array', 'length', { key: TranslationKeys.ITEM_LENGTH, values: { length } })),
      min: ({ min }: YupParams) => (addMeta('array', 'min', { key: TranslationKeys.MIN_ITEMS, values: { min } })),
      max: ({ max }: YupParams) => (addMeta('array', 'max', { key: TranslationKeys.MAX_ITEMS, values: { max } })),
    },
  })
}

export default setupYupGenericLocale
