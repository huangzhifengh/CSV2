module.exports = {
  path: 'crac',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./CracMon'))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./Detail/index')
      ])
    })
  }
}
