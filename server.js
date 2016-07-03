import path from 'path';
import express from 'express';
import dyson from 'dyson'
import config from './config'

const server = global.server = express();

// start static server
server.set('port', (process.env.PORT || config.server.port));
server.use(express.static(path.join(__dirname, 'public')));

if (config.fakeServer.enable) {
  dyson.bootstrap({
    configDir: __dirname + 'services',
    port: config.fakeServer.port
  })
}

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
