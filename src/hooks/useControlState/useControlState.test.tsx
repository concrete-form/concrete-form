import renderHook from '../../testkit/renderHook'
import useControlState from './useControlState'

describe('useControlState', () => {
  it('returns the value', () => {
    const state = renderHook(useControlState, {
      formHandlerOptions: {
        control: {
          value: 'foo',
        },
      },
    }).result.current as { value: string }
    expect(state.value).toBe('foo')
  })

  it('returns an empty array when there are no errors', () => {
    const state = renderHook(useControlState).result.current as { errors: string[] }
    expect(state.errors).toEqual([])
  })

  it('returns the errors', () => {
    const errors = ['foo', 'bar']
    const state = renderHook(useControlState, {
      formHandlerOptions: {
        control: {
          errors,
        },
      },
    }).result.current as { errors: string[] }
    expect(state.errors).toEqual(errors)
  })
})
