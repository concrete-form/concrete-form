import { useConcreteFormHandler } from '../context/concreteForm.context'

const useControlState = (name: string) => useConcreteFormHandler().getControlState(name)
export default useControlState
