import React, { createContext, useContext } from 'react'

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

export const ConcreteFormProvider: React.FC<ConcreteFormContextType> = ({
  formHandler,
  children,
  ...config
}) => (
  <ConcreteFormContext.Provider value={{ formHandler, ...config }}>
    { children }
  </ConcreteFormContext.Provider>
)
