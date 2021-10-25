import Controls from './Controls.enum'

/* form */

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

export type ControlProps = {
  name: string
  fieldProps?: any
}

export type InputProps = ControlProps
export type TextProps = ControlProps
export type TextareaProps = ControlProps
export type NumberProps = ControlProps
export type PasswordProps = ControlProps
export type AutocompleteProps = ControlProps
export type CheckboxProps = ControlProps
export type RadioProps = ControlProps
export type SelectProps = ControlProps
export type DateProps = ControlProps
export type DateRangeProps = ControlProps
export type TimeProps = ControlProps
export type ToggleSwitchProps = ControlProps
export type SliderProps = ControlProps

export type SubmitButtonProps = {
  displayLoading?: boolean
}

export type ControlsComponents = {
  [Controls.Input]: React.ReactNode
  [Controls.Text]: React.ReactNode
  [Controls.Textarea]: React.ReactNode
  [Controls.Number]: React.ReactNode
  [Controls.Password]: React.ReactNode
  [Controls.Autocomplete]: React.ReactNode
  [Controls.Checkbox]: React.ReactNode
  [Controls.Radio]: React.ReactNode
  [Controls.Select]: React.ReactNode
  [Controls.Date]: React.ReactNode
  [Controls.DateRange]: React.ReactNode
  [Controls.Time]: React.ReactNode
  [Controls.ToggleSwitch]: React.ReactNode
  [Controls.Slider]: React.ReactNode
  [Controls.SubmitButton]: React.ReactNode
}
