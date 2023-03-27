import Layout from './Layout.enum'

export type Translation = string | { key: string, values?: Record<string, string|number>, meta?: Record<string, any> }
export type Translator = (translation: Translation) => string

/* form */

export type ConcreteFormContextType = {
  children?: React.ReactNode
  config: ConcreteFormConfig
  formHandler: FormHandler
  id: string
}

export type ConcreteFormConfig = {
  layout?: {
    [Layout.Control]?: React.ElementType<ControlLayoutProps>
    [Layout.Errors]?: React.ElementType<ErrorsLayoutProps>
    [Layout.ItemLabel]?: React.ElementType<ItemLabelLayoutProps>
    [Layout.ItemsGroup]?: React.ElementType<ItemsGroupLayoutProps>
    [Layout.Label]?: React.ElementType<LabelLayoutProps>
    [Layout.LabelledControl]?: React.ElementType<LabelledControlLayoutProps>
  }
  disableWhileSubmitting?: boolean
  language?: string
  translator?: Translator
}

export type FormHandler = {
  getFormState: () => FormState
  getControlProps: (name: string, options?: any) => any
  getControlState: (name: string) => ControlState
  setFieldValue: (name: string, value: any, shouldValidate?: boolean, shouldTouch?: boolean) => void
}

export type FormState = {
  isSubmitting: boolean
  hasErrors: boolean
}

export type ConcreteFormProps = {
  children?: React.ReactNode
  formProps?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
  noValidate?: boolean
} & ConcreteFormConfig

/* layout */

export type ControlLayoutProps = {
  children?: React.ReactNode
  name: string
  control: React.ReactNode
  errors?: React.ReactNode
  [key: string]: any
}

export type ErrorsLayoutProps = {
  children?: React.ReactNode
  name: string
  errors: string[]
  [key: string]: any
}

export type ItemLabelLayoutProps = {
  children?: React.ReactNode
  name: string
  control: React.ReactNode
  label: React.ReactNode
  labelPosition?: Position
  [key: string]: any
}

export type ItemsGroupLayoutProps = {
  children?: React.ReactNode
  name: string
  items: React.ReactNode
  orientation?: Orientation
  [key: string]: any
}

export type LabelLayoutProps = {
  children?: React.ReactNode
  label: React.ReactNode
  htmlFor?: string
  [key: string]: any
}

export type LabelledControlLayoutProps = {
  children?: React.ReactNode
  control: React.ReactNode
  label: React.ReactNode
  labelPosition?: Position
  [key: string]: any
}

/* controls internal state */

export type ControlState = {
  value: any
  errors: Translation[]
}

export type ControlBaseProps = {
  children?: React.ReactNode
  name: string
  fieldProps?: any
}

export type CustomControlParameters = {
  incomingDataFormatter?: (formValue: any) => any
  outgoingDataFormatter?: (inputValue: any) => any
  applyLocally?: boolean
  formatInitialValue?: boolean
}

export type LabelledChoice<C, L> = {
  value: string
  label: L
  props?: C
}

export type Choice<C, L> = L | LabelledChoice<C, L>

export type GroupChoices<G, C, L> = {
  group: L
  options: Array<Choice<C, L> | GroupChoices<G, C, L>>
  props?: G
}

export type SingleLevelGroupChoices<G, C, L> = {
  group: L
  options: Array<Choice<C, L>>
  props?: G
}

export type Orientation = 'horizontal' | 'vertical'
export type Position = 'top' | 'bottom' | 'left' | 'right'

/* exported labelled control */

export type LabelledControlProps = Omit<LabelledControlLayoutProps, 'control'>

/* exported controls */

export type AutocompleteProps = ControlBaseProps

export type CheckboxGroupProps<C, L> = {
  options?: Array<Choice<C, L>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type CustomControlProps = {
  render?: (props: any) => React.ReactElement
} & ControlBaseProps & CustomControlParameters

export type DateTimeProps = {
  type?: 'date' | 'time' | 'datetime'
} & ControlBaseProps

export type FileInputProps = ControlBaseProps

export type InputProps = ControlBaseProps

export type RadioGroupProps<C, L> = {
  options?: Array<Choice<C, L>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type SelectProps<G, C, L> = {
  options?: Array<Choice<C, L> | SingleLevelGroupChoices<G, C, L>>
  allowEmpty?: boolean
} & ControlBaseProps

export type SingleCheckboxProps = {
  applyInitialValue?: boolean
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps

export type SliderProps = {
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps

export type SubmitButtonProps = {
  displayLoading?: boolean
  loadingComponent?: React.ReactNode
  alternateLoadingContent?: React.ReactNode
}

export type TextareaProps = ControlBaseProps

export type ToggleSwitchProps = {
  applyInitialValue?: boolean
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps

type ControlPropsToMerge = {
  disabled?: boolean
  required?: boolean
  onChange?: any
  onBlur?: any
  onInput?: any
  [key: string]: any
}

export type ControlProps = ControlPropsToMerge & (
  AutocompleteProps |
  CheckboxGroupProps<any, any> |
  CustomControlProps |
  DateTimeProps |
  FileInputProps |
  InputProps |
  RadioGroupProps<any, any> |
  SelectProps<any, any, any> |
  SingleCheckboxProps |
  SliderProps |
  TextareaProps |
  ToggleSwitchProps
)
