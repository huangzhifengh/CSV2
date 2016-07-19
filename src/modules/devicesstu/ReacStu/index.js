module.exports = {
  path: 'reacstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./ReacStu'))
    })
  }
}
