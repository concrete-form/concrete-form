export const mergeEventHandlers = (...handlers: any[]) => {
  const validHandlers = handlers.filter(handler => typeof handler === 'function')
  if (validHandlers.length === 0) {
    return
  }
  return async (event: any, ...extraProps: any) => {
    if (event.defaultPrevented) {
      return
    }
    event?.persist()
    for (const handler of validHandlers) {
      await handler(event, ...extraProps)
      if (event.defaultPrevented) {
        return
      }
    }
  }
}

const eventHandlersPattern = /^on[A-Z]+/

export const removeEventHandlers = (props: Record<string, any>) => {
  const filteredEntries = Object.entries(props).filter(([key]) => !eventHandlersPattern.test(key))
  return Object.fromEntries(filteredEntries)
}

export const extractEventHandlers = (props: Record<string, any>) => {
  const filteredEntries = Object.entries(props).filter(([key]) => eventHandlersPattern.test(key))
  return Object.fromEntries(filteredEntries)
}
