module.exports = {
  path: 'user',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./User'))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./LocalConf/index')
      ])
    })
  }
}
