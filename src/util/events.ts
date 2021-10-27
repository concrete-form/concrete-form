export const mergeEventHandlers = (...handlers: any[]) => {
  const validHandlers = handlers.filter(handler => typeof handler === 'function')
  if (validHandlers.length === 0) {
    return
  }
  return async (event: React.SyntheticEvent) => {
    if (event.defaultPrevented) {
      return
    }
    event.persist()
    for (const handler of validHandlers) {
      await handler(event)
      if (event.defaultPrevented) {
        return
      }
    }
  }
}
