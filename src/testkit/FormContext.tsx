import { ConcreteFormConfig } from '../types'
import { ConcreteFormProvider } from '../context/concreteForm.context'
import TestFormHandler from './TestFormHandler'

export type FormContextProps = {
  children?: React.ReactNode
  concreteFormConfig?: ConcreteFormConfig
  formHandlerOptions?: {}
}

const FormContext: React.FC<FormContextProps> = ({
  concreteFormConfig = {},
  formHandlerOptions = {},
  children,
}) => (
  <ConcreteFormProvider config={concreteFormConfig} formHandler={new TestFormHandler(formHandlerOptions)}>
    { children }
  </ConcreteFormProvider>
)

export default FormContext
