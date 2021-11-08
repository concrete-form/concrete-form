import { createContext, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ConcreteFormContextType } from '../types'

export const ConcreteFormContext = createContext<ConcreteFormContextType|null>(null)

export const ConcreteFormProvider: React.FC<Omit<ConcreteFormContextType, 'id'>> = ({
  formHandler,
  config,
  children,
}) => {
  const id = useRef(uuidv4())
  const value = useMemo(() => ({
    id: id.current,
    formHandler,
    config,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [config])
  return (
    <ConcreteFormContext.Provider value={value}>
      { children }
    </ConcreteFormContext.Provider>
  )
}
