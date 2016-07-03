import App from './containers/App'
import Login from './containers/Login'
import NoMatch from './containers/NoMatch'
import { isLoaded as isAuthLoaded, auth as doAuth } from './redux/modules/auth'
import { reset } from './ajax/ajax'

export default store => {
  const routes = [{
    path: '/',
    component: App,
    onChange () {
      reset()
    },
    childRoutes: [
      require('./modules/job')
    ],
    onEnter (nextState, replace, cb) {
      const checkAuth = () => {
        const {auth: { user }} = store.getState()

        if (!user) {
          replace('/login')
        }

        cb()
      }

      if (!isAuthLoaded(store.getState())) {
        store.dispatch(doAuth()).then(checkAuth)
      } else {
        checkAuth()
        store.dispatch(doAuth()).then(checkAuth)
      }
      // cb()
    },
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NoMatch
  }]

  return routes
}
