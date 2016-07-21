module.exports = {
  path: 'aircondstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./AircondStu'))
    })
  }
}
