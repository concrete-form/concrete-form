import { useConcreteFormHandler, useConcreteFormId } from '../context/concreteForm.context'
import { ControlProps } from '../types'
import { mergeEventHandlers } from '../util/events'
import useFormState from './useFormState'
import useControlState from './useControlState'

const useControlProps = (
  name: string,
  controlProps: Omit<ControlProps, 'name'>,
  group = false,
) => {
  const formId = useConcreteFormId()
  const { isSubmitting } = useFormState()
  const { errors } = useControlState(name)
  const { fieldProps, ...inputProps } = controlProps
  const formHandlerProps = useConcreteFormHandler().getControlProps(name, fieldProps)
  const disabled = formHandlerProps.disabled || inputProps?.disabled || isSubmitting

  const id = group ? undefined : `${formId}-${name}`

  return {
    id,
    'aria-required': inputProps?.required ? 'true' : 'false',
    'aria-invalid': errors?.length > 0 ? 'true' : 'false',
    ...formHandlerProps,
    ...inputProps,
    onChange: mergeEventHandlers(inputProps?.onChange, formHandlerProps.onChange),
    onBlur: mergeEventHandlers(inputProps?.onBlur, formHandlerProps.onBlur),
    onInput: mergeEventHandlers(inputProps?.onInput, formHandlerProps.onInput),
    disabled,
  }
}

export default useControlProps
