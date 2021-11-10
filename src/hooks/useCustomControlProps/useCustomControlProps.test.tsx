import { act } from '@testing-library/react-hooks'
import renderHook from '../../testkit/renderHook'
import useCustomControlProps from './useCustomControlProps'
import { CustomControlParameters } from '../../types'

type HookProps = {
  name: string
  controlProps?: {}
} & CustomControlParameters

const createEvent = (value: any, checked?: boolean) => ({ defaultPrevented: false, persist: jest.fn(), target: { value, checked } })

const renderCustomControlProps = (hookProps: HookProps, contextProps = {}) => {
  const { name, incomingDataFormatter, outgoingDataFormatter, applyLocally, formatInitialValue, ...controlProps } = hookProps
  const parameters = { incomingDataFormatter, outgoingDataFormatter, applyLocally, formatInitialValue }

  return renderHook(
    () => useCustomControlProps(name, parameters, controlProps as any),
    contextProps,
  )
}

describe('useCustomControlProps', () => {
  describe('without "applyLocally"', () => {
    it('doesn\'t control the input', () => {
      const controlProps = { name: 'foo' }
      const contextProps = { formHandlerOptions: { control: { value: 'bar' } } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(props.value).toBeUndefined()
      expect(props.defaultValue).toBe('bar')
    })

    it('format incoming data', async () => {
      const incomingDataFormatter = jest.fn((value: string[]) => value.join(''))
      const setFieldValue = jest.fn()
      const controlProps = { name: 'foo', incomingDataFormatter }
      const contextProps = { formHandlerOptions: { control: { value: ['t', 'e', 's', 't'] }, setFieldValue } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(props.defaultValue).toBe('test')
    })

    it('formats initialValue only on the form', () => {
      const setFieldValue = jest.fn()
      const outgoingDataFormatter = jest.fn((value: string) => value.toUpperCase())
      const controlProps = { name: 'foo', outgoingDataFormatter, formatInitialValue: true }
      const contextProps = { formHandlerOptions: { control: { value: 'bar' }, setFieldValue } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
        value: 'BAR',
      }))
      expect(props.defaultValue).toBe('bar')
    })
  })

  describe('with "applyLocally"', () => {
    it('control the input', () => {
      const controlProps = { name: 'foo', applyLocally: true }
      const contextProps = { formHandlerOptions: { control: { value: 'bar' } } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(props.value).toBe('bar')
      expect(props.defaultValue).toBeUndefined()
    })

    it('format incoming data', async () => {
      const incomingDataFormatter = jest.fn((value: string[]) => value.join(''))
      const setFieldValue = jest.fn()
      const controlProps = { name: 'foo', applyLocally: true, incomingDataFormatter }
      const contextProps = { formHandlerOptions: { control: { value: ['t', 'e', 's', 't'] }, setFieldValue } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(props.value).toBe('test')
    })

    it('apply changes locally without "outgoingDataFormatter"', async () => {
      const controlProps = { name: 'foo', applyLocally: true }
      const hook = renderCustomControlProps(controlProps)
      await act(async () => {
        await (hook.result.current as any).onChange(createEvent('input'))
      })
      const props = hook.result.current as any
      expect(props.value).toBe('input')
      expect(props.defaultValue).toBeUndefined()
    })

    it('apply changes locally with "outgoingDataFormatter"', async () => {
      const outgoingDataFormatter = jest.fn((value: string) => value.toUpperCase())
      const controlProps = { name: 'foo', outgoingDataFormatter, applyLocally: true }
      const hook = renderCustomControlProps(controlProps)
      await act(async () => {
        await (hook.result.current as any).onChange(createEvent('input'))
      })
      const props = hook.result.current as any
      expect(props.value).toBe('INPUT')
      expect(props.defaultValue).toBeUndefined()
    })

    it('apply changes locally with a boolean input', async () => {
      const controlProps = { name: 'foo', type: 'checkbox', applyLocally: true }
      const hook = renderCustomControlProps(controlProps)
      await act(async () => {
        await (hook.result.current as any).onChange(createEvent('input', true))
      })
      const props = hook.result.current as any
      expect(props.checked).toBe(true)
    })

    it('formats initialValue on the input AND on the form', () => {
      const setFieldValue = jest.fn()
      const outgoingDataFormatter = jest.fn((value: string) => value.toUpperCase())
      const controlProps = { name: 'foo', outgoingDataFormatter, applyLocally: true, formatInitialValue: true }
      const contextProps = { formHandlerOptions: { control: { value: 'bar' }, setFieldValue } }
      const props = renderCustomControlProps(controlProps, contextProps).result.current as any

      expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
        value: 'BAR',
      }))
      expect(props.value).toBe('BAR')
    })
  })

  it('handle textual input change', async () => {
    const setFieldValue = jest.fn()
    const controlProps = { name: 'foo' }
    const contextProps = { formHandlerOptions: { setFieldValue } }

    const props = renderCustomControlProps(controlProps, contextProps).result.current as any
    await props.onChange(createEvent('input'))
    expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
      value: 'input',
    }))
  })

  it('handle boolean input change', async () => {
    const setFieldValue = jest.fn()
    const checkboxProps = { name: 'foo', type: 'checkbox' }
    const contextProps = { formHandlerOptions: { setFieldValue } }

    const hook = renderCustomControlProps(checkboxProps, contextProps)
    const props = hook.result.current as any

    await props.onChange(createEvent('value', true))
    expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
      value: 'value',
    }))

    await props.onChange(createEvent('value', false))
    expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
      value: undefined,
    }))
  })

  it('uses the outgoingDataFormatter to send data to the form', async () => {
    const setFieldValue = jest.fn()
    const outgoingDataFormatter = jest.fn(() => 'formatted')
    const controlProps = { name: 'foo', outgoingDataFormatter }
    const contextProps = { formHandlerOptions: { setFieldValue } }
    const props = renderCustomControlProps(controlProps, contextProps).result.current as any

    await props.onChange(createEvent('input'))
    expect(outgoingDataFormatter).toHaveBeenCalledWith('input')
    expect(setFieldValue).toHaveBeenCalledWith(expect.objectContaining({
      value: 'formatted',
    }))
  })

  it('bypass form event handler and ref', async () => {
    const controlProps = { name: 'foo' }
    const contextProps = { formHandlerOptions: { control: { props: { onChange: jest.fn(), onBlur: jest.fn() } } } }
    const props = renderCustomControlProps(controlProps, contextProps).result.current as any

    await props.onChange(createEvent('input'))

    expect(props.ref).toBeUndefined()
    expect(props.onBlur).toBeUndefined()
    expect(contextProps.formHandlerOptions.control.props.onChange).not.toHaveBeenCalled()
  })

  it('allows custom onChange event handler', async () => {
    const controlProps = { name: 'foo', onChange: jest.fn() }
    const props = renderCustomControlProps(controlProps).result.current as any

    await props.onChange(createEvent('input'))

    expect(controlProps.onChange).toHaveBeenCalled()
  })

  it('print a console warning when "formatInitialValue" is enabled without proving "outgoingDataFormatter"', () => {
    const originalConsoleWarn = console.warn
    console.warn = jest.fn()

    const controlProps = { name: 'foo', formatInitialValue: true }
    renderCustomControlProps(controlProps).result.current as any

    expect(console.warn).toHaveBeenCalledWith('"formatInitialValue" has no effect when "outgoingDataFormatter" is undefined')

    console.warn = originalConsoleWarn
  })
})
