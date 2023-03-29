import renderHook from '../../testkit/renderHook'
import useControlLabelFor from './useControlLabelFor'

type FakeControlProps = { name?: string }

const Input: React.FC<FakeControlProps> = ({ name }) => <input name={name} />

describe('useControlLabelFor', () => {
  it('supports components with name prop', () => {
    const name = 'foo-bar-baz'
    const { result } = renderHook(() => useControlLabelFor(<Input name={name} />))
    expect(result.current).toMatch(new RegExp(`.+-${name}$`))
  })

  it('ignores invalid component', () => {
    const { result } = renderHook(() => useControlLabelFor('invalid'))
    expect(result.current).toBeUndefined()
  })

  it('ignores component with no name', () => {
    const { result } = renderHook(() => useControlLabelFor(<Input />))
    expect(result.current).toBeUndefined()
  })
})
