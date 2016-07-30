module.exports = {
  path: 'wind',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Wind'))
    })
  }
}
