import * as Yup from 'yup'

import setupYupGenericLocale from './setupYupGenericLocale'
import TranslationKeys from '../translation/TranslationKeys.enum'

const getErrors = async (schema: Yup.ObjectSchema<any>, values: any) => {
  let errors: any[] = []
  try {
    await schema.validate(values, { abortEarly: false })
  } catch (error) {
    errors = (error as Yup.ValidationError).errors
  }
  return errors
}

setupYupGenericLocale()

describe('setYupGenericLocale', () => {
  it('set mixed validations', async () => {
    const schema = Yup.object().shape({
      required: Yup.string().required(),
      oneOff: Yup.string().oneOf(['foo', 'bar']),
      notOneOf: Yup.string().notOneOf(['a', 'b', 'c']),
    })
    const invalid = {
      required: '',
      oneOff: 'baz',
      notOneOf: 'b',
    }

    const received = await getErrors(schema, invalid)

    /* note: yup's "one of" returns an array with version 0.x and a string in v1+ */

    const expected = [
      { key: TranslationKeys.REQUIRED, meta: { from: 'yup', type: 'mixed', validation: 'required' } },
      { key: TranslationKeys.ONE_OF, values: { values: expect.anything() }, meta: { from: 'yup', type: 'mixed', validation: 'oneOf' } },
      { key: TranslationKeys.NOT_ONE_OF, values: { values: expect.anything() }, meta: { from: 'yup', type: 'mixed', validation: 'notOneOf' } },
    ]

    expect(received).toEqual(expected)
  })

  it('set string validations', async () => {
    const schema = Yup.object().shape({
      length: Yup.string().length(1),
      min: Yup.string().min(2),
      max: Yup.string().max(1),
      email: Yup.string().email(),
      url: Yup.string().url(),
    })
    const invalid = {
      length: 'fo',
      min: 'f',
      max: 'foo',
      email: 'foo',
      url: 'foo',
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.LENGTH, values: { length: 1 }, meta: { from: 'yup', type: 'string', validation: 'length' } },
      { key: TranslationKeys.MINLENGTH, values: { min: 2 }, meta: { from: 'yup', type: 'string', validation: 'min' } },
      { key: TranslationKeys.MAXLENGTH, values: { max: 1 }, meta: { from: 'yup', type: 'string', validation: 'max' } },
      { key: TranslationKeys.EMAIL, meta: { from: 'yup', type: 'string', validation: 'email' } },
      { key: TranslationKeys.URL, meta: { from: 'yup', type: 'string', validation: 'url' } },
    ]

    expect(received).toEqual(expected)
  })

  it('replaces number validations', async () => {
    const schema = Yup.object().shape({
      min: Yup.number().min(1),
      max: Yup.number().max(2),
      lessThan: Yup.number().lessThan(3),
      moreThan: Yup.number().moreThan(4),
      positive: Yup.number().positive(),
      negative: Yup.number().negative(),
      integer: Yup.number().integer(),
    })
    const invalid = {
      min: 0,
      max: 3,
      lessThan: 3,
      moreThan: 4,
      positive: -1,
      negative: 1,
      integer: 1.2,
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.MIN, values: { min: 1 }, meta: { from: 'yup', type: 'number', validation: 'min' } },
      { key: TranslationKeys.MAX, values: { max: 2 }, meta: { from: 'yup', type: 'number', validation: 'max' } },
      { key: TranslationKeys.LESS_THAN, values: { less: 3 }, meta: { from: 'yup', type: 'number', validation: 'lessThan' } },
      { key: TranslationKeys.MORE_THAN, values: { more: 4 }, meta: { from: 'yup', type: 'number', validation: 'moreThan' } },
      { key: TranslationKeys.POSITIVE, meta: { from: 'yup', type: 'number', validation: 'positive' } },
      { key: TranslationKeys.NEGATIVE, meta: { from: 'yup', type: 'number', validation: 'negative' } },
      { key: TranslationKeys.INTEGER, meta: { from: 'yup', type: 'number', validation: 'integer' } },
    ]

    expect(received).toEqual(expected)
  })

  it('replaces date validations', async () => {
    const schema = Yup.object().shape({
      min: Yup.date().min('2021-01-01'),
      max: Yup.date().max('2021-02-02'),
    })
    const invalid = {
      min: '2020-03-03',
      max: '2022-04-04',
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.MIN_DATE, values: { min: '2021-01-01' }, meta: { from: 'yup', type: 'date', validation: 'min' } },
      { key: TranslationKeys.MAX_DATE, values: { max: '2021-02-02' }, meta: { from: 'yup', type: 'date', validation: 'max' } },
    ]

    expect(received).toEqual(expected)
  })

  it('replaces array validations', async () => {
    const schema = Yup.object().shape({
      length: Yup.array().length(4),
      min: Yup.array().min(2),
      max: Yup.array().max(3),
    })
    const invalid = {
      length: ['foo', 'bar'],
      min: ['foo'],
      max: ['foo', 'bar', 'baz', 'biz'],
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.ITEM_LENGTH, values: { length: 4 }, meta: { from: 'yup', type: 'array', validation: 'length' } },
      { key: TranslationKeys.MIN_ITEMS, values: { min: 2 }, meta: { from: 'yup', type: 'array', validation: 'min' } },
      { key: TranslationKeys.MAX_ITEMS, values: { max: 3 }, meta: { from: 'yup', type: 'array', validation: 'max' } },
    ]

    expect(received).toEqual(expected)
  })

  it('uses "default" when field type doesn\'t match', async () => {
    const schema = Yup.object().shape({
      test: Yup.string().min(5),
    })
    const invalid = {
      test: [123],
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.DEFAULT, meta: { from: 'yup', type: 'mixed', validation: 'notType' } },
    ]

    expect(received).toEqual(expected)
  })

  it('use "default" for custom validations', async () => {
    const schema = Yup.object().shape({
      test: Yup.string().test('custom', (value?: string) => value === 'foo'),
    })
    const invalid = {
      test: 'bar',
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.DEFAULT, meta: { from: 'yup', type: 'mixed', validation: 'default' } },
    ]

    expect(received).toEqual(expected)
  })

  it('handle nested objects type missmatch', async () => {
    const schema = Yup.object().shape({
      foo: Yup.object().shape({
        bar: Yup.object().shape({
          baz: Yup.string().min(2),
        }),
      }),
    })
    const invalid = {
      foo: 'foo',
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.DEFAULT, meta: { from: 'yup', type: 'mixed', validation: 'notType' } },
    ]

    expect(received).toEqual(expected)
  })

  it('supports nested objects', async () => {
    const schema = Yup.object().shape({
      foo: Yup.object().shape({
        bar: Yup.object().shape({
          baz: Yup.string().min(2),
        }),
      }),
    })
    const invalid = {
      foo: {
        bar: {
          baz: 'a',
        },
      },
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.MINLENGTH, values: { min: 2 }, meta: { from: 'yup', type: 'string', validation: 'min' } },
    ]
    expect(received).toEqual(expected)
  })

  it('handle array inner type validations', async () => {
    const schema = Yup.object({
      test: Yup.array().of(Yup.string().min(3)).min(1).required(),
    })
    const invalid = {
      test: ['fo', 'ba'],
    }

    const received = await getErrors(schema, invalid)
    const expected = [
      { key: TranslationKeys.MINLENGTH, values: { min: 3 }, meta: { from: 'yup', type: 'string', validation: 'min' } },
      { key: TranslationKeys.MINLENGTH, values: { min: 3 }, meta: { from: 'yup', type: 'string', validation: 'min' } },
    ]
    expect(received).toEqual(expected)
  })

  it('keeps existing translations', async () => {
    const schema = Yup.object().shape({
      mixed: Yup.string().oneOf(['a', 'b'], 'error1'),
      string: Yup.string().required('error2'),
      number: Yup.number().min(2, 'error3'),
      date: Yup.date().min('2000-01-01', 'error4'),
      array: Yup.array().min(1, 'error5'),
    })
    const invalid = {
      mixed: 'c',
      string: '',
      number: 1,
      date: '1970-01-01',
      array: [],
    }

    const received = await getErrors(schema, invalid)
    const expected = ['error1', 'error2', 'error3', 'error4', 'error5']

    expect(received).toEqual(expected)
  })
})
