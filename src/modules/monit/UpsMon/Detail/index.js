module.exports = {
  path: 'detail/:id',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Detail'))
    })
  }
}
