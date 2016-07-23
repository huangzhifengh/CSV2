module.exports = {
  path: 'spcstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./SpcStu'))
    })
  }
}
