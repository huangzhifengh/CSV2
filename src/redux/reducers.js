import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './modules/auth'

module.exports = combineReducers({
  routing: routerReducer,
  auth,
})
