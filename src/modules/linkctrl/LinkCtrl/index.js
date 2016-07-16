module.exports = {
  path: 'linkctrllist',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./LinkCtrl'))
    })
  },
  getChildRoutes (location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./Light/index'),
        require('./Alert/index')
      ])
    })
  }
}
