module.exports = {
  path: 'role',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Role'))
    })
  }
}
