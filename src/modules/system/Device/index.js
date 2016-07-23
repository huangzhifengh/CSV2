module.exports = {
  path: 'dervices',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Device'))
    })
  }
}
