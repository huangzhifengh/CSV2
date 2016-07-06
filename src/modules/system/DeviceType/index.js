module.exports = {
  path: 'dervicestype',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./DeviceType'))
    })
  }
}
