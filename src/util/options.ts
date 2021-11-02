import {
  Choice,
  GroupChoices,
  SingleLevelGroupChoices,
  ReactInputProps,
  ReactOptionsProps,
  ReactOptGroupProps,
} from '../types'

type FormattedOption<O, L> = {
  type: 'option'
  label: L
  value: string
  props?: O
}

type FormattedGroup<G, O, L> = {
  type: 'group'
  label: L
  options: Array<FormattedOption<O, L> | FormattedGroup<G, O, L>>
  props?: G
}

type FormattedOptions<G, O, L> = Array< FormattedOption<O, L> | FormattedGroup<G, O, L> >

export const parseSelectOptions = (options?: Array<Choice<ReactOptionsProps, string|undefined> | SingleLevelGroupChoices<ReactOptGroupProps, ReactOptionsProps, string|undefined>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Select" component with "options" cannot have children')
  }
  return parseGroups(options) as FormattedOptions<ReactOptGroupProps, ReactOptionsProps, string|undefined>
}

export const parseRadioOptions = (options?: Array<Choice<ReactInputProps, React.ReactNode>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Radio" component with "options" cannot have children')
  }
  return parseOptions(options) as Array<FormattedOption<ReactInputProps, React.ReactNode>>
}

export const parseCheckboxOptions = (options?: Array<Choice<ReactInputProps, React.ReactNode>>, children?: any) => {
  if (options && children) {
    throw new Error('a "Checkbox" component with "options" cannot have children')
  }
  return parseOptions(options) as Array<FormattedOption<ReactInputProps, React.ReactNode>>
}

const parseGroups = (items?: Array<Choice<any, any> | GroupChoices<any, any, any>>): FormattedOptions<any, any, any> => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(item => {
    if ((item as any)?.group) {
      return parseGroup(item as GroupChoices<any, any, any>)
    }
    return parseOption(item as Choice<any, any>)
  })
}

const parseGroup = (group: GroupChoices<any, any, any>): FormattedGroup<any, any, any> => {
  return {
    type: 'group',
    label: group.group,
    options: parseGroups(group.options),
    props: group.props,
  }
}

const parseOptions = (items?: Array<Choice<any, any>>): Array<FormattedOption<any, any>> => {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(parseOption)
}

const parseOption = (option: Choice<any, any>): FormattedOption<any, any> => {
  const labelOption = typeof option === 'string' ? { label: option, value: option } : option
  return {
    type: 'option',
    ...labelOption,
  }
}
