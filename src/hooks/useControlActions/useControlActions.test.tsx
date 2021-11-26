import renderHook from '../../testkit/renderHook'
import useControlActions from './useControlActions'

describe('useControlActions', () => {
  it('exposes setFieldValue', () => {
    const setFieldValue = jest.fn()
    const actions = renderHook(
      () => useControlActions('foo'),
      {
        formHandlerOptions: { setFieldValue },
      },
    ).result.current as { setFieldValue: any }

    actions.setFieldValue('bar', true, true)
    expect(setFieldValue).toHaveBeenCalledWith({
      name: 'foo',
      value: 'bar',
      shouldValidate: true,
      shouldTouch: true,
    })
  })
})
