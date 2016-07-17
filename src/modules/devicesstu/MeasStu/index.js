module.exports = {
  path: 'measstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./MeasStu'))
    })
  }
}
