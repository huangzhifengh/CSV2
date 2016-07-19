module.exports = {
  path: 'onoffstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./OnOffStu'))
    })
  }
}
