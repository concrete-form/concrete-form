import renderHook from '../../testkit/renderHook'
import useTranslator from './useTranslator'
import { Translator } from '../../types'
import en from '../../locales/en'
import fr from '../../locales/fr'

describe('useTranslator', () => {
  it('returns default translator', () => {
    const translator = renderHook(useTranslator).result.current as Translator
    expect(translator({ key: 'default' })).toBe(en.default)
  })

  it('uses "language" setting when using default translator', () => {
    const translator = renderHook(useTranslator, {
      concreteFormConfig: { language: 'fr' },
    }).result.current as Translator
    expect(translator({ key: 'default' })).toBe(fr.default)
  })

  it('returns custom translator', () => {
    const translator = renderHook(useTranslator, {
      concreteFormConfig: { translator: jest.fn(() => 'custom') },
    }).result.current as Translator
    expect(translator({ key: 'default' })).toBe('custom')
  })
})
