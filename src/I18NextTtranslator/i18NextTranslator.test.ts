import i18n from 'i18next'

import i18NextTranslator from './i18NextTranslator'

jest.mock('i18next')

describe('i18NextTranslator', () => {
  beforeEach(() => {
    ;(i18n.t as jest.Mock).mockImplementation((key, options) => JSON.stringify({ key, options }))
  })

  it('uses "formValidation" as default prefix', () => {
    const translator = i18NextTranslator()
    expect(translator({ key: 'foo' })).toBe(JSON.stringify({ key: 'formValidation.foo', options: {} }))
  })

  it('uses custom prefix when provided', () => {
    const translator = i18NextTranslator({ prefix: 'demo' })
    expect(translator({ key: 'foo' })).toBe(JSON.stringify({ key: 'demo.foo', options: {} }))
  })

  it('forwards values as i18n variables', () => {
    const translator = i18NextTranslator()
    expect(translator({ key: 'length', values: { length: '666' } })).toBe(JSON.stringify({ key: 'formValidation.length', options: { length: '666' } }))
  })

  it('returns custom translations', () => {
    const translator = i18NextTranslator()
    const customMessage = 'this is a custom message'
    expect(translator(customMessage)).toBe(customMessage)
  })
})
