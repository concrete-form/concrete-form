import Controls from './Controls.enum'

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

export type LabelledChoice = {
  value: string
  label: string
}

export type Choice = string | LabelledChoice

export type GroupChoices = {
  group: string
  options: Array<Choice | GroupChoices>
}

type SelectOptions = {
  options?: Array<Choice | GroupChoices>
  allowEmpty?: boolean
}

type CheckboxOptions = {
  options?: Choice[]
  single?: boolean
  orientation?: 'horizontal' | 'vertical'
}

type RadioOptions = {
  options?: Choice[]
  orientation?: 'horizontal' | 'vertical'
}

export type InputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type AutocompleteProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type FileInputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type TextareaProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
export type SelectProps = ControlBaseProps & SelectOptions & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
export type CheckboxProps = ControlBaseProps & CheckboxOptions & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type RadioProps = ControlBaseProps & RadioOptions & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type DateProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type TimeProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type ToggleSwitchProps = ControlBaseProps
export type SliderProps = ControlBaseProps

export type SubmitButtonProps = {
  displayLoading?: boolean
}

export type ControlsComponents = {
  [Controls.Input]: React.ReactNode
  [Controls.Textarea]: React.ReactNode
  [Controls.Autocomplete]: React.ReactNode
  [Controls.FileInput]: React.ReactNode
  [Controls.Checkbox]: React.ReactNode
  [Controls.Radio]: React.ReactNode
  [Controls.Select]: React.ReactNode
  [Controls.Date]: React.ReactNode
  [Controls.Time]: React.ReactNode
  [Controls.ToggleSwitch]: React.ReactNode
  [Controls.Slider]: React.ReactNode
  [Controls.SubmitButton]: React.ReactNode
}
