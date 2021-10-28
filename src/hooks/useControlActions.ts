import { useConcreteFormHandler } from '../context/concreteForm.context'

const useControlActions = (name: string) => {
  const handler = useConcreteFormHandler()
  return {
    setFieldValue: (value: any, shouldValidate: boolean = true, shouldTouch: boolean = true) => handler.setFieldValue(name, value, shouldValidate, shouldTouch),
  }
}

export default useControlActions
