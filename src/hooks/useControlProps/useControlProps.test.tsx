import renderHook from '../../testkit/renderHook'
import useControlProps from './useControlProps'

const mockEvent = { defaultPrevented: false, persist: jest.fn() }

const renderControlProps = (
  name: string,
  controlProps?: any,
  group?: boolean,
  formHandlerOptions?: {},
) => renderHook(() => useControlProps(name, controlProps, group), { formHandlerOptions })

describe('useControlProps', () => {
  it('returns an id', () => {
    const props = renderControlProps('foo').result.current as Record<string, any>
    expect(props.id).toBeDefined()
  })

  it('doesn\'t return an id if inside a group', () => {
    const props = renderControlProps('foo', {}, true).result.current as Record<string, any>
    expect(props.id).toBeUndefined()
  })

  it('returns accessibility props', () => {
    const props = renderControlProps('foo').result.current as Record<string, any>
    expect(props['aria-required']).toBeDefined()
    expect(props['aria-invalid']).toBeDefined()
  })

  it('is marked as required when needed', () => {
    const controlProps = { required: 'true' }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>

    expect(props['aria-required']).toBe('true')
    expect(props.required).toBe('true')
  })

  it('is marked as invalid when there are errors', () => {
    const props = renderControlProps('foo', {}, false, { control: { errors: ['whoops'] } }).result.current as Record<string, any>
    expect(props['aria-invalid']).toBe('true')
  })

  it('returns form handler props', () => {
    const controlProps = { fieldProps: { foo: 'test' } }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>
    expect(props).toHaveProperty('foo', 'test')
  })

  it('returns inputs props', () => {
    const controlProps = { bar: 'test' }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>
    expect(props).toHaveProperty('bar', 'test')
  })

  it('merges event handlers', async () => {
    const fieldProps = { onChange: jest.fn(), onBlur: jest.fn(), onInput: jest.fn() }
    const controlProps = { onChange: jest.fn(), onBlur: jest.fn(), onInput: jest.fn(), fieldProps }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>

    await props.onChange(mockEvent)
    await props.onBlur(mockEvent)
    await props.onInput(mockEvent)

    expect(fieldProps.onChange).toHaveBeenCalled()
    expect(controlProps.onChange).toHaveBeenCalled()

    expect(fieldProps.onBlur).toHaveBeenCalled()
    expect(controlProps.onBlur).toHaveBeenCalled()

    expect(fieldProps.onInput).toHaveBeenCalled()
    expect(controlProps.onInput).toHaveBeenCalled()
  })

  it('is not disabled by default', () => {
    const props = renderControlProps('foo').result.current as Record<string, any>
    expect(props.disabled).toBe(false)
  })

  it('can be disabled by form', () => {
    const controlProps = { fieldProps: { disabled: true } }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>
    expect(props.disabled).toBe(true)
  })

  it('can be disabled by field (manually)', () => {
    const controlProps = { disabled: true }
    const props = renderControlProps('foo', controlProps).result.current as Record<string, any>
    expect(props.disabled).toBe(true)
  })

  it('is disabled when the form is submitting', () => {
    const props = renderControlProps('foo', {}, false, { form: { isSubmitting: true } }).result.current as Record<string, any>
    expect(props.disabled).toBe(true)
  })
})
