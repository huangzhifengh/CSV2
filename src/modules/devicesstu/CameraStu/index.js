module.exports = {
  path: 'camerastu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./CameraStu'))
    })
  }
}
