module.exports = {
  path: 'heathumi',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./HeatHumiMon'))
    })
  }
}
