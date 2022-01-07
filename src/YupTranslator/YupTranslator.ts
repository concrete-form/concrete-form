import * as Yup from 'yup'
import TranslationKeys from '../translation/TranslationKeys.enum'

type YupParams = Record<string, any>
type Field = [string, any]
type Test = { name: string, OPTIONS: { message: string | {}, name: string, params?: {} }, _values?: string[] }

/**
 * generic concrete form translations to use to replace Yup's specific one
 */
const genericTranslations = {
  mixed: {
    default: () => ({ key: TranslationKeys.DEFAULT }),
    required: () => ({ key: TranslationKeys.REQUIRED }),
    oneOf: ({ values }: YupParams) => ({ key: TranslationKeys.ONE_OF, values: { values } }),
    notOneOf: ({ values }: YupParams) => ({ key: TranslationKeys.NOT_ONE_OF, values: { values } }),
  },
  string: {
    length: ({ length }: YupParams) => ({ key: TranslationKeys.LENGTH, values: { length } }),
    min: ({ min }: YupParams) => ({ key: TranslationKeys.MINLENGTH, values: { min } }),
    max: ({ max, less }: YupParams) => ({ key: TranslationKeys.MAXLENGTH, values: { max } }),
    email: () => ({ key: TranslationKeys.EMAIL }),
    url: () => ({ key: TranslationKeys.URL }),
  },
  number: {
    min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN, values: { min } }),
    max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX, values: { max } }),
    lessThan: ({ less }: YupParams) => ({ key: TranslationKeys.LESS_THAN, values: { less } }),
    moreThan: ({ more }: YupParams) => ({ key: TranslationKeys.MORE_THAN, values: { more } }),
    positive: () => ({ key: TranslationKeys.POSITIVE }),
    negative: () => ({ key: TranslationKeys.NEGATIVE }),
    integer: () => ({ key: TranslationKeys.INTEGER }),
  },
  date: {
    min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN_DATE, values: { min } }),
    max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX_DATE, values: { max } }),
  },
  array: {
    min: ({ min }: YupParams) => ({ key: TranslationKeys.MIN_ITEMS, values: { min } }),
    max: ({ max }: YupParams) => ({ key: TranslationKeys.MAX_ITEMS, values: { max } }),
  },
}

/**
 * returns the validation type
 * if validation belongs to "mixed", we override it
 */
const getValidationType = (field: any, test?: Test) => {
  const testName = String(test?.OPTIONS?.name)
  if (['required', 'oneOf', 'notOneOf'].includes(testName)) {
    return 'mixed'
  }
  // fixme : we should only read "field?.innerType?.type" when we're parsing an inner field
  return String(field?.innerType?.type ?? field?.type)
}

/**
 * returns the name of the validation rule
 * fixme: relying on message string is not optimal
 */
const getValidationName = (type: string, test?: Test) => {
  const testName = test?.OPTIONS?.name
  const testParams = test?.OPTIONS?.params ?? {} as any
  const message = String(test?.OPTIONS?.message)
  if (type === 'number') {
    if (testName === 'max') {
      if (typeof testParams.less !== 'undefined') {
        if (/negative number$/.test(message)) {
          return 'negative'
        }
        return 'lessThan'
      }
    }
    if (testName === 'min') {
      if (typeof testParams.more !== 'undefined') {
        if (/positive number$/.test(message)) {
          return 'positive'
        }
        return 'moreThan'
      }
    }
  }
  return String(testName)
}

/**
 * returns the values needed to generate custom translations
 */
const getParams = (test: Test) => {
  const params = test?.OPTIONS?.params ?? {}
  const addedValues = test?._values ?? {}
  return {
    ...params,
    ...addedValues,
  }
}

/**
 * return the list of whitelisted / blacklisted items for "oneOf" + "notOneOf"
 */
const getList = (set: Set<any>) => {
  return Array.from(set).filter(item => typeof item === 'string')
}

/**
 * Returns ALL the tests for a given field
 * for some reasons, "oneOf" and "notOneOf" tests are not parts of the "tests" array
 * also, "typeError" is outside "tests"
 * fixme : this rely on private variables and it's shady AF
 */
const getTests = (field: any) => {
  const tests = field?.tests
  const innerTests = field?.innerType?.tests ?? []
  const typeError = field?._typeError
  const whitelistError = field?._whitelistError
  const blacklistError = field?._blacklistError

  const fullList = [...tests, ...innerTests]

  fullList.push(typeError)

  if (whitelistError) {
    whitelistError._values = { values: getList(field._whitelist.list) }
    fullList.push(whitelistError)
  }
  if (blacklistError) {
    blacklistError._values = { values: getList(field._blacklist.list) }
    fullList.push(blacklistError)
  }

  return fullList
}

const replaceTypeErrorMessage = (schema: Yup.AnyObjectSchema) => {
  (schema as any)._typeError.OPTIONS.message = {
    ...genericTranslations.mixed.default(),
    meta: {
      from: 'yup',
      type: schema.type,
      validation: (schema as any)._typeError.OPTIONS.name,
    },
  }
}

/**
 * parse and replace Yup translations with generic ones
 */
const replaceDefaultLocales = (schema: Yup.AnyObjectSchema): Yup.AnyObjectSchema => {
  replaceTypeErrorMessage(schema)

  schema.fields = Object.fromEntries(Object.entries(schema.fields).map(([key, field]: Field) => {
    if (field?.type === 'object') {
      return [key, replaceDefaultLocales(field)]
    }

    getTests(field).forEach((test?: Test) => {
      const startsWithPath = (
        test?.name === 'validate' &&
        typeof test?.OPTIONS?.message === 'string' &&
         // eslint-disable-next-line no-template-curly-in-string
         test?.OPTIONS?.message.substr(0, 7) === '${path}'
      )

      const hasFunctionMessage = typeof test?.OPTIONS?.message === 'function'

      if (startsWithPath || hasFunctionMessage) {
        const type = getValidationType(field, test)
        const validation = getValidationName(type, test)
        const params = getParams(test)
        const genericTranslator: Function = (genericTranslations as any)?.[type]?.[validation] ?? genericTranslations.mixed.default
        const result = genericTranslator(params)

        test.OPTIONS.message = {
          ...result,
          meta: {
            from: 'yup',
            type,
            validation,
            ...result.meta,
          },
        }
      }
      return test
    })

    return [key, field]
  }))
  return schema
}

class Wrapper extends Yup.ObjectSchema<any> {
  constructor (objectSchema: Yup.AnyObjectSchema) {
    super(replaceDefaultLocales(objectSchema).fields)
  }
}

export default Wrapper
