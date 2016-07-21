module.exports = {
  path: 'rpt-elect-list',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./RptElectList'))
    })
  }
}
