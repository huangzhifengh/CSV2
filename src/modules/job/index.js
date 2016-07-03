module.exports = {
  path: 'joblist',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Job'))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./modules/edit'),
      ])
    })
  },
}
