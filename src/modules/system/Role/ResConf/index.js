module.exports = {
  path: 'resconf/:id',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./ResConf'))
    })
  }
}
