import { render as testingLibraryRender } from '@testing-library/react'
import FormContext, { FormContextProps } from './FormContext'

const render = (content: React.ReactNode, options?: FormContextProps) => testingLibraryRender(
  <FormContext {...options}>
    { content }
  </FormContext>,
)

export default render
