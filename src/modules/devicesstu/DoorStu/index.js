module.exports = {
  path: 'doorstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./DoorStu'))
    })
  }
}
