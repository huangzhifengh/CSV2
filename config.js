let SERVER_PORT = 5000
let PROXY_SERVER_PROT = 3000
let FAKE_SERVER_PORT = 3002

export default {
  server: {
    port: SERVER_PORT,
  },
  fakeServer: {
    enable: false,
    port: FAKE_SERVER_PORT,
  },
  proxy: {
    port: PROXY_SERVER_PROT,
    protocal: 'http',
    target: '127.0.0.1',//115.236.175.217
    targetPort: 1919,
    prefix: '/lsiot',
    pattern: '**/api/**',
  },
  socket: {
    protocal: 'ws',
    target: '115.236.175.217',//115.236.175.217
    targetPort: 1919,
    prefix: '/lsiot/websocket',
  },
}
