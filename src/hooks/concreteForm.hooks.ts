import { useConcreteFormHandler } from '../context/concreteForm.context'
import { ControlBaseProps } from '../types'
import { mergeEventHandlers } from '../util/events'

export const useFormState = () => useConcreteFormHandler().getFormState()
export const useControlState = (name: string) => useConcreteFormHandler().getControlState(name)

export const useControlProps = (
  name: string,
  controlProps: Omit<ControlBaseProps, 'name'>,
) => {
  const { isSubmitting } = useFormState()
  const { errors } = useControlState(name)
  const { fieldProps, ...inputProps } = controlProps
  const formHandlerProps = useConcreteFormHandler().getControlProps(name, fieldProps)
  const disabled = formHandlerProps.disabled || inputProps.disabled || isSubmitting

  return {
    'aria-required': inputProps?.required ? 'true' : 'false',
    'aria-invalid': errors?.length > 0 ? 'true' : 'false',
    ...formHandlerProps,
    ...inputProps,
    onChange: mergeEventHandlers((inputProps as any).onChange, formHandlerProps.onChange),
    onBlur: mergeEventHandlers((inputProps as any).onBlur, formHandlerProps.onBlur),
    onInput: mergeEventHandlers((inputProps as any).onInput, formHandlerProps.onInput),
    disabled,
  }
}

export const useControlActions = (name: string) => {
  const handler = useConcreteFormHandler()
  return {
    setFieldValue: (value: any, shouldValidate: boolean = true, shouldTouch: boolean = true) => handler.setFieldValue(name, value, shouldValidate, shouldTouch),
  }
}
