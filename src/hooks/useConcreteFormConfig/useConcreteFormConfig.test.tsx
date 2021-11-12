import renderHook from '../../testkit/renderHook'
import useConcreteFormConfig from './useConcreteFormConfig'
import Layout from '../../types/Layout.enum'

const CustomLayout: React.FC = () => <div>...</div>

describe('useConcreteFormConfig', () => {
  it('returns the configs', () => {
    const concreteFormConfig = { language: 'fr', layout: { [Layout.Control]: CustomLayout }, disableWhileSubmitting: false }
    const result = renderHook(useConcreteFormConfig, { concreteFormConfig }).result.current as {}
    expect(result).toEqual(concreteFormConfig)
  })

  it('handled empty configs', () => {
    const result = renderHook(useConcreteFormConfig).result.current as {}
    expect(result).toEqual({})
  })
})
