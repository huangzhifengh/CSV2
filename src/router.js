import App from './containers/App';
import Login from './containers/Login';
import NoMatch from './containers/NoMatch';
import { isLoaded as isAuthLoaded, auth as doAuth } from './redux/modules/auth';
import { reset } from './ajax/ajax';
import Report from './modules/report/RptElectList/RptElectList';

export default Module => {
  const routes = [{
    path: '/',
    component: App,
    onChange () {
      reset()
    },
    childRoutes: [
      require('./containers/Home'),
      //system
      require('./modules/system/Resources/index'),
      require('./modules/system/Role/index'),
      require('./modules/system/User/index'),
      require('./modules/system/DeviceType/index'),
      require('./modules/system/Device/index'),
      require('./modules/system/GateWay/index'),
      require('./modules/system/Exec/index'),
      //job
      //require('./modules/job'),
      require('./modules/job/Job/index'),
      //linkCtrl
      require('./modules/linkctrl/LinkCtrl/index'),
      //devicesstu
      require('./modules/devicesstu/SpcStu/index'),
      require('./modules/devicesstu/MeasStu/index'),
      require('./modules/devicesstu/OnOffStu/index'),
      require('./modules/devicesstu/MonStu/index'),
      require('./modules/devicesstu/ReacStu/index'),
      require('./modules/devicesstu/LightStu/index'),
      require('./modules/devicesstu/CameraStu/index'),
      require('./modules/devicesstu/AircondStu/index'),
      require('./modules/devicesstu/DoorStu/index'),
      require('./modules/devicesstu/WindowStu/index'),
      //monit
      require('./modules/monit/HeatHumiMon/index'),
      require('./modules/monit/UpsMon/index'),
      require('./modules/monit/CracMon/index'),
      require('./modules/monit/PowerMon/index'),
      require('./modules/monit/WaterMon/index'),
      //report
      require('./modules/report/RptElectList/index'),
      {path: 'rpt-elect-trend',component: Report},
      {path: 'rpt-water-list',component: Report},
      {path: 'rpt-water-trend',component: Report},
      {path: 'rpt-heathumi-analy',component: Report},
      {path: 'rpt-pm25-analy',component: Report},
      {path: 'rpt-noise-analy',component: Report},
      {path: 'rpt-formaldehyde-analy',component: Report},
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
  }, /*{
    path: '*',
    component: NoMatch
  }*/]

  return routes
}
