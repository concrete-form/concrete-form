import useConcreteFormHandler from '../useConcreteFormHandler'

const useControlActions = (name: string) => {
  const handler = useConcreteFormHandler()
  return {
    setFieldValue: (value: any, shouldValidate: boolean = true, shouldTouch: boolean = true) => handler.setFieldValue(name, value, shouldValidate, shouldTouch),
    setFieldTouched: () => handler.setFieldTouched(name),
  }
}

export default useControlActions
