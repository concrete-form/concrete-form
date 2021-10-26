import { useConcreteFormHandler } from '../context/concreteForm.context'
import { ControlBaseProps } from '../types'

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
    disabled,
  }
}

export const useControlActions = (name: string) => {
  const handler = useConcreteFormHandler()
  return {
    setFieldValue: (value: any, shouldValidate: boolean = true, shouldTouch: boolean = true) => handler.setFieldValue(name, value, shouldValidate, shouldTouch),
  }
}
