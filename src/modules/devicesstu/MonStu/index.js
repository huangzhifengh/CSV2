module.exports = {
  path: 'monstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./MonStu'))
    })
  }
}
