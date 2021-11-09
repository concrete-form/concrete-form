import renderHook from '../../testkit/renderHook'
import useFormState from './useFormState'

describe('useFormState', () => {
  it('returns default values', () => {
    const state = renderHook(useFormState).result.current as any
    expect(state.isSubmitting).toBe(false)
    expect(state.hasErrors).toBe(false)
  })

  it('returns "isSubmitting"', () => {
    const state = renderHook(useFormState, {
      formHandlerOptions: { form: { isSubmitting: true } },
    }).result.current as any

    expect(state.isSubmitting).toBe(true)
  })

  it('returns "hasErrors"', () => {
    const state = renderHook(useFormState, {
      formHandlerOptions: { form: { hasErrors: true } },
    }).result.current as any

    expect(state.hasErrors).toBe(true)
  })
})
