import { mergeEventHandlers, removeEventHandlers, extractEventHandlers } from './events'

const mockEvent = { defaultPrevented: false, persist: jest.fn() }
const mockDefaultPreventedEvent = { defaultPrevented: true, persist: jest.fn() }

describe('events util', () => {
  describe('mergeEventHandlers', () => {
    it('merge event handlers', async () => {
      const handler1 = jest.fn()
      const handler2 = jest.fn()
      const handler3 = jest.fn()

      const mergedHandler = mergeEventHandlers(handler1, handler2, handler3) as Function
      await mergedHandler(mockEvent)

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
      expect(handler3).toHaveBeenCalledTimes(1)
    })

    it('doesn\'t call any handler when the event is already prevented', async () => {
      const handler1 = jest.fn()
      const handler2 = jest.fn()

      const mergedHandler = mergeEventHandlers(handler1, handler2) as Function
      await mergedHandler(mockDefaultPreventedEvent)

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it('stop the chain when events is prevented', async () => {
      const handler1 = jest.fn((event: any) => { event.defaultPrevented = true })
      const handler2 = jest.fn()

      const mergedHandler = mergeEventHandlers(handler1, handler2) as Function
      await mergedHandler({ ...mockEvent })

      expect(handler1).toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it('returns undefined when no valid handler are found', () => {
      expect(mergeEventHandlers('foo', 'bar')).toBeUndefined()
    })

    it('ignore invalid handlers', async () => {
      const handler1 = jest.fn()
      const handler2 = jest.fn()

      const mergedHandler = mergeEventHandlers('a', handler1, false, undefined, handler2, 0) as Function
      await mergedHandler(mockEvent)

      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
    })
  })

  describe('removeEventHandlers', () => {
    it('removes event handlers', () => {
      const newProps = removeEventHandlers({
        onClick: undefined,
        foo: undefined,
        onBar: undefined,
        bar: undefined,
        one: undefined,
      })
      expect(Object.keys(newProps).sort()).toEqual(['foo', 'bar', 'one'].sort())
    })
  })

  describe('extractEventHandlers', () => {
    it('extracts event handlers', () => {
      const newProps = extractEventHandlers({
        onClick: undefined,
        foo: undefined,
        onBar: undefined,
        bar: undefined,
        one: undefined,
      })
      expect(Object.keys(newProps).sort()).toEqual(['onClick', 'onBar'].sort())
    })
  })
})
