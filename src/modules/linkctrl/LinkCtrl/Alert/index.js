module.exports = {
  path: 'linkCtrlAlertAdd',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Add'))
    })
  }
}
