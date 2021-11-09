import { renderHook as testingLibraryRenderHook } from '@testing-library/react-hooks'

import renderHook from '../../testkit/renderHook'
import useConcreteFormContext from './useConcreteFormContext'

describe('useConcreteFormContext', () => {
  it('returns the context', () => {
    const result = renderHook(useConcreteFormContext).result.current as {}
    expect(Object.keys(result).sort()).toEqual(['id', 'formHandler', 'config'].sort())
  })

  it('throws error when used outisde context', () => {
    expect(testingLibraryRenderHook(useConcreteFormContext).result.error).toEqual(Error('Missing form context. Did you forget to use <Form /> ?'))
  })
})
