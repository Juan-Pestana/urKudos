export default initDevTools = () => {
  const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
    name: 'Posts State',
  })
  connection?.init(useStore.getState())

  let isUpdateFromDevtools = false
  connection?.subscribe((evt) => {
    if (evt.type === 'DISPATCH') {
      const newState = JSON.parse(evt.state)
      isUpdateFromDevtools = true
      useStore.setState(newState)
      isUpdateFromDevtools = false
    }
  })

  useStore.subscribe((newState) => {
    if (!isUpdateFromDevtools) {
      connection?.send('State', newState)
    }
  })
}
