import renderHook from '../../testkit/renderHook'
import useConcreteFormId from './useConcreteFormId'

describe('useConcreteFormId', () => {
  it('returns a uuid v4 id', () => {
    const result = renderHook(useConcreteFormId).result.current as string
    expect(result.length).toBeGreaterThan(0)
  })

  it('keep the same id betwen renders', () => {
    const hook = renderHook(useConcreteFormId)
    const previousId = hook.result.current as string
    hook.rerender()
    expect(hook.result.current).toMatch(previousId)
  })
})
