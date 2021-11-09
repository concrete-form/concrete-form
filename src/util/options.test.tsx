import { parseSelectOptions, parseRadioOptions, parseCheckboxOptions } from './options'

describe('options util', () => {
  describe('parseSelectOptions', () => {
    it('handle empty options', () => {
      expect(parseSelectOptions()).toEqual([])
      expect(parseSelectOptions([])).toEqual([])
    })

    it('throws an error if both children and options are present', () => {
      expect(() => parseSelectOptions(['foo'], 'children')).toThrowError()
    })

    it('parse <select /> options', () => {
      const options = [
        'one',
        { label: '2', value: 'two', props: { disabled: true } },
        {
          group: 'group1',
          options: [
            'three',
            { label: '4', value: 'four', props: { disabled: true } },
          ],
          props: { color: 'red' },
        },
        '5',
        { group: 'group2', options: [] },
        { group: undefined, options: ['6'] },
      ]

      const expected = [
        { type: 'option', label: 'one', value: 'one' },
        { type: 'option', label: '2', value: 'two', props: { disabled: true } },
        {
          type: 'group',
          label: 'group1',
          options: [
            { type: 'option', label: 'three', value: 'three' },
            { type: 'option', label: '4', value: 'four', props: { disabled: true } },
          ],
          props: { color: 'red' },
        },
        { type: 'option', label: '5', value: '5' },
        { type: 'group', label: 'group2', options: [] },
        {
          type: 'group',
          options: [
            { type: 'option', label: '6', value: '6' },
          ],
        },
      ]

      expect(parseSelectOptions(options)).toEqual(expected)
    })
  })

  /* radio and checkbox follow the same rules */

  const radioAndCheckboxOptions = [
    'one',
    <span key="2">two</span>,
    { label: '3', value: 'three', props: { disabled: true } },
    { label: <div key="4">FOUR</div>, value: 'four' },
  ]

  const radioAndCheckboxExpected = [
    { type: 'option', label: 'one', value: 'one' },
    expect.objectContaining({ type: 'span', props: { children: 'two' } }),
    { type: 'option', label: '3', value: 'three', props: { disabled: true } },
    { type: 'option', label: expect.objectContaining({ type: 'div', props: { children: 'FOUR' } }), value: 'four' },
  ]

  describe('parseRadioOptions', () => {
    it('handle empty options', () => {
      expect(parseRadioOptions()).toEqual([])
      expect(parseRadioOptions([])).toEqual([])
    })

    it('parse <input type="radio" /> options', () => {
      expect(parseRadioOptions(radioAndCheckboxOptions)).toEqual(radioAndCheckboxExpected)
    })
  })

  describe('parseCheckboxOptions', () => {
    it('handle empty options', () => {
      expect(parseCheckboxOptions()).toEqual([])
      expect(parseCheckboxOptions([])).toEqual([])
    })

    it('parse <input type="checkbox" /> options', () => {
      expect(parseCheckboxOptions(radioAndCheckboxOptions)).toEqual(radioAndCheckboxExpected)
    })
  })
})
