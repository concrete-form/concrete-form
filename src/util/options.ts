import {
  Choice,
  GroupChoices,
  LabelledChoice,
  SingleLevelGroupChoices,
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

type FormattedOptions<G, O, L> = Array<FormattedOption<O, L> | FormattedGroup<G, O, L>>

export function parseSelectOptions<G, C, L> (
  options?: Array<Choice<C, L> | SingleLevelGroupChoices<G, C, L>>,
  children?: React.ReactElement,
): FormattedOptions<G, C, L> {
  if (options && children) {
    throw new Error('a "Select" component with "options" cannot have children')
  }
  return parseGroups<G, C, L>(options)
}

export function parseRadioOptions<C, L> (
  options?: Array<Choice<C, L>>,
): Array<FormattedOption<C, L>> {
  return parseOptions(options)
}

export function parseCheckboxOptions<C, L> (
  options?: Array<Choice<C, L>>,
): Array<FormattedOption<C, L>> {
  return parseOptions(options)
}

export const getRadioProps = (value: string, controlProps: Record<string, any>) => ({
  ...controlProps,
  value,
  checked: typeof controlProps.value === 'undefined' ? undefined : controlProps.value === value,
  type: 'radio',
})

export const getCheckboxProps = (value: string, controlProps: Record<string, any>) => ({
  ...controlProps,
  value,
  checked: typeof controlProps.value === 'undefined' ? undefined : controlProps.value?.includes(value),
  type: 'checkbox',
})

function parseGroups<G, C, L> (
  items?: Array<Choice<C, L> | GroupChoices<G, C, L>>,
): FormattedOptions<G, C, L> {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(item => {
    if ((item as GroupChoices<G, C, L>)?.options) {
      return parseGroup<G, C, L>(item as GroupChoices<G, C, L>)
    }
    return parseOption<C, L>(item as Choice<C, L>)
  })
}

function parseGroup<G, C, L> (group: GroupChoices<G, C, L>): FormattedGroup<G, C, L> {
  return {
    type: 'group',
    label: group.group,
    options: parseGroups(group.options),
    props: group.props,
  }
}

function parseOptions<C, L> (items?: Array<Choice<C, L>>): Array<FormattedOption<C, L>> {
  if (!items || items?.length === 0) {
    return []
  }
  return items.map(parseOption)
}

function parseOption<C, L> (option: Choice<C, L>): FormattedOption<C, L> {
  const labelOption = typeof option === 'string' ? { label: option, value: option } : option
  return {
    type: 'option',
    ...labelOption as LabelledChoice<C, L>,
  }
}
