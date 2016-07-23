module.exports = {
  path: 'loca',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./Local'))
    })
  }
}
