module.exports = {
  path: 'gateway',
  getComponent (location, cb) {
    require.ensure([], require => {
      cb(null, require('./GateWay'))
    })
  }
}
