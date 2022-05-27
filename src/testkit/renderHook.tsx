import { renderHook as testingLibraryRenderHook } from '@testing-library/react'

import { ConcreteFormConfig } from '../types'
import { ConcreteFormProvider } from '../context/concreteForm.context'
import TestFormHandler from './TestFormHandler'

type Hook = (props?: any) => unknown

type RenderHookOptions = {
  concreteFormConfig?: ConcreteFormConfig
  formHandlerOptions?: {}
}

type RenderProps = {
  children?: React.ReactNode
}

const renderHook = (
  hook: Hook,
  {
    concreteFormConfig = {},
    formHandlerOptions = {},
  }: RenderHookOptions = {},
) => {
  const wrapper: React.FC<RenderProps> = ({ children }) => (
    <ConcreteFormProvider config={concreteFormConfig} formHandler={new TestFormHandler(formHandlerOptions)}>
      { children }
    </ConcreteFormProvider>
  )

  return testingLibraryRenderHook(hook, { wrapper })
}

export default renderHook
