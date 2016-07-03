import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import { Provider } from 'react-redux'
import createStore from './redux/create'
import getRoutes from './router'
import { syncHistoryWithStore } from 'react-router-redux'

require('sthGlobal')
require('bootstrap-webpack')

const store = createStore(hashHistory)

render(
  <Provider store={store} key="provider">
    <Router
      history={syncHistoryWithStore(hashHistory, store)}
      routes={getRoutes(store)}
    />
  </Provider>,
  document.getElementById('app')
)
