import { Choice, GroupChoices, SingleLevelGroupChoices } from '../types'

export enum ChoiceType {
  Option,
  Group,
}

export type FormattedOption<O> = {
  type: ChoiceType.Option
  label: string
  value: string
  props?: React.DetailedHTMLProps<React.FormHTMLAttributes<O>, O>
}

export type FormattedGroup<O, G> = {
  type: ChoiceType.Group
  label: string
  options: Array<FormattedOption<O> | FormattedGroup<O, G>>
  props?: React.DetailedHTMLProps<React.FormHTMLAttributes<G>, G>
}

export type FormattedOptions<O, G> = Array< FormattedOption<O> | FormattedGroup<O, G> >

export const parseSelectOptions = (options?: Array<Choice<HTMLOptionElement> | SingleLevelGroupChoices<HTMLOptGroupElement>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Select" component with "options" cannot have children')
  }
  return parseGroups(options) as FormattedOptions<HTMLOptionElement, HTMLOptGroupElement>
}

export const parseRadioOptions = (options?: Array<Choice<HTMLInputElement>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Radio" component with "options" cannot have children')
  }
  return parseOptions(options) as Array<FormattedOption<HTMLInputElement>>
}

export const parseCheckboxOptions = (options?: Array<Choice<HTMLInputElement>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Checkbox" component with "options" cannot have children')
  }
  return parseOptions(options) as Array<FormattedOption<HTMLInputElement>>
}

const parseGroups = (items?: Array<Choice<any> | GroupChoices<any, any>>): FormattedOptions<any, any> => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(item => {
    if ((item as any)?.group) {
      return parseGroup(item as GroupChoices<any, any>)
    }
    return parseOption(item as Choice<any>)
  })
}

const parseGroup = (group: GroupChoices<any, any>): FormattedGroup<any, any> => {
  return {
    type: ChoiceType.Group,
    label: group.group,
    options: parseGroups(group.options),
    props: group.props,
  }
}

const parseOptions = (items?: Array<Choice<any>>): Array<FormattedOption<any>> => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(parseOption)
}

const parseOption = (option: Choice<any>): FormattedOption<any> => {
  const labelOption = typeof option === 'string' ? { label: option, value: option } : option
  return {
    type: ChoiceType.Option,
    ...labelOption,
  }
}
