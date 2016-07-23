module.exports = {
  path: 'localconf/:id',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./LocalConf'))
    })
  }
}
