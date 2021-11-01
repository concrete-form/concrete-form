import { useConcreteFormId } from '../context/concreteForm.context'

const useControlLabelFor = (control: any) => {
  const formId = useConcreteFormId()
  const controlType = control?.type?.name ?? ''
  const controlName = control?.props?.name

  if (!controlType || !controlName) {
    return
  }

  if (![
    'Input',
    'Autocomplete',
    'FileInput',
    'Select',
    'DateTime',
    'Slider',
  ].includes(controlType)) {
    return
  }

  return `${formId}-${controlName as string}`
}

export default useControlLabelFor
