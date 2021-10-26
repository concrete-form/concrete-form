import { Choice, GroupChoices, SingleLevelGroupChoices } from '../types'

export enum ChoiceType {
  Option,
  Group,
}

export type FormattedOption = {
  type: ChoiceType.Option
  label: string
  value: string
}

export type FormattedGroup = {
  type: ChoiceType.Group
  label: string
  options: Array<FormattedOption | FormattedGroup>
}

export type FormattedOptions = Array< FormattedOption | FormattedGroup >

export const parseSelectOptions = (options?: Array<Choice | SingleLevelGroupChoices>, children?: any) => {
  if (options && children) {
    throw new Error('a "Select" component with "options" cannot have children')
  }
  return parseGroups(options)
}

export const parseRadioOptions = (options?: Choice[], children?: any) => {
  if (options && children) {
    throw new Error('a "Radio" component with "options" cannot have children')
  }
  return parseOptions(options)
}

export const parseCheckboxOptions = (options?: Choice[], children?: any) => {
  if (options && children) {
    throw new Error('a "Checkbox" component with "options" cannot have children')
  }
  return parseOptions(options)
}

const parseGroups = (items?: Array<Choice | GroupChoices>): FormattedOptions => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(item => {
    if ((item as any)?.group) {
      return parseGroup(item as GroupChoices)
    }
    return parseOption(item as Choice)
  })
}

const parseGroup = (group: GroupChoices): FormattedGroup => {
  return {
    type: ChoiceType.Group,
    label: group.group,
    options: parseGroups(group.options),
  }
}

const parseOptions = (items?: Choice[]): FormattedOption[] => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(parseOption)
}

const parseOption = (option: Choice): FormattedOption => {
  const labelOption = typeof option === 'string' ? { label: option, value: option } : option
  return {
    type: ChoiceType.Option,
    ...labelOption,
  }
}
