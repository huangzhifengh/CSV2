import task from './lib/task';

global.WATCH = true;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
module.exports =  task('start', async () => {
  await require('./build')()
  await require('./serve')()
  await require('./proxy')()
})
