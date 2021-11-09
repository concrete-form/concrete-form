import renderHook from '../../testkit/renderHook'
import useConcreteFormHandler from './useConcreteFormHandler'

describe('useConcreteFormHandler', () => {
  it('returns the form handler', () => {
    const result = renderHook(useConcreteFormHandler).result.current as { name: string }
    expect(result.name).toBe('TestFormHandler')
  })
})
