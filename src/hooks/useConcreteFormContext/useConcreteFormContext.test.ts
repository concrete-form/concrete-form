import { renderHook as testingLibraryRenderHook } from '@testing-library/react'

import renderHook from '../../testkit/renderHook'
import useConcreteFormContext from './useConcreteFormContext'

describe('useConcreteFormContext', () => {
  it('returns the context', () => {
    const result = renderHook(useConcreteFormContext).result.current as {}
    expect(Object.keys(result).sort()).toEqual(['id', 'formHandler', 'config'].sort())
  })

  it('throws error when used outisde context', () => {
    const spy = jest.spyOn(console, 'error')
    spy.mockImplementation(() => {})

    expect(() => testingLibraryRenderHook(useConcreteFormContext)).toThrowError(Error('Missing form context. Did you forget to use <Form /> ?'))

    spy.mockRestore()
  })
})
