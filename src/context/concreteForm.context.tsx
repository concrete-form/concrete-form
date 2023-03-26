import { createContext, useId } from 'react'

import { ConcreteFormContextType } from '../types'

export const ConcreteFormContext = createContext<ConcreteFormContextType|null>(null)

export const ConcreteFormProvider: React.FC<Omit<ConcreteFormContextType, 'id'>> = ({
  formHandler,
  config,
  children,
}) => {
  const id = useId()
  return (
    <ConcreteFormContext.Provider
      value={{
        id,
        formHandler,
        config,
      }}
    >
      { children }
    </ConcreteFormContext.Provider>
  )
}
