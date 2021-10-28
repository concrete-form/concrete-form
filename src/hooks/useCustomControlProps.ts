import { useEffect, useState, useRef } from 'react'
import { ControlBaseProps, CustomControlParameters } from '../types'
import { mergeEventHandlers, removeEventHandlers, extractEventHandlers } from '../util/events'
import useControlProps from './useControlProps'
import useControlState from './useControlState'
import useControlActions from './useControlActions'

const useCustomControlProps = (
  name: string,
  {
    incomingDataFormatter,
    outgoingDataFormatter,
    applyLocally = false,
    formatInitialValue = false,
  }: CustomControlParameters,
  controlProps: Omit<ControlBaseProps, 'name'> & React.DetailedHTMLProps<React.InputHTMLAttributes<any>, any>,
) => {
  if (formatInitialValue && !outgoingDataFormatter) {
    console.warn('"formatInitialValue" has no effect when "outgoingDataFormatter" is undefined')
  }
  const { fieldProps, ...inputProps } = controlProps
  const getInitialValue = (value: any) => (incomingDataFormatter ? incomingDataFormatter(value) : value) ?? ''
  const { value } = useControlState(name)
  const { setFieldValue } = useControlActions(name)
  const expectedValue = !formatInitialValue || !outgoingDataFormatter ? value : outgoingDataFormatter(value)
  const initialValue = useRef(getInitialValue(applyLocally ? expectedValue : value))
  const props = useControlProps(name, controlProps)
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
      setInputValue(outgoingDataFormatter ? outgoingDataFormatter(newValue) : newValue)
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

  return {
    ...removeEventHandlers(props),
    ...extractEventHandlers(inputProps),
    ...handleControlledProps(),
    ref: undefined,
    onChange: mergeEventHandlers(inputProps?.onChange, onInputValueChange),
  }
}

export default useCustomControlProps
