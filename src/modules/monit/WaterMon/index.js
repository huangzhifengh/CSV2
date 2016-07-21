module.exports = {
  path: 'water',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./WaterMon'))
    })
  }
}
