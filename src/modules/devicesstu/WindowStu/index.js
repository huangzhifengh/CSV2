module.exports = {
  path: 'windowstu',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./WindowStu'))
    })
  }
}
