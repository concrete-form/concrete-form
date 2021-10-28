import { useConcreteFormHandler } from '../context/concreteForm.context'

const useFormState = () => useConcreteFormHandler().getFormState()
export default useFormState
