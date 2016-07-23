module.exports = {
  path: 'exec',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Exec'))
    })
  }
}
