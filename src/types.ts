export type ConcreteFormContext = {
  config: ConcreteFormConfig
  formHandler: FormHandler
}

export type ConcreteFormConfig = {
  language?: string
}

export type FormHandler = {
  getFormState: () => FormState
  getControlProps: (name: string, options?: any) => any
  getControlState: (name: string) => ControlState
  setFieldValue: (name: string, value: any, shouldValidate?: boolean, shouldTouch?: boolean) => void
}

export type FormState = {
  isValid: boolean
  isSubmitting: boolean
  wasSubmitted: boolean
}

export type ControlState = {
  value: any
  errors: string[]
  isTouched: boolean
}

export type ControlProps = {
  name: string
  fieldProps?: any
}

export type ConcreteFormProps = {
  formProps?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
  noValidate?: boolean
} & ConcreteFormConfig
