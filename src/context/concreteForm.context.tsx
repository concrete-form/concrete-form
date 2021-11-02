import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ConcreteFormContext as ConcreteFormContextType } from '../types'

const ConcreteFormContext = createContext<ConcreteFormContextType|null>(null)

const useConcreteFormContext = (): ConcreteFormContextType => {
  const context = useContext(ConcreteFormContext)
  if (!context) {
    throw new Error('Missing form context. Did you forget to use <Form /> ?')
  }
  return context
}

export const useConcreteFormHandler = () => useConcreteFormContext().formHandler
export const useConcreteFormConfig = () => useConcreteFormContext().config
export const useConcreteFormId = () => useConcreteFormContext().id

export const ConcreteFormProvider: React.FC<Omit<ConcreteFormContextType, 'id'>> = ({
  formHandler,
  children,
  ...config
}) => (
  <ConcreteFormContext.Provider value={{ formHandler, ...config, id: uuidv4() }}>
    { children }
  </ConcreteFormContext.Provider>
)
