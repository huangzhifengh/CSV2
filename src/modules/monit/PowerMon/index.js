module.exports = {
  path: 'power',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./PowerMon'))
    })
  }
}
