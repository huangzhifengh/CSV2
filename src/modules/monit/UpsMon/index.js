module.exports = {
  path: 'ups',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./UpsMon'))
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
