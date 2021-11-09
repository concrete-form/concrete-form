import renderHook from '../../testkit/renderHook'
import useControlLabelFor from './useControlLabelFor'

type FakeControlProps = { name?: string }

const Autocomplete: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const CustomControl: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const DateTime: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const Input: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const Select: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const Slider: React.FC<FakeControlProps> = ({ name }) => <input name={name} />
const Textarea: React.FC<FakeControlProps> = ({ name }) => <input name={name} />

const supportedControls = [Autocomplete, CustomControl, DateTime, Input, Select, Slider, Textarea]

const Radio: React.FC<FakeControlProps> = ({ name }) => <input name={name} />

describe('useControlLabelFor', () => {
  describe('supported controls', () => {
    supportedControls.forEach(Control => {
      it(`supports ${Control.name}`, () => {
        const name = `test-${Control.name.toLowerCase()}`
        const hook = renderHook(() => useControlLabelFor(<Control name={name} />))
        expect(hook.result.current).toMatch(new RegExp(`.+-${name}$`))
      })
    })
  })

  describe('not supported controls', () => {
    it('ignores component with no type', () => {
      const hook = renderHook(() => useControlLabelFor('invalid'))
      expect(hook.result.current).toBeUndefined()
    })

    it('ignores component with no name', () => {
      const hook = renderHook(() => useControlLabelFor(<Input />))
      expect(hook.result.current).toBeUndefined()
    })

    it('ignores controls that aren\'t supported', () => {
      const hook = renderHook(() => useControlLabelFor(<Radio name="test" />))
      expect(hook.result.current).toBeUndefined()
    })
  })
})
