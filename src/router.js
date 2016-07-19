import App from './containers/App'
import Login from './containers/Login'
import NoMatch from './containers/NoMatch'
import { isLoaded as isAuthLoaded, auth as doAuth } from './redux/modules/auth'
import { reset } from './ajax/ajax'

export default Module => {
  const routes = [{
    path: '/',
    component: App,
    onChange () {
      reset()
    },
    childRoutes: [
      //system
      require('./modules/system/DeviceType/index'),
      require('./modules/system/Role/index'),
      //job
      //require('./modules/job'),
      require('./modules/job/Job/index'),
      //linkCtrl
      require('./modules/linkctrl/LinkCtrl/index'),
      //devicesstu
      require('./modules/devicesstu/MeasStu/index'),
      require('./modules/devicesstu/OnOffStu/index'),
      require('./modules/devicesstu/MonStu/index'),
      require('./modules/devicesstu/ReacStu/index'),
    ],
    onEnter (nextState, replace, cb) {
      const checkAuth = () => {
        const {auth: { user }} = Module.getState()

        if (!user) {
          replace('/login')
        }

        cb()
      }

      if (!isAuthLoaded(Module.getState())) {
        Module.dispatch(doAuth()).then(checkAuth)
      } else {
        checkAuth()
        Module.dispatch(doAuth()).then(checkAuth)
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
