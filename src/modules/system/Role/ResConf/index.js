module.exports = {
  path: 'resconf',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./ResConf'))
    })
  }
}
