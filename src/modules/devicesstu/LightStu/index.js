module.exports = {
  path: 'lightstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./LightStu'))
    })
  }
}
