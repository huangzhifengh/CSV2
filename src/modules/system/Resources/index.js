module.exports = {
  path: 'resources',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Resources'))
    })
  }
}
