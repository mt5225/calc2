import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import 'flexboxgrid/css/flexboxgrid.css'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import calcApp from './reducers'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const logger = createLogger()

const store = createStore(
  calcApp,
  applyMiddleware(logger, thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
