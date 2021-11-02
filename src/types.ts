import Layout from './Layout.enum'

/* form */

export type ConcreteFormContext = {
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
  formProps?: ReactFormProps
  noValidate?: boolean
} & ConcreteFormConfig

/* layout */

export type ControlLayoutProps = {
  name: string
  control: React.ReactNode
  errors: React.ReactNode
}

export type ErrorsLayoutProps = {
  name: string
  errors: string[]
}

export type ItemLabelLayoutProps = {
  name: string
  control: React.ReactNode
  label: React.ReactNode
  labelPosition?: Position
}

export type ItemsGroupLayoutProps = {
  name: string
  items: React.ReactNode
  orientation?: Orientation
}

export type LabelLayoutProps = {
  label: React.ReactNode
  htmlFor?: string
}

export type LabelledControlLayoutProps = {
  control: React.ReactNode
  label: React.ReactNode
  labelPosition?: Position
}

/* exposed labelled control */

export type LabelledcontrolProps = Omit<LabelledControlLayoutProps, 'control'>

/* react detailed props */

export type ReactFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
export type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type ReactTextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
export type ReactSelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
export type ReactOptionsProps = React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
export type ReactOptGroupProps = React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>

/* controls */

export type ControlState = {
  value: any
  errors: string[]
  isTouched: boolean
}

export type ControlBaseProps = {
  name: string
  fieldProps?: any
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
  props?: C
}

export type Choice<C, L> = string | LabelledChoice<C, L>

export type GroupChoices<G, C, L> = {
  group: string
  options: Array<Choice<C, L> | GroupChoices<G, C, L>>
  props?: G
}

export type SingleLevelGroupChoices<G, C, L> = {
  group: string
  options: Array<Choice<C, L>>
  props?: G
}

export type Orientation = 'horizontal' | 'vertical'
export type Position = 'top' | 'bottom' | 'left' | 'right'

export type InputProps = ControlBaseProps & ReactInputProps

export type AutocompleteProps = ControlBaseProps & ReactInputProps

export type FileInputProps = ControlBaseProps & ReactInputProps

export type TextareaProps = ControlBaseProps & ReactTextareaProps

export type SelectProps = {
  options?: Array<Choice<ReactOptionsProps, string|undefined> | SingleLevelGroupChoices<ReactOptGroupProps, ReactOptionsProps, string|undefined>>
  allowEmpty?: boolean
} & ControlBaseProps & ReactSelectProps

export type CheckboxProps = {
  options?: Array<Choice<ReactInputProps, React.ReactNode>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type RadioProps = {
  options?: Array<Choice<ReactInputProps, React.ReactNode>>
  orientation?: Orientation
  labelPosition?: Position
} & ControlBaseProps

export type DateTimeProps = {
  type?: 'date' | 'time' | 'datetime'
} & ControlBaseProps & Omit<ReactInputProps, 'type'>

export type ToggleSwitchProps = {
  applyInitialValue?: boolean
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps & ReactInputProps

export type SingleCheckboxProps = {
  applyInitialValue?: boolean
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps & ReactInputProps

export type SliderProps = {
  label?: React.ReactNode
  labelPosition?: Position
} & ControlBaseProps & ReactInputProps

export type CustomControlProps = {
  render?: (props: any) => React.ReactElement<any, any>
} & ControlBaseProps & CustomControlParameters & React.DetailedHTMLProps<React.InputHTMLAttributes<any>, any>

export type SubmitButtonProps = {
  displayLoading?: boolean
  loadingComponent?: React.ReactNode
  alternateLoadingContent?: React.ReactNode
}

type ControlPropsToMerge = {
  disabled?: boolean
  required?: boolean
  onChange?: any
  onBlur?: any
  onInput?: any
}

export type ControlProps = ControlPropsToMerge & (InputProps | AutocompleteProps | FileInputProps | TextareaProps | SelectProps | CheckboxProps | RadioProps | DateTimeProps | ToggleSwitchProps | SingleCheckboxProps | SliderProps | CustomControlProps)
