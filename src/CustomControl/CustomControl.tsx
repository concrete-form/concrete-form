import { useEffect, useState, useRef } from 'react'
import { ControlBaseProps } from '../types'
import { useControlProps, useControlState, useControlActions } from '../hooks/concreteForm.hooks'
import { mergeEventHandlers } from '../util/events'

type CustomControlProps = {
  name: string
  render?: (props: any) => React.ReactElement<any, any> | null
  incomingDataFormatter?: (formValue: any) => any
  outgoingDataFormatter?: (inputValue: any) => any
  applyLocally?: boolean
  formatInitialValue?: boolean
  validateInitialValue?: boolean
} & ControlBaseProps & any

const CustomControl: React.FC<CustomControlProps> = ({
  name,
  render,
  incomingDataFormatter,
  outgoingDataFormatter,
  applyLocally = false,
  formatInitialValue = false,
  ...inputProps
}) => {
  if (formatInitialValue && !outgoingDataFormatter) {
    console.warn('"formatInitialValue" has no effect when no outgoing formatter is defined')
  }

  const getInitialValue = (value: any) => (incomingDataFormatter ? incomingDataFormatter(value) : value) ?? ''

  const { value } = useControlState(name)
  const { setFieldValue } = useControlActions(name)
  const expectedValue = !formatInitialValue || !outgoingDataFormatter ? value : outgoingDataFormatter(value)
  const initialValue = useRef(getInitialValue(applyLocally ? expectedValue : value))
  const props = useControlProps(name, inputProps)
  const [inputValue, setInputValue] = useState<any>(initialValue.current)

  useEffect(() => {
    if (value !== expectedValue) {
      setFieldValue(expectedValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue.current])

  const onInputValueChange = (event: React.ChangeEvent<any>) => {
    let newValue: any
    switch (inputProps?.type) {
      case 'checkbox':
      case 'radio':
        newValue = event.target.checked ? event.target.value : undefined
        break
      default:
        newValue = event.target.value
    }
    if (applyLocally) {
      setInputValue(outgoingDataFormatter(newValue))
    }
    setFieldValue(outgoingDataFormatter ? outgoingDataFormatter(newValue) : newValue, true, true)
  }

  const handleControlledProps = () => {
    const controlledProps: Record<string, any> = {}
    switch (inputProps?.type) {
      case 'checkbox':
      case 'radio':
        if (applyLocally) {
          controlledProps.checked = !!inputValue
        } else {
          controlledProps.checked = undefined
          controlledProps.defaultChecked = !!initialValue.current
        }
        break
      default:
        if (applyLocally) {
          controlledProps.value = inputValue
        } else {
          controlledProps.value = undefined
          controlledProps.defaultValue = initialValue.current
        }
    }
    return controlledProps
  }

  const renderComponent = render ?? ((props: any) => <input {...props} />)

  return renderComponent({
    ...props,
    ...handleControlledProps(),
    ref: undefined,
    onChange: mergeEventHandlers(inputProps?.onChange, onInputValueChange),
    onBlur: inputProps?.onBlur,
    onInput: inputProps?.onInput,
  })
}

export default CustomControl
