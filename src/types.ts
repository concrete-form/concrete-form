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

export type LabelledChoice<C> = {
  value: string
  label: string
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<C>, C>
}

export type Choice<C> = string | LabelledChoice<C>

export type GroupChoices<G, C> = {
  group: string
  options: Array<Choice<C> | GroupChoices<G, C>>
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<G>, G>
}

export type SingleLevelGroupChoices<C> = {
  group: string
  options: Array<Choice<C>>
}

type Orientation = 'horizontal' | 'vertical'

export type InputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type AutocompleteProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type FileInputProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type TextareaProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export type SelectProps = {
  options?: Array<Choice<HTMLOptionElement> | SingleLevelGroupChoices<HTMLOptGroupElement>>
  allowEmpty?: boolean
} & ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export type CheckboxProps = {
  options?: Array<Choice<HTMLInputElement>>
  single?: boolean
  orientation?: Orientation
} & ControlBaseProps

export type RadioProps = {
  options?: Array<Choice<HTMLInputElement>>
  orientation?: Orientation
} & ControlBaseProps

export type DateProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type TimeProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ToggleSwitchProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type SliderProps = ControlBaseProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

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
