import getConmmonConfig from './webpack/common.config'
import getAppConfig from './webpack/app.config'
import getServerConfig from './webpack/server.config'

let WATCH = global.WATCH === undefined ? false : global.WATCH;
const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = getConmmonConfig(DEBUG, VERBOSE)

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const appConfig = getAppConfig(config ,WATCH, DEBUG, VERBOSE)

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = getServerConfig(config)

export default [appConfig, serverConfig];
