module.exports = {
  path: 'linkCtrlLightAdd',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Add'))
    })
  }
}
