import { createContext, useRef } from 'react'
import generateId from '../util/generateId'

import { ConcreteFormContextType } from '../types'

export const ConcreteFormContext = createContext<ConcreteFormContextType|null>(null)

export const ConcreteFormProvider: React.FC<Omit<ConcreteFormContextType, 'id'>> = ({
  formHandler,
  config,
  children,
}) => {
  const id = useRef(generateId())
  return (
    <ConcreteFormContext.Provider
      value={{
        id: id.current,
        formHandler,
        config,
      }}
    >
      { children }
    </ConcreteFormContext.Provider>
  )
}
