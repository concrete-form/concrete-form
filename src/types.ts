/* form */

export type ConcreteFormContext = {
  config: ConcreteFormConfig
  formHandler: FormHandler
}

export type ConcreteFormConfig = {
  language?: string
  layout?: {
    control?: React.ElementType
    errors?: React.ElementType<{errors: string[]}>
    labelledControl?: React.ElementType
    label?: React.ElementType
  }
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
  isSubmitted: boolean
  hasErrors: boolean
}

export type ConcreteFormProps = {
  formProps?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
  noValidate?: boolean
} & ConcreteFormConfig

/* controls */

export type ControlState = {
  value: any
  errors: string[]
  isTouched: boolean
}

export type ControlBaseProps = {
  name: string
  fieldProps?: any
  required?: boolean
  disabled?: boolean
}

export type CustomControlParameters = {
  incomingDataFormatter?: (formValue: any) => any
  outgoingDataFormatter?: (inputValue: any) => any
  applyLocally?: boolean
  formatInitialValue?: boolean
  validateInitialValue?: boolean
}

export type LabelledChoice<C, L> = {
  value: string
  label: L
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<C>, C>
}

export type Choice<C, L> = string | LabelledChoice<C, L>

export type GroupChoices<G, C, L> = {
  group: string
  options: Array<Choice<C, L> | GroupChoices<G, C, L>>
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<G>, G>
}

export type SingleLevelGroupChoices<C, L> = {
  group: string
  options: Array<Choice<C, L>>
}

export type Orientation = 'horizontal' | 'vertical'
export type Position = 'top' | 'bottom' | 'left' | 'right'

export type InputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type AutocompleteProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type FileInputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type TextareaProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export type SelectProps = {
  options?: Array<Choice<HTMLOptionElement, string|undefined> | SingleLevelGroupChoices<HTMLOptGroupElement, string|undefined>>
  allowEmpty?: boolean
} & ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export type CheckboxProps = {
  options?: Array<Choice<HTMLInputElement, React.ReactNode>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type RadioProps = {
  options?: Array<Choice<HTMLInputElement, React.ReactNode>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type DateProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type TimeProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ToggleSwitchProps = {
  applyInitialValue?: boolean
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type SliderProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type CustomControlProps = {
  render?: (props: any) => React.ReactElement<any, any>
} & ControlBaseProps & CustomControlParameters & React.DetailedHTMLProps<React.InputHTMLAttributes<any>, any>

export type SubmitButtonProps = {
  displayLoading?: boolean
}
