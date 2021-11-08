import useConcreteFormHandler from './useConcreteFormHandler'

const useControlState = (name: string) => useConcreteFormHandler().getControlState(name)
export default useControlState
