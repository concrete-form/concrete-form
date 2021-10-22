import { useConcreteFormHandler } from '../context/concreteForm.context'

export const useFormState = () => useConcreteFormHandler().getFormState()

export const useControlState = (name: string) => useConcreteFormHandler().getControlState(name)

export const useControlProps = (name: string, options?: any) => useConcreteFormHandler().getControlProps(name, options)

export const useControlActions = (name: string) => {
  const handler = useConcreteFormHandler()
  return {
    setFieldValue: (name: string, value: any, shouldValidate?: boolean, shouldTouch?: boolean) => handler.setFieldValue(name, value, shouldValidate, shouldTouch),
  }
}
