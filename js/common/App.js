import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Layout from './Layout'
import store from './store'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

render(<App />, document.getElementById('app'))
