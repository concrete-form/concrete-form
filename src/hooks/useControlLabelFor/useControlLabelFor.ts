import useConcreteFormId from '../useConcreteFormId'

const useControlLabelFor = (control: any) => {
  const formId = useConcreteFormId()
  const controlName = control?.props?.name

  if (!controlName) {
    return
  }

  return `${formId}-${controlName as string}`
}

export default useControlLabelFor
