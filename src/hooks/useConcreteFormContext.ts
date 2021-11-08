import { useContext } from 'react'

import { ConcreteFormContext } from '../context/concreteForm.context'
import { ConcreteFormContextType } from '../types'

const useConcreteFormContext = (): ConcreteFormContextType => {
  const context = useContext(ConcreteFormContext)
  if (!context) {
    throw new Error('Missing form context. Did you forget to use <Form /> ?')
  }
  return context
}

export default useConcreteFormContext
