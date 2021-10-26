export const mergeEventHandlers = (...handlers: any[]) => async (event: React.SyntheticEvent) => {
  if (event.defaultPrevented) {
    return
  }
  event.persist()
  for (const handler of handlers) {
    if (typeof handler !== 'function') {
      continue
    }
    await handler(event)
    if (event.defaultPrevented) {
      break
    }
  }
}
