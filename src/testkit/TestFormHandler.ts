import { FormHandler } from '../types/types'

export default class ReactHookFormHandler implements FormHandler {
  public name = 'TestFormHandler'
  constructor (private readonly testState: Record<string, any>) {
  }

  public getFormState () {
    return {
      isSubmitting: this.testState?.form?.isSubmitting ?? false,
      hasErrors: this.testState?.form?.hasErrors ?? false,
    }
  }

  public getControlProps (name: string, group: boolean, options?: any) {
    return { name, group, ...options, ...this.testState?.control?.props }
  }

  public getControlState (name: string) {
    return {
      value: this.testState?.control?.value,
      errors: this.testState?.control?.errors ?? [],
    }
  }

  public setFieldValue (
    name: string,
    value: any,
    shouldValidate?: boolean,
    shouldTouch?: boolean,
  ) {
    if (this.testState?.setFieldValue) {
      this.testState?.setFieldValue({ name, value, shouldValidate, shouldTouch })
    }
  }
}
