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
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import HospitalList from './components/HospitalList'
import NotFound from './components/NotFound'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const logger = createLogger()

const store = createStore(
  calcApp,
  applyMiddleware(logger, thunk, routerMiddleware(browserHistory))
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <Route path="/steps" component={App} />
        <Route path="/" component={HospitalList} />
        <Route path="/calc2" component={HospitalList} />
        <Route path="*" component={NotFound} />
      </Router>
  </Provider>,
  document.getElementById('root')
)