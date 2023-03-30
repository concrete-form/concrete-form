import defaultTranslator from './defaultTranslator'
import en from './defaultLocales/en'
import fr from './defaultLocales/fr'

describe('defaultTranslator', () => {
  it('supports english', () => {
    const translator = defaultTranslator('en')
    expect(translator({ key: 'default' })).toBe(en.default)
  })

  it('supports french', () => {
    const translator = defaultTranslator('fr')
    expect(translator({ key: 'default' })).toBe(fr.default)
  })

  it('use english by default', () => {
    const translator = defaultTranslator()
    expect(translator({ key: 'default' })).toBe(en.default)
  })

  it('fallback to english for unknown languages', () => {
    const translator = defaultTranslator('xy')
    expect(translator({ key: 'default' })).toBe(en.default)
  })

  it('do not translate strings', () => {
    const translator = defaultTranslator()
    expect(translator('default')).toBe('default')
  })

  it('returns the key for unknown translation', () => {
    const translator = defaultTranslator()
    expect(translator({ key: 'test-foo' })).toBe('test-foo')
  })

  it('apply values', () => {
    const translator = defaultTranslator()
    expect(translator({ key: 'length', values: { length: '666' } })).toMatch(/666/)
  })

  it('removed unfilled variables', () => {
    const translator = defaultTranslator()
    expect(en.length).toMatch(/{{length}}/)
    expect(translator({ key: 'length' })).not.toMatch(/{{length}}/)
  })
})
