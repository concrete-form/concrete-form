import useConcreteFormHandler from '../useConcreteFormHandler'
import useConcreteFormConfig from '../useConcreteFormConfig'
import useConcreteFormId from '../useConcreteFormId'
import { ControlProps } from '../../types'
import { mergeEventHandlers } from '../../util/events'
import useControlState from '../useControlState'

const useControlProps = (
  name: string,
  controlProps: Omit<ControlProps, 'name'> = {},
  group = false,
) => {
  const formHandler = useConcreteFormHandler()
  const { disableWhileSubmitting } = useConcreteFormConfig()

  const formId = useConcreteFormId()
  const { errors } = useControlState(name)
  const { fieldProps, ...inputProps } = controlProps
  const isSubmitting = disableWhileSubmitting === false ? false : formHandler.getFormState().isSubmitting
  const formHandlerProps = formHandler.getControlProps(name, group, fieldProps)
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
